import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { getTop5TourHighestPriceInToday } from 'api/tourOrder';
import { getTop5TourHighestPriceInThisWeek } from 'api/tourOrder';
import { getTop5TourHighestPriceInThisMonth } from 'api/tourOrder';
import { getTop5TourHighestPriceInThisYear } from 'api/tourOrder';

// Generate Order Data
function createData(STT, name, duration, totalOrders, totalPrice,) {
  return { STT, name, duration, totalOrders, totalPrice };
}



function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({ value }) {
  const [rows, setRows] = React.useState([]);
  const accessToken = localStorage.getItem('accessToken');

  const fetchTop5TourHighestPriceInToday = async () => {
    try {
      const response = await getTop5TourHighestPriceInToday(accessToken);
      response.data.forEach((item, index) => {
        setRows((prev) => [
          ...prev,
          createData(
            index + 1,
            item[0],
            item[1],
            item[2],
            item[3]
          ),
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const fetchTop5TourHighestPriceInThisWeek = async () => {
    try {
      const response = await getTop5TourHighestPriceInThisWeek(accessToken);
      response.data.forEach((item, index) => {
        setRows((prev) => [
          ...prev,
          createData(
            index + 1,
            item[0],
            item[1],
            item[2],
            item[3]
          ),
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const fetchTop5TourHighestPriceInThisMonth = async () => {
    try {
      const response = await getTop5TourHighestPriceInThisMonth(accessToken);
      response.data.forEach((item, index) => {
        setRows((prev) => [
          ...prev,
          createData(
            index + 1,
            item[0],
            item[1],
            item[2],
            item[3]
          ),
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const fetchTop5TourHighestPriceInThisYear = async () => {
    try {
      const response = await getTop5TourHighestPriceInThisYear(accessToken);
      response.data.forEach((item, index) => {
        setRows((prev) => [
          ...prev,
          createData(
            index + 1,
            item[0],
            item[1],
            item[2],
            item[3]
          ),
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (value === 1) {
      fetchTop5TourHighestPriceInToday();
    }
    if (value === 2) {
      fetchTop5TourHighestPriceInThisWeek();
    }
    if (value === 3) {
      fetchTop5TourHighestPriceInThisMonth();
    }
    if (value === 4) {
      fetchTop5TourHighestPriceInThisYear();
    }
    setRows([]);
    // return
  }, [value]);




  return (
    <React.Fragment>
      <Title>Top5 doanh thu</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên tour</TableCell>
            <TableCell >Thời lượng tour</TableCell>
            <TableCell>Tổng đơn</TableCell>
            <TableCell>Tổng doanh thu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.STT}>
                <TableCell>#{row.STT}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.totalOrders}</TableCell>
                <TableCell>{`${row.totalPrice}₫`}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <h5>Chưa có tour nào được thực hiện thành công 😥</h5>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
