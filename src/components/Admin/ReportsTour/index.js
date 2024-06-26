import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from "react";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import DashboardLayout from "layouts/DashboardLayout";
import { getQuantityOrderTourCompleteInToday } from "api/tourOrder";
import { getQuantityOrderTourCancelInToday } from "api/tourOrder";
import { getQuantityOrderTourCompleteInThisWeek } from "api/tourOrder";
import { getQuantityOrderTourCancelInThisWeek } from "api/tourOrder";
import { getQuantityOrderTourCompleteInThisMonth } from "api/tourOrder";
import { getQuantityOrderTourCancelInThisMonth } from "api/tourOrder";
import { getQuantityOrderTourCompleteInThisYear } from "api/tourOrder";
import { getQuantityOrderTourCancelInThisYear } from "api/tourOrder";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}



export default function ReportAdmin() {
    const accessToken = localStorage.getItem("accessToken");

    const updateValue = (orderQuantity, money, cancelOrder) => {
        setData(prevData => prevData.map(item => {
            // Kiểm tra nếu title của phần tử là "Số đơn"
            if (item.title === "Số đơn") {
                // Trả về một bản sao của phần tử với giá trị value được cập nhật
                return { ...item, value: orderQuantity };
            }

            if (item.title === "Doanh thu") {
                return { ...item, value: money };
            }

            if (item.title === "Đơn hủy") {
                return { ...item, value: cancelOrder };
            }
            // Nếu không phải phần tử cần cập nhật, trả về phần tử ban đầu
            return item;
        }));
    }


    const [data, setData] = React.useState([
        { title: "Số đơn", value: 0 },
        { title: "Doanh thu", value: 0 },
        { title: "Đơn hủy", value: 0 }
    ]);

    const [profit, setProfit] = React.useState(
        {
            title: "Lợi nhuận",
            value: 0
        }
    );

    const [value, setValue] = React.useState(1);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    useEffect(() => {
        const getTotalOrderTour = async () => {
            if (value === 1) {
                const response = await getQuantityOrderTourCompleteInToday(accessToken);
                // console.log("response: ", response.data[0][0]);
                const cancelOrder = await getQuantityOrderTourCancelInToday(accessToken);
                // console.log("cancelOrder: ", cancelOrder);
                updateValue(response.data[0], response.data[1], cancelOrder.data);
            }
            if (value === 2) {
                const response = await getQuantityOrderTourCompleteInThisWeek(accessToken);
                const cancelOrder = await getQuantityOrderTourCancelInThisWeek(accessToken);
                updateValue(response.data[0], response.data[1], cancelOrder.data);
            }
            if (value === 3) {
                const response = await getQuantityOrderTourCompleteInThisMonth(accessToken);
                const cancelOrder = await getQuantityOrderTourCancelInThisMonth(accessToken);
                updateValue(response.data[0], response.data[1], cancelOrder.data);
            }
            if (value === 4) {
                const response = await getQuantityOrderTourCompleteInThisYear(accessToken);
                const cancelOrder = await getQuantityOrderTourCancelInThisYear(accessToken);
                updateValue(response.data[0], response.data[1], cancelOrder.data);
            }
        }
        getTotalOrderTour();
    }, [value]);

    return (
        <DashboardLayout layoutRole={0}>
            <Box sx={{ display: "flex" }}>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            {data.map((item) => (
                                <Grid item xs={15} md={4} lg={3}> {/* key là bắt buộc */}
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            height: 200,
                                        }}
                                    >
                                        <Deposits item={item} /> {/* Truyền dữ liệu mỗi item, không phải data */}
                                    </Paper>
                                </Grid>
                            ))}


                            <Box sx={{ minWidth: 150, marginLeft: 5, border: 'none' }}>
                                <FormControl fullWidth color="success" sx={{ backgroundColor: '#E9FBF0' }} variant='filled'>
                                    <InputLabel id="demo-simple-select-label">Bộ lọc</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={value}
                                        label="Bộ lọc"
                                        onChange={handleChange}

                                    >
                                        <MenuItem value={1}>Hôm nay</MenuItem>
                                        <MenuItem value={2}>Theo ngày</MenuItem>
                                        <MenuItem value={3}>Theo tuần</MenuItem>
                                        <MenuItem value={4}>Theo tháng</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Container>
                    {/* <Toolbar /> */}
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 240,
                                    }}
                                >
                                    <Chart value={value} />
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 240,
                                    }}
                                >
                                    <Deposits
                                        item={profit}
                                    />
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                    <Orders
                                        value={value}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </DashboardLayout >
    );
}
