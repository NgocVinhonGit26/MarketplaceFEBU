import MarketplaceLayout from "layouts/CustomerLayout/MarketplaceLayout";
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import FilterBar from "./FilterBar";
import "./style.scss";
import BtnOrder from "./BtnOrder";
import BasicBreadcrumbs from "./Breadcrumbs";
import MenuIcon from "@mui/icons-material/Menu";
import GridTable from "./Grid";
import { useParams, useLocation } from "react-router-dom";
import { searchProduct, getProductByCategory } from "api/product";
import Pagination from "@mui/material/Pagination";
import { getCategoryBySlug } from "api/category";
import { getTotalPageProduct } from "api/product";
import { searchProductForUser } from "api/product";
import { getTotalPageProductForUser } from "api/product";

const Searchpage = () => {
  const [cost, setCost] = React.useState([20000, 500000]);
  const minDistance = 10000;
  const location = useLocation();
  const { categorySlug, name } = useParams();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const [totalPages, setTotalPages] = React.useState(1);
  const [products, setProducts] = React.useState([]);
  const [category, setCategory] = React.useState({});

  React.useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryBySlug(categorySlug);
        setCategory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [categorySlug]);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const fetchProductsByCategory = async () => {
    try {
      const response = await getProductByCategory(page, limit, categorySlug);
      setProducts(response.data.data.docs);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };


  const accessToken = localStorage.getItem("accessToken");
  const fetchProducts = async () => {
    try {
      const response = await searchProductForUser(page - 1, { name });
      const totalPages = await getTotalPageProductForUser(page - 1, { name });
      // console.log("searchProduct reposne", totalPages);
      setProducts(response.data);
      setTotalPages(totalPages.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (categorySlug) {
      fetchProductsByCategory();
    } else {
      fetchProducts();
    }
  }, [page, limit, categorySlug, name]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 270,
        paddingLeft: "10px",
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <span
        style={{
          fontSize: "1.5em",
          fontWeight: "600",
        }}
      >
        BỘ LỌC
      </span>

      <Divider
        style={{
          color: "white",
          opacity: "inherit",
          backgroundColor: "#7DB249",
          height: "3px",
          width: "100%",
          maxWidth: "30px",
          marginTop: "0.66em",
        }}
      />
      <span
        style={{
          fontSize: "1.em",
          fontWeight: "600",
        }}
      >
        LỌC THEO GIÁ
      </span>
      <FilterBar
        cost={cost}
        setCost={setCost}
        minDistance={minDistance}
        minPrice={10000}
        maxPrice={500000}
      />
      {/* btn filter */}
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="success">
          LỌC
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Giá:&nbsp;
          <span>{cost[0]}₫</span>-<span>{cost[1]}₫</span>
        </div>
      </Stack>
    </Box>
  );

  return (
    <MarketplaceLayout>
      <div className="container-searchpage">
        <div className="searchpage">
          <div className="search-title">
            <div className="search-title-left">
              {name && (
                <div className="text-search">
                  <h2>Kết quả tìm kiếm: “{name}”</h2>
                </div>
              )}
              {category?.name && (
                <div className="text-search">
                  <h2>{category?.name}</h2>
                </div>
              )}
              <div className="path-result">
                <BasicBreadcrumbs name={name} category={category} />
              </div>
              <div className="category-filter">
                {["Bộ lọc"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                      <MenuIcon />
                      {anchor}
                    </Button>
                    <SwipeableDrawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                      onOpen={toggleDrawer(anchor, true)}
                    >
                      {list(anchor)}
                    </SwipeableDrawer>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="search-title-right">
              <div className="woocommerce-result-count">
                Hiển thị 1–12 của 13 kết quả
              </div>

              <div className="woocommerce-ordering">
                <BtnOrder />
              </div>
            </div>
          </div>
          {products.length > 0 ? (
            <div className="search-content mt-2">
              <GridTable products={products} />
              <div className="flex justify-center mb-3">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, page) => setPage(page)}
                />
              </div>
            </div>
          ) : (
            <span className="my-4 block mt-2">
              Không có sản phẩm nào phù hợp với tìm kiếm của bạn.
            </span>
          )}
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default Searchpage;
