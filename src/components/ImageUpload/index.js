import styled from "styled-components";
import { FiCamera } from "react-icons/fi";
import { useState } from "react";
import ReactFileReader from "react-file-reader";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { updateImgqrById } from "api/user";
import { successToast } from "utilities/toast";

import { getImgqrByIdAd } from "api/user";

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width: 320px;
    height: 320px;
    object-fit: cover;

  }
  .circle {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    right: 23em !important;
    position: absolute;
    width: 48px;
    height: 48px;
    background: #312e38;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #f4ede8;
    }
    &:hover {
      background: blue;
    }
  }
`;

export default function ImageUpload() {
  const [url, setUrl] = useState("https://res.cloudinary.com/dkcetq9et/image/upload/v1717871167/image_icon-512_cxntey.png");
  const [image, setImage] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const handleFiles = (files) => {
    const dataImg = new FormData();
    dataImg.append("file", files.base64);
    dataImg.append("upload_preset", "cspmjsnn");
    dataImg.append("cloud_name", "dkcetq9et");

    fetch("https://api.cloudinary.com/v1_1/dkcetq9et/image/upload", {
      method: "post",
      body: dataImg,
    })
      .then((response) => response.json())
      .then((data) => {
        setUrl(data.url);
        setImage(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
    setUrl(files.base64);
  };

  const fetchImgQR = async () => {
    try {
      const response = await getImgqrByIdAd(accessToken);
      if (response.status === 200) {
        setUrl(response.data);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const updateImage = async () => {
    try {
      const response = await updateImgqrById(image, accessToken);
      // console.log(response);
      if (response.status === 200) {
        successToast("Cập nhật ảnh thành công");
      }

    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (image) {
      updateImage();
    }
  }, [image]);

  useEffect(() => {
    fetchImgQR();
  }, []);



  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",
        height: '380px',
      }}
    >
      <>
        <AvatarInput>
          <img src={url} alt="Avatar Placeholder" />
        </AvatarInput>

        <ReactFileReader
          fileTypes={[".png", ".jpg", ".jpeg"]}
          base64={true}
          handleFiles={handleFiles}
        >
          <FiCamera style={{ width: 30, height: 30 }} as={Button} />
        </ReactFileReader>
        {/* <Button variant="contained" color="primary">
          Upload
        </Button> */}
      </>
    </ div>
  );
}