import DashboardLayout from "layouts/DashboardLayout";
import Pagination from "@mui/material/Pagination";
import { Grid, Paper } from "@mui/material";
import TourOrdersTable from "./Table";
import { getAllTourOrders } from "api/tourOrder";
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import { getTotalPageOrderTour } from "api/tourOrder";
const TourOrders = () => {
  const [tourOrders, setTourOrders] = useState([]); // [1]
  const [pageCurrent, setPageCurrent] = useState(1)
  const [pageSearch, setPageSearch] = useState(1)
  const [total, setTotal] = useState(0);
  const [tourOrderSearch, setTourOrderSearch] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const limit = 5;
  const accessToken = localStorage.getItem("accessToken");

  const fetchTourOrders = async (queryCondition = {}) => {
    try {
      const response = await getAllTourOrders(pageCurrent - 1, queryCondition, accessToken);
      setTourOrders(response);
      const total = await getTotalPageOrderTour(pageCurrent - 1, queryCondition, accessToken);
      // console.log("total >>>>>>> akahehe: ", total)
      setTotal(total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isSearch) {
      fetchTourOrders([]);
    }
  }, [pageCurrent]);

  const handleChangePage = (event, value) => {
    if (isSearch) {
      setPageSearch(value);
    }
    else {
      setPageCurrent(value);
    }
  };

  const handleSearch = async (page, queryCondition) => {
    // setPageCurrent(1);
    try {
      const response = await getAllTourOrders(page - 1, queryCondition, accessToken);
      setTourOrders(response);
      // console.log("response >>>>>>> aka 123: ", response)
      const total = await getTotalPageOrderTour(page - 1, queryCondition, accessToken);
      setTotal(total);
      // console.log("response >>>>>>> aka 123: ", total)
    }
    catch (error) {
      console.log(error);
    }

  };

  const updateData = (data) => {
    const newData = tourOrders.map((tourOrder) => {
      if (tourOrder.id === data.id) {
        return {
          ...tourOrder,
          status: data.status, // Cập nhật trường status của tourOrder
        };
      }
      return tourOrder;
    });
    setTourOrders(newData);
  };


  return (
    <DashboardLayout layoutRole={0}>
      <h1>Quản lí đặt Tour du lịch</h1>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <SearchForm
            onSearch={handleSearch}
            fetchTourOrders={fetchTourOrders}
            setIsSearch={setIsSearch}
            pageSearch={pageSearch}
            setPageSearch={setPageSearch}
            setPageCurrent={setPageCurrent}
          />
          <TourOrdersTable
            tourOrders={tourOrders}
            setTourOrders={setTourOrders}
            updateData={updateData}
          />
        </Paper>
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

export default TourOrders;
