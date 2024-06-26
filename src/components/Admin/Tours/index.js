import DashboardLayout from "layouts/DashboardLayout";
import Pagination from "@mui/material/Pagination";
import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import ToursTable from "./Table";
import { getAllTours } from "api/tour";
import SearchForm from "./SearchForm";
import { searchTour, getTotalPageTour } from "api/tour";
const Tours = () => {
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSearch, setPageSearch] = useState(1);
  const [total, setTotal] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const limit = 5;
  const accessToken = localStorage.getItem("accessToken");


  const fetchTours = async () => {
    try {
      const response = await searchTour(page - 1, accessToken, {});
      const totalPageTour = await getTotalPageTour(page - 1, accessToken, {});
      setTours(response);
      setTotal(totalPageTour.data);
      // console.log("response totalPageTour: ", total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isSearching) {
      fetchTours();
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

  const handleSearch = async (page, queryCondition) => {
    try {
      const response = await searchTour(page - 1, accessToken, queryCondition);
      const totalPageTour = await getTotalPageTour(page - 1, accessToken, queryCondition);
      // console.log("response search tour: ", response); 
      setTours(response);
      setTotal(totalPageTour.data);
      // setTotal(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const addTour = (tour) => {
    let newTours = [tour, ...tours];
    setTours(newTours);
  }

  return (
    <DashboardLayout layoutRole={0}>
      <h1>Quản lí Tour du lịch</h1>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <SearchForm
            onSearch={handleSearch}
            setTours={setTours}
            fetchTours={fetchTours}
            setIsSearching={setIsSearching}
            pageSearch={pageSearch}
            setPageSearch={setPageSearch}
            setPage={setPage}
            addTour={addTour}
          />
          <ToursTable
            tours={tours}
            setTours={setTours}
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

export default Tours;
