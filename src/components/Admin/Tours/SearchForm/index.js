import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import AddModal from "../AddModal";
const SearchForm = ({ onSearch, setTours, fetchTours, setIsSearching, pageSearch, setPageSearch, setPage, addTour }) => {
  const [formData, setFormData] = useState({
    name: "",
    priceFrom: "",
    priceTo: "",
    transport: "",
    startLocation: "",
    tourDuration: "",
  });

  const isFormDataEmpty = () => {
    for (const key in formData) {
      if (formData[key] !== "") {
        return false;
      }
    }
    return true;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Gửi các giá trị tìm kiếm đến hàm onSearch
    if (!isFormDataEmpty()) {
      setIsSearching(true);
    }
    onSearch(pageSearch, formData);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      priceFrom: "",
      priceTo: "",
      transport: "",
      startLocation: "",
      tourDuration: "",
    });
    setIsSearching(false);
    fetchTours([])
    setPageSearch(1);
    setPage(1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    onSearch(pageSearch, formData);
  }, [pageSearch]);

  return (
    <Form className="mb-6">
      <Row>
        <Col>
          <Form.Group controlId="searchTerm">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tìm theo tên"
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="minPrice">
            <Form.Label>Giá tối thiểu</Form.Label>
            <Form.Control
              type="number"
              placeholder="Giá tối thiểu"
              value={formData.priceFrom}
              name="priceFrom"
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="maxPrice">
            <Form.Label>Giá tối đa</Form.Label>
            <Form.Control
              type="number"
              placeholder="Giá tối đa"
              value={formData.priceTo}
              name="priceTo"
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

      </Row>
      <Row>
        <Col>
          <Form.Group controlId="transport">
            <Form.Label>Phương tiện</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phương tiện"
              value={formData.transport}
              name="transport"
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="startLocation">
            <Form.Label>Điểm khởi hành</Form.Label>
            <Form.Control
              type="text"
              placeholder="Điểm khởi hành"
              value={formData.startLocation}
              name="startLocation"
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="tourDuration">
            <Form.Label>Thời gian tour</Form.Label>
            <Form.Control
              type="text"
              placeholder="Thời lượng tour"
              value={formData.tourDuration}
              name="tourDuration"
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col className="d-flex align-items-end">
          <Button variant="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
          <AddModal
            setTours={setTours}
            addTour={addTour}
          />
          <IconButton className="ms-2" onClick={resetForm}>
            <DeleteIcon />
          </IconButton>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
