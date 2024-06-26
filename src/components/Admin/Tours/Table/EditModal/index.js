import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Form, Row, Col } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { uploadImage, deleteImage } from "api/image";
import TourInformation from "./TourInformation";
import { updateTourById } from "api/tour";
import { successToast, errorToast } from "utilities/toast";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { set } from "date-fns";
const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditModal = ({ tour, setTours }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm(tour);
  };
  const [image, setImage] = React.useState("");
  const accessToken = localStorage.getItem("accessToken");

  const [tourData, setTourData] = useState({
    name: tour.name || "",
    slug: tour.slug || "",
    startTime: tour.startTime || "",
    startLocation: tour.startLocation || "",
    tourDuration: tour.tourDuration || "",
    description: tour.description || "",
    price: tour.price || 0,
    avatar: tour.avatar || "",
    transport: tour.transport || "",
    tourInformation: tour.tourInformation || "",
  });

  const removeVietnameseTones = (str) => {
    str = str.replace(/á|à|ả|ã|ạ|â|ấ|ầ|ẩ|ẫ|ậ|ă|ắ|ằ|ẳ|ẵ|ặ/g, "a");
    str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e");
    str = str.replace(/i|í|ì|ỉ|ĩ|ị/g, "i");
    str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o");
    str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u");
    str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/Á|À|Ả|Ã|Ạ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ/g, "A");
    str = str.replace(/É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ/g, "E");
    str = str.replace(/I|Í|Ì|Ỉ|Ĩ|Ị/g, "I");
    str = str.replace(/Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ/g, "O");
    str = str.replace(/Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự/g, "U");
    str = str.replace(/Ý|Ỳ|Ỷ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền, sắc, hỏi, ngã, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  useEffect(() => {
    const generateSlug = (name) => {
      let nameWithoutTones = removeVietnameseTones(name);
      return nameWithoutTones
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "");
    }
    setTourData({
      ...tourData,
      slug: generateSlug(tourData.name)
    })
  }, [tourData.name]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTourData({
      ...tourData,
      [name]: value,
    });
  };

  useEffect(() => {
    setTourData({
      ...tourData,
      name: tour.name || "",
      slug: tour.slug || "",
      startTime: tour.startTime || "",
      startLocation: tour.startLocation || "",
      tourDuration: tour.tourDuration || "",
      description: tour.description || "",
      price: tour.price || 0,
      avatar: tour.avatar || "",
      transport: tour.transport || "",
      tourInformation: tour.tourInformation || "",
    });
  }, [tour]);


  useEffect(() => {
    if (tourData.avatar !== "") {
      handleSubmit();
    }
  }, [tourData.avatar]);

  const handleSubmit = async () => {
    // event.preventDefault();
    //console.log("Dữ liệu tour:", tourData);

    try {
      const res = await updateTourById(tour.id, tourData, accessToken);
      // console.log("update tour", res);
      if (res?.status === 200) {
        // successToast("Cập nhật tour thành công");
        setTours((prev) =>
          prev.map((item) => (item.id === tour.id ? res.data : item))
        );
        handleClose();
        resetForm(res.data);
      }
    } catch (error) {
      // errorToast("Cập nhật tour thất bại");
      console.log(error);
    }
  };

  const handleImageUpload = async () => {
    if (image === "") {
      handleSubmit();
      return;
    }

    const dataImg = new FormData();
    dataImg.append("file", image);
    dataImg.append("upload_preset", "cspmjsnn");
    dataImg.append("cloud_name", "dkcetq9et");


    fetch("https://api.cloudinary.com/v1_1/dkcetq9et/image/upload", {
      method: "post",
      body: dataImg,
    })
      .then((response) => response.json())
      .then((dataImg) => {
        setTourData({
          ...tourData,
          avatar: dataImg.url,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const resetForm = (data = {}) => {
    setTourData({
      name: data?.name || "",
      slug: data?.slug || "",
      startTime: data?.startTime || "",
      startLocation: data?.startLocation || "",
      tourDuration: data?.tourDuration || "",
      description: data?.description || "",
      price: data?.price || 0,
      avatar: data?.avatar || "",
      transport: data?.transport || "",
      tourInformation: data?.tourInformation || "",
    });
  };



  return (
    <div>
      <Tooltip title="Sửa" placement="top">
        <IconButton aria-label="edit" onClick={handleOpen} color="primary">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="relative">
              <h2 className="text-center font-bold text-2xl mb-4 border-b-2 pb-2">
                Chỉnh sửa tour du lịch
              </h2>
              <div className="flex absolute right-0 bottom-2">
                <Button variant="success mr-2" onClick={handleImageUpload}>
                  Lưu
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    resetForm(tour);
                    handleClose();
                  }}
                >
                  Hủy
                </Button>
              </div>
            </div>

            <Form >
              <Row className="mb-3">
                <Col>
                  <img src={tourData.avatar} alt="" />
                </Col>
                <Col className="d-flex flex-column">
                  {" "}
                  <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Tên Tour</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={tourData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="startTime" className="mb-3">
                    <Form.Label>Thời Gian Bắt Đầu</Form.Label>
                    <Form.Control
                      type="text"
                      name="startTime"
                      value={tourData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Col>
                    <Form.Group controlId="startLocation">
                      <Form.Label>Nơi Khởi Hành</Form.Label>
                      <Form.Control
                        type="text"
                        name="startLocation"
                        value={tourData.startLocation}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Ảnh</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Enter image URL"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>

              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="tourDuration">
                    <Form.Label>Thời Gian Tour</Form.Label>
                    <Form.Control
                      type="text"
                      name="tourDuration"
                      value={tourData.tourDuration}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="price">
                    <Form.Label>Giá</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={tourData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="transport">
                    <Form.Label>Phương Tiện</Form.Label>
                    <Form.Control
                      type="text"
                      name="transport"
                      value={tourData.transport}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <TourInformation
                tourInformation={tourData.tourInformation}
                setTourData={setTourData}
              />
            </Form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
