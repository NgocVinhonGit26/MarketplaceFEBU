import DashboardLayout from "layouts/DashboardLayout";
import { Grid, Paper } from "@mui/material";
import ProductsTable from "./Table";
import { useEffect, useState, useLayoutEffect } from "react";
import { getShopBoatProducts, deleteProduct } from "api/shopBoat";
import Pagination from "@mui/material/Pagination";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { navigate } from "react-router-dom";
import { getShopBoatByOwnerId } from "api/shopBoat";
import { getListCategories } from "api/category";
import { useNavigate } from "react-router-dom";
import ProductSearchForm from "./ProductSearchForm";
import { searchProduct, getTotalPageProduct } from "api/product";

const MerchantProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSearch, setPageSearch] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const idShop = localStorage.getItem("shopBoatId");

  useLayoutEffect(() => {
    const checkRole = async () => {
      if (accessToken) {
        // const { id, role } = await jwt_decode(cookies.access_token);
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");
        if (role !== "1") {
          navigate("/signin");
        }
        // const fetchShopBoat = async (id) => {
        //   const response = await getShopBoatByOwnerId(id);
        //   if (response) {
        //     const shopBoatId = response.data.data._id;
        //     setShopBoatId(shopBoatId);
        //   }
        // };
        // fetchShopBoat(id);
      } else {
        // Nếu không có access_token, chuyển hướng đến trang đăng nhập
        navigate("/signin");
      }
    };
    checkRole();
  }, [accessToken, navigate]);
  const fetchProducts = async (formData = {}) => {
    const response = await searchProduct(page - 1, formData, idShop, accessToken);
    const totalPages = await getTotalPageProduct(page - 1, formData, idShop, accessToken);
    // console.log("response searchProduct:", response)
    // console.log("totalPages:", totalPages)
    setProducts(response.data);
    setTotal(totalPages.data);
  };
  useEffect(() => {
    if (!isSearching) {
      fetchProducts();
    }
  }, [page]);


  const handleChangePage = (event, value) => {
    if (isSearching) {
      setPageSearch(value);
    }
    else {
      setPage(value);
    }
  };

  const updateData = (updatedProduct) => {
    let newProducts = products.map((product) => {
      if (product.id === updatedProduct.id) {
        return updatedProduct;
      }
      return product;
    });
    setProducts(newProducts);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id, accessToken);
      if (response) {
        let newProducts = products.filter((product) => product.id !== id);
        setProducts(newProducts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (page, formData) => {
    // console.log("formData", formData);
    // return
    try {
      const response = await searchProduct(page - 1, formData, idShop, accessToken);
      const totalPages = await getTotalPageProduct(page - 1, formData, idShop, accessToken);
      setProducts(response.data);
      setTotal(totalPages.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = (product) => {
    let newProducts = [product, ...products];
    setProducts(newProducts);
  };

  return (
    <DashboardLayout layoutRole={1}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <ProductSearchForm
          setIsSearching={setIsSearching}
          onSearch={handleSearch}
          fetchProducts={fetchProducts}
          pageSearch={pageSearch}
          setPageSearch={setPageSearch}
          setPage={setPage}
          categories={categories}
          updateData={updateData}
          addProduct={addProduct}
        />
      </Grid>
      <Grid item xs={12}>
        <ProductsTable
          products={products}
          updateData={updateData}
          handleDeleteProduct={handleDeleteProduct}
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
  );
};

export default MerchantProducts;
