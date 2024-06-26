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
import { createNewProduct } from "api/shopBoat";
import * as React from "react";

const animatedComponents = makeAnimated();
AddModal.propTypes = {
  updateData: PropTypes.func.isRequired,
};

const defaultImage =
  "https://res.cloudinary.com/dkcetq9et/image/upload/v1715826332/avatar-768x768_gpx1pc.jpg";

function AddModal({ updateData, addProduct }) {
  const [open, setOpen] = useState(false);
  const handleShow = () => {
    resetForm();
    setOpen(true);
  };
  const handleClose = async () => {
    setOpen(false);
  };

  const shopBoatId = localStorage.getItem("shopBoatId");
  const accessToken = localStorage.getItem("accessToken");

  const [listCategory, setListCategory] = useState([
    { value: 'hoaqua', label: 'Hoa Quả' },
    { value: 'banhkeo', label: 'Bánh Kẹo' },
    { value: 'NSchebien', label: 'Nông Sản Chế Biến' }
  ]);
  const [selectedCategories, setSelectedCategory] = useState('');
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(0);
  const [unit, setUnit] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [videoInfor, setVideoInfor] = useState('');
  const [image, setImage] = useState(defaultImage);

  const [img, setImg] = useState('');

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
      const nameWithoutTones = removeVietnameseTones(name);
      return nameWithoutTones
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Replace spaces and non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, '')     // Remove leading and trailing hyphens

    };

    setSlug(generateSlug(name));
  }, [name]);

  const resetForm = () => {
    setName("");
    setSlug("");
    setPrice(0);
    setSale(0);
    setUnit("");
    setCountInStock(0);
    setDescription("");
    setSelectedCategory([]);
    setVideoInfor('');
    setImage(defaultImage);
  };

  const handleSave = async () => {
    let data = {
      name: name,
      slug: slug,
      description: description,
      price: Number(price),
      sale: Number(sale),
      countInStock: Number(countInStock),
      image: image,
      unit: unit,
      category: selectedCategories,
      shopBoatId: Number(shopBoatId),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      videoInfor: videoInfor
    }

    // console.log("data >>>>", data);

    try {
      const response = await createNewProduct(data, accessToken);
      // console.log("check >>>>", response);
      if (response?.status === 200) {
        addProduct(response.data);
        resetForm();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageUpload = async (event) => {
    if (img === '') {
      handleSave();
      return
    }

    const dataImg = new FormData();
    dataImg.append("file", img);
    dataImg.append("upload_preset", "cspmjsnn");
    dataImg.append("cloud_name", "dkcetq9et");

    fetch("https://api.cloudinary.com/v1_1/dkcetq9et/image/upload", {
      method: "post",
      body: dataImg,
    })
      .then((response) => response.json())
      .then((dataImg) => {
        setImage(dataImg.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (name === '') return
    handleSave();
  }, [image]);

  return (
    <>
      <Button variant="success" className="ms-2" onClick={handleShow}>
        Thêm sản phẩm
      </Button>
      <Modal
        open={open}
        // onClose={async () => {
        //   if (image !== defaultImage) {
        //     await deleteImage(image);
        //   }
        //   handleClose();
        // }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="relative">
            <h2 className="text-center font-bold text-2xl mb-4 border-b-2 pb-2">
              Thêm sản phẩm mới
            </h2>
            <div className="flex absolute right-0 bottom-2">
              <Button variant="success mr-2" onClick={handleImageUpload}>
                Lưu
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
          <Form>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-1">
                <img src={image} alt="product" className="max-w-[320px]" />
              </div>
              <div className="flex col-span-1 flex-col">
                <Form.Group className="mb-3 w-full" controlId="name">
                  <Form.Label className="font-medium">Tên sản phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <div className="flex gap-4">
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Đơn giá</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Nhập giá"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="discount">
                    <Form.Label>Giảm giá</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Nhập phần trăm giảm giá"
                      value={sale}
                      onChange={(e) => setSale(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="flex gap-4">
                  <Form.Group className="mb-3" controlId="stock">
                    <Form.Label>Hàng trong kho</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Nhập số lượng trong kho"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="unit">
                    <Form.Label>Đơn vị</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập đơn vị"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Cập nhật ảnh</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Enter image URL"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Nhãn sản phẩm</Form.Label>
              <Select
                // isMulti
                options={listCategory}
                value={selectedCategories}
                // closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={(value) => setSelectedCategory(value.label)}
              />
            </Form.Group>
            <Form.Group className="mb-3 w-full" controlId="name">
              {/* <div className="flex justify-between"> */}
              <Form.Label className="font-medium mb-[1px]">
                Thông tin bổ sung
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập url video"
                value={videoInfor}
                onChange={(e) => setVideoInfor(e.target.value)}
              />
              {/* </div> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Mô tả sản phẩm</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  //console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  //console.log({ event, editor, data });
                  setDescription(data);
                }}
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

export default AddModal;
