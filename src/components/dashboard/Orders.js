import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { getTop5ProductByRevenueInToday } from 'api/productOrder';
import { getTop5ProductByRevenueInThisWeek } from 'api/productOrder';
import { getTop5ProductByRevenueInThisMonth } from 'api/productOrder';
import { getTop5ProductByRevenueInThisYear } from 'api/productOrder';

// Generate Order Data
function createData(STT, name, image, totalOrders, totalPrice) {
  return { STT, name, image, totalOrders, totalPrice };
}

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({ value }) {

  const [rows, setRows] = React.useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const idShop = localStorage.getItem("shopBoatId");

  const fetchTop5ProductHighestPriceInToday = async () => {
    try {
      const response = await getTop5ProductByRevenueInToday(idShop, accessToken);
      console.log("dsds: ", response.data);
      response.data.forEach((item, index) => {
        setRows((prev) => [
          ...prev,
          createData(
            item[0],
            item[1],
            item[2],
            item[3],
            item[4]
          ),
        ]);
      });

    }
    catch (error) {
      console.log(error);
    }
  }

  const fetchTop5ProductHighestPriceInThisWeek = async () => {
    try {
      const response = await getTop5ProductByRevenueInThisWeek(idShop, accessToken);
      console.log("dsds: ", response.data);
      response.data.forEach((item, index) => {
        setRows((prev) => [
          ...prev,
          createData(
            item[0],
            item[1],
            item[2],
            item[3],
            item[4]
          ),
        ]);
      });

    }
    catch (error) {
      console.log(error);
    }
  }

  const fetchTop5ProductHighestPriceInThisMonth = async () => {
    try {
      const response = await getTop5ProductByRevenueInThisMonth(idShop, accessToken);
      console.log("dsds: ", response.data);
      response.data.forEach((item, index) => {
        setRows((prev) => [
          ...prev,
          createData(
            item[0],
            item[1],
            item[2],
            item[3],
            item[4]
          ),
        ]);
      });

    }
    catch (error) {
      console.log(error);
    }
  }

  const fetchTop5ProductHighestPriceInThisYear = async () => {
    try {
      const response = await getTop5ProductByRevenueInThisYear(idShop, accessToken);
      console.log("dsds: ", response.data);
      response.data.forEach((item, index) => {
        setRows((prev) => [
          ...prev,
          createData(
            item[0],
            item[1],
            item[2],
            item[3],
            item[4]
          ),
        ]);
      });

    }
    catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (value === 1) {
      fetchTop5ProductHighestPriceInToday();
    }
    if (value === 2) {
      fetchTop5ProductHighestPriceInThisWeek();
    }
    if (value === 3) {
      fetchTop5ProductHighestPriceInThisMonth();
    }
    if (value === 4) {
      fetchTop5ProductHighestPriceInThisYear();
    }
    setRows([]);
  }, [value]);
  return (
    <React.Fragment>
      <Title>Top5 sản phẩm bán chạy</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Ảnh</TableCell>
            <TableCell>Tổng số lượng</TableCell>
            <TableCell >Tổng doanh thu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.STT}>
              <TableCell>#{row.STT}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <img src={row.image} alt="product" style={{ width: 50, height: 50 }} />
              </TableCell>
              <TableCell>{row.totalOrders}</TableCell>
              <TableCell>{`${row.totalPrice}₫`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
