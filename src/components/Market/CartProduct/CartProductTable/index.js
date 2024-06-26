import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { removeOrder } from 'redux/slices/listOrderTourSlice';
import CartProduct from '..';
import { removeOrderProduct } from 'redux/slices/listOrderProductSlice';


const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
    return (
        <BaseNumberInput
            slots={{
                root: StyledInputRoot,
                input: StyledInput,
                incrementButton: StyledButton,
                decrementButton: StyledButton,
            }}
            slotProps={{
                incrementButton: {
                    children: <AddIcon fontSize="small" />,
                    className: 'increment',
                },
                decrementButton: {
                    children: <RemoveIcon fontSize="small" />,
                },
            }}
            {...props}
            ref={ref}
        />
    );
});




const CartProductTable = ({ listOrderProduct, setTotalPrice }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log("user current", useSelector((state) => state.user));
    // console.log("orderTour", useSelector((state) => state.orderTour));
    const name = useSelector((state) => state.user.name);
    // console.log("name", name);

    // const paymentMethod = useSelector((state) => state.orderTour.paymentMethod);
    // const quantity = useSelector((state) => state.orderTour.quantity);
    // const startTime = useSelector((state) => state.orderTour.startTime);
    // const status = useSelector((state) => state.orderTour.status);
    // const tourId = useSelector((state) => state.orderTour.tourId);
    // const userId = useSelector((state) => state.orderTour.userId);

    // console.log("print all orderTour", paymentMethod, quantity, startTime, status, tourId, userId)

    // const listOrderTour = useSelector((state) => state.list.list);
    // console.log("listOrderTour>>>>>>>", listOrderTour);
    let totalPricePerTour = 0;
    listOrderProduct.map((item) => {
        totalPricePerTour += item.price
    }
    );
    setTotalPrice(totalPricePerTour);
    localStorage.setItem("totalPriceProduct", totalPricePerTour);

    const handleDeleteProduct = (row) => {
        alert("Xóa sản phẩm khỏi giỏ hàng");
        dispatch(removeOrderProduct(row.id))
    }
    return (
        <div className='Container-OrderTourTable'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <caption style={{ fontSize: '15px' }}>Chào bạn {name}, hãy kiểm tra lại giỏ hàng nhé !</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                Sản phẩm
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '16px', fontWeight: 'bold' }}>Giá</TableCell>
                            <TableCell align="center" style={{ fontSize: '16px', fontWeight: 'bold' }}>Số lượng</TableCell>
                            <TableCell align="right" style={{ fontSize: '16px', fontWeight: 'bold' }}>Tạm tính</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listOrderProduct.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} style={{ textAlign: 'center', fontSize: '16px' }}>
                                    Không có sản phẩm nào trong giỏ hàng
                                </TableCell>
                            </TableRow>
                        ) : (
                            listOrderProduct.map((row) => {
                                const quantity = row.quantity;
                                return (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={{ fontSize: '18px' }}>
                                            <CancelSharpIcon fontSize='small'
                                                onClick={() => handleDeleteProduct(row)}
                                            />
                                            &nbsp;&nbsp;
                                            {row.productName}
                                        </TableCell>
                                        <TableCell align="right" style={{ fontSize: '18px' }}>
                                            {row.productPrice}&#8363;
                                        </TableCell>
                                        <TableCell align="right" style={{ fontSize: '18px' }}>
                                            <NumberInput
                                                aria-label="Quantity Input" min={1} max={1000}
                                                value={row.quantity}
                                            // onChange={(e) => handleQuantityChange(e, row.price, totalPricePerTour)}
                                            ></NumberInput>
                                        </TableCell>
                                        <TableCell align="right" style={{ fontSize: '18px' }} >
                                            {row.price}&#8363;
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                        <TableRow align='justify' className='button-pay'>
                            <Button
                                variant="outlined"
                                color="success"
                                style={{ fontWeight: 'bold', borderWidth: '3px', margin: '16px' }}
                                onClick={() => navigate("/marketplace/search/")}
                            >
                                <ArrowBackIcon />
                                Tiếp tục mua hàng
                            </Button>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}

export default CartProductTable;

const blue = {
    100: '#daecff',
    200: '#b6daff',
    300: '#66b2ff',
    400: '#3399ff',
    500: '#007fff',
    600: '#0072e5',
    700: '#0059B2',
    800: '#004c99',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const StyledInputRoot = styled('div')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  `
);

const StyledInput = styled('input')(
    ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.375;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };
    border-radius: 8px;
    margin: 0 8px;
    padding: 10px 12px;
    outline: 0;
    min-width: 0;
    width: 4rem;
    text-align: center;
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]
        };
    }
  
    &:focus-visible {
      outline: 0;
    }
  `
);

const StyledButton = styled('button')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    line-height: 1.5;
    border: 1px solid;
    border-radius: 999px;
    border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    width: 32px;
    height: 32px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
      border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
      color: ${grey[50]};
    }
  
    &:focus-visible {
      outline: 0;
    }
  
    &.increment {
      order: 1;
    }
  `
);