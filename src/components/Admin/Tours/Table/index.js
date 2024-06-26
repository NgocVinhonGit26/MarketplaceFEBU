import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
import moment from "moment";
import EditModal from "./EditModal";
import Tooltip from "@mui/material/Tooltip";
import { deleteTour } from "api/tour";
import { successToast, errorToast } from "utilities/toast";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "bold",
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

export default function ToursTable({ tours, setTours }) {
  const handleDelete = async (id) => {
    try {
      const res = await deleteTour(id);
      if (res?.code === 200) {
        successToast("Xóa tour thành công");
        setTours((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      errorToast("Xóa tour thất bại");
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Tên tour</StyledTableCell>
            <StyledTableCell align="center">
              Thời gian khởi hành
            </StyledTableCell>
            <StyledTableCell align="center">Thời gian tour</StyledTableCell>
            <StyledTableCell align="center">Địa điểm khởi hành</StyledTableCell>
            <StyledTableCell align="center">Phương tiện</StyledTableCell>
            <StyledTableCell align="center">Giá</StyledTableCell>
            <StyledTableCell align="center">Thao tác</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tours.map((tour) => (
            <StyledTableRow key={tour._id}>
              <StyledTableCell align="center" >
                <p className=" font-semibold"> {tour.name}</p>
              </StyledTableCell>
              <StyledTableCell align="center">

                {moment(tour.startTime).format("DD/MM/YYYY")}
              </StyledTableCell>
              <StyledTableCell align="center">
                {tour.tourDuration}
              </StyledTableCell>
              <StyledTableCell align="center">
                {tour.startLocation}
              </StyledTableCell>
              <StyledTableCell align="center">
                {tour.transport}
              </StyledTableCell>
              <StyledTableCell align="center">{tour.price}</StyledTableCell>
              <StyledTableCell align="center">
                <div className="flex justify-center">
                  <EditModal
                    tour={tour}
                    setTours={setTours}
                  />
                  <Tooltip title="Xóa" placement="top">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(tour._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
