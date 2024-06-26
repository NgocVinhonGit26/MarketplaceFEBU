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

export default function DetailModal({ user }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [categories, setCategories] = React.useState([]);

    // React.useEffect(() => {
    //     const getCategories = async () => {
    //         try {
    //             const res = await getListCategoriesOfShop(user._id);
    //             if (res?.status === 200) {
    //                 setCategories(res.data.data);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     getCategories();
    // }, []);

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
                            src={user?.avatar}
                            alt="Shop Avatar"
                            style={{ width: "90%" }}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Mã số</strong>
                                    </td>
                                    <td>{user?.id || "Chưa có"}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Tên người dùng</strong>
                                    </td>
                                    <td>{user?.name}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Địa chỉ</strong>
                                    </td>
                                    <td>{user?.address}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Số điện thoại</strong>
                                    </td>
                                    <td>{user?.phoneNumber || "Chưa có"}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Vai trò</strong>
                                    </td>
                                    <td>
                                        {user?.role === 'ADMIN' ? "Ban quản lý" : user?.role === 'MERCHANT' ? "Chủ thuyền" : "Người dùng"}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
