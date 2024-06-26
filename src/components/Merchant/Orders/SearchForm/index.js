import { Form, Button, InputGroup, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { errorToast } from "utilities/toast";

const SearchForm = ({
  setIsSearching,
  onSearch,
  fetchOrders,
  pageSearch,
  setPageSearch,
  setPage,
}) => {
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    dateFrom: "",
    dateTo: "",
    totalFrom: 0,
    totalTo: 0,
    customerAddress: "",
    status: "",
  });

  const isFormDataEmpty = () => {
    for (const key in formData) {
      if (formData[key] !== "") {
        return false;
      }
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormDataEmpty()) {
      setIsSearching(true);
    }
    // Gửi các giá trị tìm kiếm đến hàm xử lý tìm kiếm
    const payload = {
      ...formData,
      dateFrom: formData.dateFrom ? new Date(formData.dateFrom).toISOString().slice(0, 19).replace("T", " ") : null,
      dateTo: formData.dateTo ? new Date(formData.dateTo).toISOString().slice(0, 19).replace("T", " ") : null,
    };
    if (formData.dateFrom > formData.dateTo) {
      errorToast("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
      return;
    }
    // console.log("payload", payload);
    onSearch(pageSearch, payload);
    setFormData({
      ...formData,
      dateFrom: formData.dateFrom ? new Date(formData.dateFrom).toISOString().slice(0, 19).replace("T", " ") : null,
      dateTo: formData.dateTo ? new Date(formData.dateTo).toISOString().slice(0, 19).replace("T", " ") : null,
    });
  };

  useEffect(() => {
    onSearch(pageSearch, formData);
  }, [pageSearch]);

  const resetForm = () => {
    setFormData({
      customerName: "",
      customerPhoneNumber: "",
      customerAddress: "",
      dateFrom: 0,
      dateTo: 0,
      totalFrom: "",
      totalTo: "",
      status: "",
    });
    setIsSearching(false);
    setPageSearch(1);
    setPage(1);
    fetchOrders();
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col>
          {/* Tên khách hàng */}
          <Form.Group controlId="customerName">
            <Form.Label>Tên khách hàng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên khách hàng"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  customerName: e.target.value,
                });
              }}
              value={formData.customerName}
            />
          </Form.Group>
        </Col>

        <Col>
          {/* Số điện thoại */}
          <Form.Group controlId="phoneNumber">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Nhập số điện thoại"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  customerPhoneNumber: e.target.value,
                });
              }}
              value={formData.customerPhoneNumber}
            />
          </Form.Group>
        </Col>
      </Row>
      {/* Khoảng thời gian từ đến */}
      <Row className="mb-6">
        <Col>
          <Row>
            <Col>
              <Form.Group controlId="dateFrom">
                <Form.Label>Từ ngày</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      dateFrom: e.target.value,
                    });
                  }}
                  value={formData.dateFrom}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="dateTo">
                <Form.Label>Đến ngày</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      dateTo: e.target.value,
                    });
                  }}
                  value={formData.dateTo}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>

        <Col className="d-flex align-items-end">
          <InputGroup>
            <Form.Control
              name="totalFrom"
              type="number"
              placeholder="Giá trị từ"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  totalFrom: e.target.value,
                });
              }}
              value={formData.totalFrom}
            />
            <InputGroup.Text>đến</InputGroup.Text>
            <Form.Control
              name="totalTo"
              type="number"
              placeholder="Đến giá trị"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  totalTo: e.target.value,
                });
              }}
              value={formData.totalTo}
            />
          </InputGroup>
        </Col>
      </Row>
      {/* Địa chỉ */}

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="customerAddress" className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  customerAddress: e.target.value,
                });
              }}
              value={formData.customerAddress}
            />
          </Form.Group>
        </Col>
        <Col colSpan={2}>
          {/* Trạng thái */}
          <Form.Group controlId="status">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  status: e.target.value,
                });
              }}
              value={formData.status}
            >
              <option value={""}>Tất cả</option>
              <option value={"pending"}>Chờ xác nhận</option>
              <option value={"accepted"}>Đã xác nhận</option>
              <option value={"cancelled"}>Đã hủy</option>
              <option value={"delivering"}>Đang giao hàng</option>
              <option value={"completed"}>Đã hoàn thành</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col colSpan={10} className="d-flex align-items-center mt-3">
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Tìm kiếm
          </Button>
          <Button variant="secondary" className="ms-2" onClick={resetForm}>
            Xóa bộ lọc
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
