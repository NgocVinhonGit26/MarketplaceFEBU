
import { Grid, Paper } from "@mui/material";
import { useEffect, useState, useLayoutEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "layouts/DashboardLayout";
import ProductSearchFormAdmin from "./ProductSearchFrom";
import ProductsTableAdmin from "./Table";
import { getAllProductAdmin } from "api/product";
import { getTotalPageProductAdmin } from "api/product";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSearch, setPageSearch] = useState(1);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);
    const [categories, setCategories] = useState([]);
    const accessToken = localStorage.getItem("accessToken");


    useLayoutEffect(() => {
        const checkRole = async () => {
            if (accessToken) {
                const id = localStorage.getItem("id");
                const role = localStorage.getItem("role");
                if (role !== "0") {
                    navigate("/signin");
                }
            } else {
                navigate("/signin");
            }
        };
        checkRole();
    }, [accessToken, navigate]);

    const fetchProducts = async (formData = {}) => {
        const response = await getAllProductAdmin(page - 1, formData, accessToken)
        const totalPages = await getTotalPageProductAdmin(page - 1, formData, accessToken)
        // console.log("response searchProduct:", response)
        setProducts(response.data)
        setTotal(totalPages.data)
    }
    useEffect(() => {
        if (!isSearching) {
            fetchProducts()
        }
    }, [page])

    const handleChangePage = (event, value) => {
        if (isSearching) {
            setPageSearch(value)
        }
        else {
            setPage(value)
        }
    }

    const handleSearch = async (page, formData) => {
        try {
            const response = await getAllProductAdmin(page - 1, formData, accessToken)
            const totalPages = await getTotalPageProductAdmin(page - 1, formData, accessToken)
            setProducts(response.data)
            setTotal(totalPages.data)

        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <DashboardLayout layoutRole={0}>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <ProductSearchFormAdmin
                    setIsSearching={setIsSearching}
                    onSearch={handleSearch}
                    fetchProducts={fetchProducts}
                    pageSearch={pageSearch}
                    setPageSearch={setPageSearch}
                    setPage={setPage}
                />
            </Grid>
            <Grid item xs={12}>
                <ProductsTableAdmin
                    products={products}
                />
            </Grid>
            <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center", mt: 2 }}
            >
                <Pagination
                    count={total}
                    color="primary"
                    size="large"
                    onChange={handleChangePage}
                />
            </Grid>
        </DashboardLayout>
    )
}

export default AdminProducts;