import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

function SearchForm(props) {
  const { setIsSearching, onSearch, fetchShopBoats, pageSearch, setPageSearch, setPage } = props;
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    phoneNumber: "",
    type: "",
    // nameOwner: "",
    status: "",
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

  const resetForm = () => {

    setFormData({
      name: "",
      code: "",
      phoneNumber: "",
      type: "",
      // nameOwner: "",
      status: "",
    });
    setIsSearching(false);
    setPageSearch(1)
    setPage(1)
    fetchShopBoats([])

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormDataEmpty()) {
      setIsSearching(true);
    }
    onSearch(pageSearch, formData);
  };

  useEffect(() => {
    onSearch(pageSearch, formData);
  }, [pageSearch]);


  return (
    <Form onSubmit={handleSubmit} className="mb-6">
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formName">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBoatNumber">
            <Form.Label>Mã số thuyền</Form.Label>
            <Form.Control
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formType">
            <Form.Label>Loại thuyền</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formStatus">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Tất cả</option>
              <option value={0}>Chưa kích hoạt</option>
              <option value={1}>Hoạt động</option>
              <option value={2}>Bị cấm</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-end">
          <Button variant="primary" type="submit">
            Tìm kiếm
          </Button>
          <Button
            variant="warning"
            className="ms-2"
            type="button"
            onClick={resetForm}
          >
            Xóa bộ lọc
          </Button>
        </Col>
      </Row>
    </Form>
  );

}

export default SearchForm;
