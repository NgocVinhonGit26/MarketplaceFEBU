import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { updateShopBoat } from "api/shopBoat";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { updateShopBoatById } from "api/shopBoat";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ shopBoat, setShopBoat }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = React.useState(shopBoat?.id || 0);
  const [name, setName] = React.useState(shopBoat?.name || "");
  const [description, setDescription] = React.useState(shopBoat?.description || "");
  const [avatar, setAvatar] = React.useState(shopBoat?.avatar || "");
  const [type, setType] = React.useState(shopBoat?.type || "");

  const [image, setImage] = React.useState("");
  const accessToken = localStorage.getItem("accessToken");
  // Thêm useEffect ở đây
  React.useEffect(() => {
    if (avatar !== "") {
      handleSubmit();
    }
  }, [avatar]);



  const handleSubmit = async () => {
    const data = {
      name,
      description,
      avatar,
      type,
    };

    try {
      const response = await updateShopBoatById(id, data, accessToken);
      // console.log("check >>>>", response.data);
      setShopBoat(response.data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = () => {
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
        setAvatar(dataImg.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    setName(shopBoat?.name || "");
    setDescription(shopBoat?.description || "");
    setType(shopBoat?.type || "");
    setAvatar(shopBoat?.avatar || "");
    console.log("shopBoat effec", shopBoat);
  }, [shopBoat]);

  return (
    <div>
      <Tooltip title="Chỉnh sửa">
        <IconButton onClick={handleOpen} color="primary">
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
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Tên cửa hàng</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Loại thuyền</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Ảnh</Form.Label>
                  <Form.Control
                    type="file"
                    name="avatar"
                    // value={avatar}
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleImageUpload}
                  className="mt-3"
                >
                  Cập nhật
                </Button>
              </Col>
            </Row>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
