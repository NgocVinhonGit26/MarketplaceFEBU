

import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Form from "react-bootstrap/Form";
import { getListCategories } from "api/category";
import Select from "react-select";
import PropTypes from "prop-types";
import makeAnimated from "react-select/animated";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { uploadImage, deleteImage } from "api/image";
import { updateProductById } from "api/shopBoat";
import { errorToast } from "utilities/toast";

const animatedComponents = makeAnimated();
EditModal.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    sale: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    countInStock: PropTypes.number.isRequired,
  }).isRequired,
  updateData: PropTypes.func.isRequired,
};


function EditModal({ product, updateData }) {
  const [open, setOpen] = useState(false);
  const handleShow = () => {
    resetForm(product);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const accessToken = localStorage.getItem("accessToken");

  const [listCategory, setListCategory] = useState([
    { value: 'hoaqua', label: 'Hoa Quả' },
    { value: 'banhkeo', label: 'Bánh Kẹo' },
    { value: 'NSchebien', label: 'Nông Sản Chế Biến' }
  ]);

  const [selectedCategories, setSelectedCategory] = useState(product.category);
  const [name, setName] = useState(product.name);
  const [slug, setSlug] = useState(product.slug);
  const [price, setPrice] = useState(product.price);
  const [sale, setSale] = useState(product.sale);
  const [unit, setUnit] = useState(product.unit);
  const [countInStock, setCountInStock] = useState(product.countInStock);
  const [description, setDescription] = useState(product.description);
  const [videoInfor, setVideoInfor] = useState(product.videoInfor);
  const [image, setImage] = useState(product.image);

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
      let nameWithoutTones = removeVietnameseTones(name);
      return nameWithoutTones
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "");
    };

    setSlug(generateSlug(name));
  }, [name]);

  const resetForm = (updatedProduct) => {
    setName(updatedProduct.name);

    setPrice(updatedProduct.price);
    setSale(updatedProduct.sale);
    setUnit(updatedProduct.unit);
    setCountInStock(updatedProduct.countInStock);
    setDescription(updatedProduct.description);
    setVideoInfor(updatedProduct.videoInfor);
    setImage(updatedProduct.image);
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
      updated_at: new Date().toISOString(),
      videoInfor: videoInfor,
    }

    if (data.name === "") {
      errorToast("Tên sản phẩm không được để trống");
      return
    }
    if (data.price === 0) {
      errorToast("Đơn giá không được để trống");
      return
    }
    if (data.countInStock === 0) {
      errorToast("Số lượng trong kho không được để trống");
      return
    }
    if (data.unit === "") {
      errorToast("Đơn vị không được để trống");
      return
    }
    if (data.category === "") {
      errorToast("Nhãn sản phẩm không được để trống");
      return
    }

    if (data.description === "") {
      errorToast("Mô tả sản phẩm không được để trống");
      return
    }
    if (data.videoInfor === "") {
      errorToast("Thông tin bổ sung không được để trống");
      return
    }
    try {
      const response = await updateProductById(product.id, data, accessToken);
      // console.log("response updateProductById: ", response);
      if (response.status === 200) {

        updateData(response.data);
        resetForm(response.data);
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
      <Button variant="info text-white" onClick={handleShow}>
        Sửa
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="relative">
            <h2 className="text-center font-bold text-2xl mb-4 border-b-2 pb-2">
              Chỉnh sửa sản phẩm
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
                <img src={image} alt={product.name} className="max-w-[320px]" />
              </div>
              <div className="flex col-span-1 flex-col">
                <Form.Group className="mb-3 w-full" controlId="name">
                  <Form.Label className="font-medium">Tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <div className="flex gap-4">
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Đơn giá</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="discount">
                    <Form.Label>Giảm giá</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter discount percentage"
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
                      placeholder="Enter stock quantity"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="unit">
                    <Form.Label>Đơn vị</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter unit"
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
                    onChange={(e) => { setImg(e.target.files[0]) }}
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

export default EditModal;
