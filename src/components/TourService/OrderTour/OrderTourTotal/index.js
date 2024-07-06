import React from 'react'
import "./style.scss"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderTour } from 'api/tourOrder';
import { resetListOderTour } from 'redux/slices/listOrderTourSlice';
import { successToast } from 'utilities/toast';

function createData(name, price) {
    return { name, price };
}





const OrderTourTotal = ({ totalPrice }) => {

    const listOrderTour = useSelector((state) => state.listOrderTour.list);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    // console.log("totalPrice >>>>>", totalPrice)
    const rows = [
        createData('Tạm tính', totalPrice),
        createData('Tổng', totalPrice),
    ];

    const handleAddOrderTour = async () => {
        let isSuccessful = false;
        if (listOrderTour.length === 0) {
            return;
        }
        for (const item of listOrderTour) {
            const res = await orderTour(item, accessToken);
            // Xử lý kết quả ở đây nếu cần
            if (res.status === 201) {
                isSuccessful = true;
            }
        }

        if (isSuccessful) {
            successToast("Đặt tour thành công");
            dispatch(resetListOderTour())
            navigate("/tour/search")
        }
    }
    return (
        <div className="Container-OrderTourTotal">
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                Cộng giỏ hàng
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '16px', fontWeight: 'bold' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{ fontSize: '18px' }}>{row.name}</TableCell>
                                <TableCell align="right" style={{ fontSize: '18px' }}>{row.price}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow align='center' className='button-pay'>
                            <Button variant="contained" color="success"
                                onClick={() => { handleAddOrderTour() }}
                            >
                                Đặt Tour
                            </Button>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default OrderTourTotal