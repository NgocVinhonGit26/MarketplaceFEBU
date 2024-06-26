import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import { Table } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { getListCategoriesOfShop } from "api/shopBoat";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DetailModal({ shopBoat }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await getListCategoriesOfShop(shopBoat._id);
        if (res?.status === 200) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <div>
      <Tooltip title="Chi tiết">
        <IconButton onClick={handleOpen} aria-label="detail" color="primary">
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex justify-content-center w-full  mb-4">
            <img
              src={shopBoat?.avatar}
              alt="Shop Avatar"
              style={{ width: "90%" }}
            />
          </div>
          <div className="d-flex justify-content-between">
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>
                    <strong>Tên cửa hàng</strong>
                  </td>
                  <td>{shopBoat?.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Mã số</strong>
                  </td>
                  <td>{shopBoat?.code || "Chưa có"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Loại</strong>
                  </td>
                  <td>{shopBoat?.type}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Trạng thái</strong>
                  </td>
                  <td>
                    {shopBoat?.status === 1 ? (
                      <Badge bg="success">Active</Badge>
                    ) : shopBoat?.status === 0 ? (
                      <Badge bg="warning">Inactive</Badge>
                    ) : (
                      <Badge bg="danger">Banned</Badge>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Loại mặt hàng</strong>
                  </td>
                  <td>
                    {categories?.map((category) => (
                      <Badge bg="primary" className="me-2" key={uuidv4()}>
                        {category.name}
                      </Badge>
                    ))}
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Tên chủ cửa hàng</strong>
                  </td>
                  <td>
                    {/* {shopBoat?.owner?.firstName} {shopBoat?.owner?.lastName} */}
                    {shopBoat?.ownerName}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Địa chỉ</strong>
                  </td>
                  <td>{shopBoat?.address}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Số điện thoại</strong>
                  </td>
                  <td>{shopBoat?.phoneNumber || "Chưa có"}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
