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
import { successToast } from 'utilities/toast';
import { resetListOderProduct } from 'redux/slices/listOrderProductSlice';
import { insertOrderItem } from 'api/productOrder';
import { errorToast } from 'utilities/toast';
import { updateTotalOrderProductById } from 'api/productOrder';

function createData(name, price) {
    return { name, price };
}


const CartProductTotal = ({ totalPrice }) => {

    const accessToken = localStorage.getItem("accessToken");
    const orderProductId = localStorage.getItem("orderProductId");
    const listOrderProduct = useSelector((state) => state.listOrderProduct.listProduct);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // console.log("totalPrice >>>>>", totalPrice)
    const rows = [
        createData('Tạm tính', totalPrice),
        createData('Tổng', totalPrice),
    ];

    const updateTotalOrderProduct = async () => {
        try {
            const res = await updateTotalOrderProductById(totalPrice, orderProductId, accessToken);
            // console.log("res>>>>>>>>>>>>>>: ", res)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleAddOrderProduct = async () => {
        if (localStorage.getItem("accessToken") === null) {
            navigate("/signin")
            errorToast("Vui lòng đăng nhập để đặt hàng")
            return
        }

        let isSuccessful = false;
        if (listOrderProduct.length === 0) {
            return;
        }

        updateTotalOrderProduct() // update total price of order product

        for (const item of listOrderProduct) {
            // item.orderProductId = localStorage.getItem("orderProductId")
            const res = await insertOrderItem(item, accessToken);
            // Xử lý kết quả ở đây nếu cần
            // console.log("res>>>>>>>>>>>>>>: ", item)
            if (res.status === 200) {
                isSuccessful = true;
            }
        }

        if (isSuccessful) {
            successToast("Đặt hàng thành công");
            dispatch(resetListOderProduct())
            navigate("/marketplace/search/")
            localStorage.setItem("hadCart", false)
            localStorage.setItem("orderProductId", "")
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
                                onClick={() => { handleAddOrderProduct() }}
                            >
                                Đặt hàng
                            </Button>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default CartProductTotal