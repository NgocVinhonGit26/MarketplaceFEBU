import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { errorToast } from "utilities/toast";

function SearchForm(props) {

  const { onSearch, fetchTourOrders, setIsSearch, pageSearch, setPageSearch, setPageCurrent } = props;
  const [formData, setFormData] = useState({
    userName: "",
    tourName: "",
    startTimeFrom: "",
    startTimeTo: "",
    priceFrom: "",
    priceTo: "",
    status: "",
    createdAtFrom: "",
    createdAtTo: "",
  });

  const isFormDataEmpty = () => {
    for (const key in formData) {
      if (formData[key] !== "") {
        return false; // trar ve false neu co 1 key nao do co gia tri
      }
    }
    return true; // tra ve true neu tat ca key deu rong
  }


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = (event) => {
    setFormData({
      userName: "",
      tourName: "",
      startTimeFrom: "",
      startTimeTo: "",
      priceFrom: "",
      priceTo: "",
      status: "",
      createdAtFrom: "",
      createdAtTo: "",
    });
    setIsSearch(false);
    fetchTourOrders([])
    setPageSearch(1);
    setPageCurrent(1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi thông tin tìm kiếm đi đâu đó (ví dụ: API hoặc xử lý ở phía máy chủ)
    if (!isFormDataEmpty()) {
      setIsSearch(true);
    }
    const payload = {
      ...formData,
      startTimeFrom: formData.startTimeFrom ? new Date(formData.startTimeFrom).toISOString().slice(0, 19).replace("T", " ") : null,
      startTimeTo: formData.startTimeTo ? new Date(formData.startTimeTo).toISOString().slice(0, 19).replace("T", " ") : null,
      createdAtFrom: formData.createdAtFrom ? new Date(formData.createdAtFrom).toISOString().slice(0, 19).replace("T", " ") : null,
      createdAtTo: formData.createdAtTo ? new Date(formData.createdAtTo).toISOString().slice(0, 19).replace("T", " ") : null,
    };
    if (payload.startTimeFrom > payload.startTimeTo) {
      errorToast("Thời gian khởi hành !!! Ngày bắt đầu không thể lớn hơn ngày kết thúc")
      return;
    }
    if (payload.createdAtFrom > payload.createdAtTo) {
      errorToast("Thời gian đặt tour !!! Ngày bắt đầu không thể lớn hơn ngày kết thúc");
      return;
    }
    onSearch(pageSearch, payload);
    // console.log("payload", payload);
    setFormData({
      ...formData,
      startTimeFrom: formData.startTimeFrom ? new Date(formData.startTimeFrom).toISOString().slice(0, 19).replace("T", " ") : null,
      startTimeTo: formData.startTimeTo ? new Date(formData.startTimeTo).toISOString().slice(0, 19).replace("T", " ") : null,
      createdAtFrom: formData.createdAtFrom ? new Date(formData.createdAtFrom).toISOString().slice(0, 19).replace("T", " ") : null,
      createdAtTo: formData.createdAtTo ? new Date(formData.createdAtTo).toISOString().slice(0, 19).replace("T", " ") : null,
    });

  };

  useEffect(() => {
    onSearch(pageSearch, formData);
  }, [pageSearch]);

  return (
    <Form onSubmit={handleSubmit} onReset={handleReset}>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="userName">
            <Form.Label>Tên khách hàng</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="tourName">
            <Form.Label>Tên tour</Form.Label>
            <Form.Control
              type="text"
              name="tourName"
              primary
              value={formData.tourName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="startTimeFrom">
            <Form.Label>Thời gian khởi hành (Từ)</Form.Label>
            <Form.Control
              type="date"
              name="startTimeFrom"
              value={formData.departureStartDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="startTimeTo">
            <Form.Label>Thời gian khởi hành (Đến)</Form.Label>
            <Form.Control
              type="date"
              name="startTimeTo"
              value={formData.departureEndDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="priceFrom">
            <Form.Label>Tổng hóa đơn (Từ)</Form.Label>
            <Form.Control
              type="number"
              name="priceFrom"
              value={formData.totalBillMin}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="priceTo">
            <Form.Label>Tổng hóa đơn (Đến)</Form.Label>
            <Form.Control
              type="number"
              name="priceTo"
              value={formData.totalBillMax}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="orderStatus">
            <Form.Label>Trạng thái đơn</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="all">Chọn trạng thái</option>
              <option value={0}>Chưa xử lý</option>
              <option value={1}>Đã xác nhận</option>
              <option value={2}>Đã hủy</option>
              <option value={3}>Đã hoàn thành</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="createdAtFrom">
            <Form.Label>Thời gian đặt tour (Từ)</Form.Label>
            <Form.Control
              type="date"
              name="createdAtFrom"
              value={formData.bookingStartDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="createdAtTo">
            <Form.Label>Thời gian đặt tour (Đến)</Form.Label>
            <Form.Control
              type="date"
              name="createdAtTo"
              value={formData.bookingEndDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-end">
          <Button variant="primary" type="submit" className="me-2">
            Tìm kiếm
          </Button>
          <Button variant="warning" type="reset">
            Xóa bộ lọc
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchForm;
