import { toast } from "react-toastify";

const successToast = (message, duration = 3000) => {
  toast.success(message, {
    position: "top-center",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const errorToast = (message, duration = 3000) => {
  toast.error(message, {
    position: "top-center",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const infoToast = (message, duration = 3000) => {
  toast.info(message, {
    position: "top-center",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const warningToast = (message, duration = 3000) => {
  toast.warning(message, {
    position: "top-center",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export { successToast, errorToast, infoToast, warningToast };
