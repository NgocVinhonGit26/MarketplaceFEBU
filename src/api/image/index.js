import instance from "api/axios";

const uploadImage = async (data) => {
  try {
    const response = await instance.post("/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteImage = async (imageUrl) => {
  try {
    const response = await instance.delete("/upload", {
      data: {
        imageUrl,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { uploadImage, deleteImage };
