import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import PropTypes from "prop-types";
import makeAnimated from "react-select/animated";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as React from "react";

const animatedComponents = makeAnimated();
DetailProductModal.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        sale: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
        countInStock: PropTypes.number.isRequired,
    }).isRequired,
    updateData: PropTypes.func.isRequired,
};


function DetailProductModal({ product }) {
    const [open, setOpen] = useState(false);
    const handleShow = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: "absolute",
        top: "500px",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        pt: 2,
        overflowY: "auto",
        maxHeight: "80vh",
    };
    return (
        <>
            <Button variant="info text-white" onClick={handleShow}>
                Xem chi tiết
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="relative">
                        <h2 className="text-center font-bold text-2xl mb-4 border-b-2 pb-2">
                            Chi tiết sản phẩm
                        </h2>
                        <div className="flex absolute right-0 bottom-2">

                            <Button variant="danger" onClick={handleClose}>
                                Đóng
                            </Button>
                        </div>
                    </div>
                    <Form>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="col-span-1">
                                <img src={product[7]} alt={product[1]} className="max-w-[320px]" />
                            </div>
                            <div className="flex col-span-1 flex-col">
                                <Form.Group className="mb-3 w-full" controlId="name">
                                    <Form.Label className="font-medium">Tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={product[1]}
                                        disabled
                                    />
                                </Form.Group>
                                <div className="flex gap-4">
                                    <Form.Group className="mb-3" controlId="price">
                                        <Form.Label>Đơn giá</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter price"
                                            value={product[4]}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="discount">
                                        <Form.Label>Giảm giá</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter discount percentage"
                                            value={product[5]}
                                            disabled
                                        />
                                    </Form.Group>
                                </div>
                                <div className="flex gap-4">
                                    <Form.Group className="mb-3" controlId="stock">
                                        <Form.Label>Hàng trong kho</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter stock quantity"
                                            value={product[6]}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="unit">
                                        <Form.Label>Đơn vị</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter unit"
                                            value={product[8]}
                                            disabled
                                        />
                                    </Form.Group>
                                </div>

                            </div>
                        </div>

                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Nhãn sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter unit"
                                value={product[9]}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 w-full" controlId="name">
                            {/* <div className="flex justify-between"> */}
                            <Form.Label className="font-medium mb-[1px]">
                                Thông tin bổ sung
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Url video"
                                value={product[13] === null ? "" : product[13]}
                                disabled
                            />
                            {/* </div> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Mô tả sản phẩm</Form.Label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={product[3]}
                                onReady={(editor) => {
                                    // You can store the "editor" and use when it is needed.
                                    //console.log("Editor is ready to use!", editor);
                                }}
                                disabled
                                onBlur={(event, editor) => {
                                    //console.log("Blur.", editor);
                                }}
                                onFocus={(event, editor) => {
                                    //console.log("Focus.", editor);
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Box>
            </Modal>
        </>
    );
}

export default DetailProductModal;