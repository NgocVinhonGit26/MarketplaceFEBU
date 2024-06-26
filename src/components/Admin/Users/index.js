import DashboardLayout from "layouts/DashboardLayout";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Grid } from "@mui/material";
import SearchForm from "./SearchForm";
import UsersTable from "./UsersTable";
import { getAllUsers } from "api/user";
import { getTotalPageUser } from "api/user";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSearch, setPageSearch] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 5;
    const [isSearching, setIsSearching] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const accessToken = localStorage.getItem("accessToken");


    const fetchUsers = async (data) => {
        try {
            const total = await getTotalPageUser(page - 1, data, accessToken);
            const response = await getAllUsers(page - 1, data, accessToken);

            setUsers(response);
            setTotal(total);
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (!isSearching) {
            fetchUsers([])
        }
    }, [page]);



    const updateData = (id) => {
        const newData = users.filter((user) => user.id !== id);
        setUsers(newData);
    };


    const onSearch = async (page, data) => {
        try {
            const response = await getAllUsers(page - 1, data, accessToken);
            const total = await getTotalPageUser(page - 1, data, accessToken);
            setTotal(total);
            setUsers(response);
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
    };

    return (
        <DashboardLayout layoutRole={0}>
            <h1>Quản lý người dùng</h1>
            <Grid item xs={12}>
                <SearchForm
                    setIsSearching={setIsSearching}
                    onSearch={onSearch}
                    fetchUsers={fetchUsers}
                    pageSearch={pageSearch}
                    setPageSearch={setPageSearch}
                    setPage={setPage}
                />
            </Grid>
            <Grid item xs={12}>
                <UsersTable
                    users={users}
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

export default Users;
