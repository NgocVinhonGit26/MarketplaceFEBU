class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.url = "https://api.cloudinary.com/v1_1/dkcetq9et/image/upload";
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "cspmjsnn"); // Thay thế bằng upload preset của bạn
          formData.append("cloud_name", "dkcetq9et");

          fetch(this.url, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.error) {
                return reject(result.error.message);
              }
              resolve({
                default: result.secure_url,
              });
            })
            .catch((error) => {
              reject(error);
            });
        })
    );
  }

  abort() {
    // Handle the abort
  }
}


