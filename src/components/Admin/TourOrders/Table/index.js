import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { Badge, Button } from "react-bootstrap";
import DetailModal from "./DetailModal";
import { changeStatus } from "api/tourOrder";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TourOrdersTable({ tourOrders, setTourOrders, updateData }) {

  const accessToken = localStorage.getItem("accessToken");

  const handleChangeStatus = async (id, status, orderTour) => {
    try {
      const response = await changeStatus(id,
        {
          ...orderTour,
          status: status,
        }, accessToken);

      if (response?.status === 200) {
        updateData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("tourOrders", tourOrders);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Thời gian đặt</StyledTableCell>
            <StyledTableCell align="center">Tên khách hàng</StyledTableCell>
            <StyledTableCell align="center">Tên Tour</StyledTableCell>
            <StyledTableCell align="center">Số lượng</StyledTableCell>
            <StyledTableCell align="center">Đơn giá</StyledTableCell>
            <StyledTableCell align="center">Ngày đi</StyledTableCell>
            <StyledTableCell align="center">Tổng tiền</StyledTableCell>
            <StyledTableCell align="center">Trạng thái</StyledTableCell>
            <StyledTableCell align="center">Chi tiết</StyledTableCell>
            <StyledTableCell align="center">Hành động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tourOrders.map((row) => (
            <StyledTableRow key={uuidv4()}>
              <StyledTableCell align="center">
                {moment(row?.createAt).format("DD/MM/YYYY HH:mm:ss")}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row?.userName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row?.tourName}
              </StyledTableCell>
              <StyledTableCell align="center">{row?.quantity}</StyledTableCell>
              <StyledTableCell align="center">{row?.tourPrice}</StyledTableCell>
              <StyledTableCell align="center">
                {moment(row?.startTime).format("DD/MM/YYYY")}
              </StyledTableCell>
              <StyledTableCell align="center">{row?.price}</StyledTableCell>
              <StyledTableCell align="center">
                {row?.status === 0 ? (
                  <Badge bg="warning">Chờ xác nhận</Badge>
                ) : row?.status === 1 ? (
                  <Badge bg="success">Đã xác nhận</Badge>
                ) : row?.status === 2 ? (
                  <Badge bg="danger">Đã hủy</Badge>
                ) : (
                  <Badge bg="info">Đã hoàn thành</Badge>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <DetailModal tourOrder={row} />
              </StyledTableCell>
              <StyledTableCell align="center">
                {row?.status === 0 ? (
                  <div className="d-flex justify-content-center">
                    <Tooltip title="Xác nhận" arrow>
                      <IconButton
                        onClick={() => handleChangeStatus(row?.id, 1, row)}
                        color="success"
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hủy" arrow>
                      <IconButton
                        onClick={() =>
                          handleChangeStatus(row?.id, 2, row)
                        }
                        color="error"
                      >
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : row?.status === 1 ? (
                  <div className="d-flex justify-content-center">
                    <Tooltip title="Đã hoàn thành" arrow>
                      <IconButton
                        onClick={() => handleChangeStatus(row?.id, 3, row)}
                        color="info"
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hủy" arrow>
                      <IconButton
                        onClick={() =>
                          handleChangeStatus(row?.id, 2, row)
                        }
                        color="error"
                      >
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  <></>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
