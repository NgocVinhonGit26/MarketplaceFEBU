import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import "./style.scss";
import MenuIcon from "@mui/icons-material/Menu";
import TourLayout from "layouts/CustomerLayout/TourLayout";
import FilterBar from "components/Market/Searchpage/FilterBar";
import BasicBreadcrumbs from "components/Market/Searchpage/Breadcrumbs";
import BtnOrder from "components/Market/Searchpage/BtnOrder";
import GridTable from "./GridTable";
import { useParams } from "react-router-dom";
import { searchTour, getListTour } from "api/tour";
import Pagination from "@mui/material/Pagination";
const Searchpage = () => {
  const { name } = useParams();
  const [cost, setCost] = React.useState([10000, 2000000]);
  const minDistance = 50000;

  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(12);
  const [totalPage, setTotalPage] = React.useState(0);
  const [totalDocs, setTotalDocs] = React.useState(0);
  const [tours, setTours] = React.useState([]);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  React.useEffect(() => {
    console.log("cost", cost);
  }, [cost]);

  // const fetchTour = async () => {
  //   try {
  //     const response = await searchTour(page, limit, {
  //       name,
  //       minPrice: cost[0],
  //       maxPrice: cost[1],
  //     });
  //     setTours(response.data.docs || []);
  //     setTotalPage(response.data.totalPages);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchTour = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await getListTour(accessToken);
      console.log("response >>>>>", response);
      setTours(response || []);
    } catch (error) {
      console.log(error);
    }
  };

  const onChagePage = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    fetchTour();
  }, [name]);

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
        min={10000}
        max={2000000}
      />
      {/* btn filter */}
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="success" onClick={fetchTour}>
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
    <TourLayout>
      <div className="container-searchpage-tour">
        <div className="searchpage">
          <div className="search-title">
            <div className="search-title-left">
              {name ? (
                <div className="text-search">
                  <h2>Kết quả tìm kiếm: "{name}"</h2>
                </div>
              ) : (
                <></>
              )}
              <div className="path-result">
                <BasicBreadcrumbs />
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
          <div className="search-content">
            <GridTable tours={tours} />
          </div>
          <div className="flex justify-center mt-3">
            <Pagination
              count={totalPage}
              page={page}
              onChange={onChagePage}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </div>
      </div>
    </TourLayout>
  );
};

export default Searchpage;
