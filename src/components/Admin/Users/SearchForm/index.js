import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

function SearchForm(props) {
    const { setIsSearching, onSearch, fetchUsers, pageSearch, setPageSearch, setPage } = props;
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        address: "",
        phone_number: "",
        role: "",
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
        // console.log("name", name)
        // console.log("value", value)
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const resetForm = () => {

        setFormData({
            name: "",
            username: "",
            address: "",
            phone_number: "",
            role: "",
        });
        setIsSearching(false);
        setPageSearch(1)
        setPage(1)
        fetchUsers([])
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
                        <Form.Label>User name</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
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
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formType">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formStatus">
                        <Form.Label>Vai trò</Form.Label>
                        <Form.Control
                            as="select"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="">Tất cả</option>
                            <option value={'ADMIN'}>Bản quản lý</option>
                            <option value={'MERCHANT'}>Chủ thuyền</option>
                            <option value={'USER'}>Người dùng</option>
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
