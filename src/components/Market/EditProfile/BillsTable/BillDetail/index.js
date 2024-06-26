import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getOrderItemByOrderProductId } from 'api/user';

function createData(id, stutus, productId, orderProductId, shopBoatId, quantity, price, sale, productName) {
    return { id, stutus, productId, orderProductId, shopBoatId, quantity, price, sale, productName };
}



export default function BillDetail({ data }) {
    const [rows, setRows] = React.useState([]);
    const accessToken = localStorage.getItem('accessToken');
    console.log("BillDetail: ", data);
    React.useEffect(() => {
        const fetchDataBillDetail = async () => {
            try {
                const response = await getOrderItemByOrderProductId(data[0], accessToken);
                // console.log(response.data);
                setRows(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchDataBillDetail();
    }, []);

    return (
        <>
            <p>Đơn hàng #<span style={{ backgroundColor: "yellow" }}>{data[0]}</span> đã được đặt lúc <span style={{ backgroundColor: "yellow" }}>{data[1]}</span>và hiện tại là
                <span style={{ backgroundColor: "yellow" }}>&nbsp;{data[2]}</span>.</p>
            <h3>CHI TIẾT ĐƠN HÀNG</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 620 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <h4>Sản phẩm</h4>
                            </TableCell>
                            <TableCell align="right">Tổng</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.productName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <a href={`http://localhost:3000/marketplace/product/${row.productSlug}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <span style={{ color: "#7db249" }}
                                        >{row.productName}</span>
                                    </a> x {row.quantity}
                                </TableCell>
                                <TableCell align="right">{row.price}₫</TableCell>
                            </TableRow>

                        ))}
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <b> Phương thức thanh toán</b>
                            </TableCell>
                            <TableCell align="right">
                                {data[4] === 'cash' ? "Thanh toán tiền mặt" : "Thanh toán qua thẻ"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <h4><b >Tổng đơn</b></h4>
                            </TableCell>
                            <TableCell align="right">{data[3]}₫</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
