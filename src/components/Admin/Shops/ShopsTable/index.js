import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Badge from "react-bootstrap/Badge";
import { updateShopBoatStatus } from "api/shopBoat";
import { Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { getAllShopBoatsWithoutPagination } from "api/shopBoat";
const DetailModal = React.lazy(() => import("./DetailModal"));

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

export default function ShopsTable({ shopBoats, updateData, fetchShopBoats }) {
  const handleChangeStatus = async (id, status, data) => {
    // console.log("check onClick")
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await updateShopBoatStatus(id, {
        ...data,
        status: status,

      }, accessToken);
      console.log("response update status shopbooat:>>> ", response);
      // console.log(updateData);

      if (response?.status === 200) {
        updateData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // React.useEffect(() => {
  //   fetchShopBoats();
  // }, [shopBoats]);


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <span className="font-bold">Ảnh</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="font-bold">Tên</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Mã số</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Chủ thuyền</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Số điện thoại</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Địa chỉ</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Loại</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Trạng thái</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Chi tiết</span>
            </StyledTableCell>
            <StyledTableCell align="center">
              <span className="font-bold">Thao tác</span>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shopBoats.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                <img src={row.avatar} alt={row.name} width="100" />
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">
                {row.code || "Chưa có"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {/* {row.owner?.firstName} {row.owner?.lastName} */}
                {row.ownerName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.phoneNumber || "Chưa có"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.address || "Chưa có"}
              </StyledTableCell>
              <StyledTableCell align="center">{row.type}</StyledTableCell>
              <StyledTableCell align="center">
                {row.status === 1 ? (
                  <Badge bg="success">Hoạt động</Badge>
                ) : row.status === 0 ? (
                  <Badge bg="warning">Chưa hoạt động</Badge>
                ) : (
                  <Badge bg="danger">Bị khóa</Badge>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <DetailModal shopBoat={row} />
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.status === 1 ? (
                  <Tooltip title="Khóa">
                    <IconButton
                      aria-label="Khóa"
                      color="error"
                      onClick={() => handleChangeStatus(row.id, 2, row)}
                    >
                      <LockIcon />
                    </IconButton>
                  </Tooltip>
                ) : row.status === 0 ? (
                  <Tooltip title="Kích hoạt">
                    <IconButton
                      aria-label="Kích hoạt"
                      color="success"
                      onClick={() => handleChangeStatus(row.id, 1, row)}
                    >
                      <LockOpenIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Mở khóa">
                    <IconButton
                      aria-label="Mở khóa"
                      color="success"
                      onClick={() => handleChangeStatus(row.id, 1, row)}
                    >
                      <LockOpenIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
