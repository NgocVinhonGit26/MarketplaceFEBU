import DashboardLayout from "layouts/DashboardLayout";
import { getAllShopBoats, getAllShopBoatsWithoutPagination } from "api/shopBoat";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import ShopsTable from "./ShopsTable";
import { Grid } from "@mui/material";
import SearchForm from "./SearchForm";
import { getTotalPages } from "api/shopBoat";

const Shops = () => {
  const [shopBoats, setShopBoats] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSearch, setPageSearch] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const accessToken = localStorage.getItem("accessToken");


  const fetchShopBoats = async (data) => {
    try {
      const total = await getTotalPages(page - 1, data, accessToken);
      const response = await getAllShopBoats(page - 1, data, accessToken);
      // console.log("dhdhhd 1", response.data)
      setShopBoats(response.data);
      setTotal(total.data);
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (!isSearching) {
      fetchShopBoats([])
    }
  }, [page]);

  const updateData = (data) => {
    const newData = shopBoats.map((shopBoat) => {
      if (shopBoat.id === data.id) {
        return data;
      }
      return shopBoat;
    });
    setShopBoats(newData);
  };

  const onSearch = async (page, data) => {
    try {
      const response = await getAllShopBoats(page - 1, data, accessToken);
      const total = await getTotalPages(page - 1, data, accessToken);
      console.log("total", total)
      setTotal(total.data);
      setShopBoats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, value) => {
    if (isSearching) {
      setPageSearch(value);
    }
    else {
      setPage(value);
    }
  }

  return (
    <DashboardLayout layoutRole={0}>
      <h1>Quản lí các thuyền buôn</h1>
      <Grid item xs={12}>
        <SearchForm
          setIsSearching={setIsSearching}
          onSearch={onSearch}
          fetchShopBoats={fetchShopBoats}
          pageSearch={pageSearch}
          setPageSearch={setPageSearch}
          setPage={setPage}
        />
      </Grid>
      <Grid item xs={12}>
        <ShopsTable
          shopBoats={shopBoats}
          updateData={updateData}
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

export default Shops;
