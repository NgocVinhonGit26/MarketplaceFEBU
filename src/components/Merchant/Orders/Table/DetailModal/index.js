import Button from "react-bootstrap/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import moment from "moment";
import { useEffect } from "react";
import { getOrderItemByOrderProductId } from "api/shopBoat";
import { updateQuantityProductById } from "api/product";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DetailModal = ({ order }) => {
  const [open, setOpen] = React.useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const [orderItems, setOrderItems] = React.useState([]);
  const idShopBoat = localStorage.getItem("shopBoatId");


  const getOrderItem = async (orderProductId) => {
    try {
      const response = await getOrderItemByOrderProductId(idShopBoat, orderProductId, accessToken);
      // console.log("item keme: ", response.data);
      setOrderItems(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  // if (open) {

  // }
  const handleOpen = () => {
    setOpen(true)
    getOrderItem(order.id);
  };
  const handleClose = () => setOpen(false);


  // const updateQuantityProduct = async (id, orderQuantity) => {
  //   try {
  //     const response = await updateQuantityProductById(id, orderQuantity, accessToken);

  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   if (isCompleted) {

  //     orderItems.forEach((item) => {
  //       console.log("item akaka: ", item);
  //       updateQuantityProduct(item.productId, item.quantity);
  //     });
  //     setIsCompleted(false);
  //     setOrderItems([]);
  //   }
  // }, [isCompleted]);

  return (
    <div>
      <Button variant="primary" onClick={handleOpen} style={{ width: "80px", height: "40px" }}>
        Chi tiết
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Row className="mb-3">
            <Col>
              <Card>
                <Card.Body>
                  <h4>Chi tiết đơn hàng</h4>
                  <p>
                    <span className="font-semibold">Ngày:</span>{" "}
                    {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
                  </p>
                  <p>
                    <span className="font-semibold">Khách hàng:</span>{" "}
                    {order?.userName}
                  </p>
                  <p>
                    <span className="font-semibold">Số điện thoại:</span>{" "}
                    {order?.userNumberPhone}
                  </p>
                  <p>
                    <span className="font-semibold">Địa chỉ:</span>{" "}
                    {order?.userAddress}
                  </p>
                  <p>
                    <span className="font-semibold">Tổng đơn:</span> $
                    {order?.total}
                  </p>
                  <p>
                    <span className="font-semibold">Trạng thái:</span>{" "}
                    {order.statusOrderItems === "pending" ? (
                      <Badge pill bg="warning">
                        Chờ xác nhận
                      </Badge>
                    ) : order.statusOrderItems === "accepted" ? (
                      <Badge pill bg="success">
                        Đã xác nhận
                      </Badge>
                    ) : order.statusOrderItems === "cancelled" ? (
                      <Badge pill bg="danger">
                        Đã hủy
                      </Badge>
                    ) : order.statusOrderItems === "delivering" ? (
                      <Badge pill bg="info">
                        Đang giao hàng
                      </Badge>
                    ) : (
                      <Badge pill bg="primary">
                        Đã hoàn thành
                      </Badge>
                    )}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <h4>Items</h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Discount (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={item?.productAvatar}
                              alt={item?.productName}
                              style={{ width: "50px", height: "50px" }}
                            />
                          </td>
                          <td align="center" style={{ textAlign: "center" }}>{item?.productName}</td>
                          <td align="center">{item.quantity}</td>
                          <td align="center">${item.price}</td>
                          <td align="center">{item.sale}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailModal;
