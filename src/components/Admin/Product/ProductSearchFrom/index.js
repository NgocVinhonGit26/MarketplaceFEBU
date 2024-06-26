import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const ProductSearchFormAdmin = ({
    setIsSearching,
    onSearch,
    fetchProducts,
    pageSearch,
    setPageSearch,
    setPage,
}) => {

    const [listCategory, setListCategory] = useState([
        { value: 'Hoa Quả', label: 'Hoa Quả' },
        { value: 'Bánh Kẹo', label: 'Bánh Kẹo' },
        { value: 'Nông Sản Chế Biến', label: 'Nông Sản Chế Biến' }
    ]);

    const [formData, setFormData] = useState({
        name: "",
        priceFrom: "",
        priceTo: "",
        countInStock: false,
        category: "",
        sale: 0,
    });

    const isFormDataEmpty = () => {
        for (const key in formData) {
            if (formData[key] !== "") {
                return false; // trar ve false neu co 1 key nao do co gia tri
            }
        }
        return true; // tra ve true neu tat ca key deu rong
    }

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isFormDataEmpty()) {
            setIsSearching(true);
        }
        // Gửi các giá trị tìm kiếm đến hàm xử lý tìm kiếm
        onSearch(pageSearch, formData);
    }

    useEffect(() => {
        // console.log("pageSearch", pageSearch);
        onSearch(pageSearch, formData);
    }, [pageSearch])

    const clearForm = () => {
        setFormData({
            name: "",
            priceFrom: "",
            priceTo: "",
            countInStock: false,
            category: "",
            sale: 0,
        });
        setIsSearching(false);
        setPageSearch(1);
        setPage(1);
        fetchProducts([]);
    }
    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group controlId="name">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="priceFrom">
                        <Form.Label>Giá tối thiểu</Form.Label>
                        <Form.Control
                            type="number"
                            name="priceFrom"
                            value={formData.priceFrom}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="priceTo">
                        <Form.Label>Giá tối đa</Form.Label>
                        <Form.Control
                            type="number"
                            name="priceTo"
                            value={formData.priceTo}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col className="d-flex align-items-end">
                    <Form.Group controlId="countInStock">
                        <Form.Check
                            type="checkbox"
                            name="countInStock"
                            label="Còn hàng"
                            checked={formData.countInStock}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="category">
                        <Form.Label>Danh mục</Form.Label>
                        <Form.Control
                            as="select"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value="">Tất cả</option>
                            {listCategory?.map((category) => {
                                return (
                                    <option key={uuidv4()} value={category.value}>
                                        {category.label}
                                    </option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="sale">
                        <Form.Label>Giảm giá từ</Form.Label>
                        <Form.Control
                            type="number"
                            name="sale"
                            value={formData.sale}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col className="d-flex align-items-end">
                    <Button type="submit" variant="primary"
                        onClick={handleSubmit}
                    >
                        Tìm kiếm
                    </Button>
                    <Button variant="secondary" className="ms-2"
                        onClick={clearForm}
                    >
                        Xóa bộ lọc
                    </Button>
                    {/* <Button variant="success" className="ms-2">
                Thêm sản phẩm
              </Button> */}

                </Col>
            </Row>
        </Form>
    );
}

export default ProductSearchFormAdmin;