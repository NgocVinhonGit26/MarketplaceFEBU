import instance from "api/axios";
import { ROLES } from "../../enum/index";


const signinService = async (username, password) => {
  const response = await instance.post("/signin", { username, password });
  // console.log("response", response.data.token);
  return response;
};


const signupService = async (
  name,
  address,
  username,
  password,
  isSeller
) => {

  let formData = new FormData();
  formData.append("name", name);
  formData.append("address", address);
  formData.append("username", username);
  formData.append("password", password);
  if (isSeller) {
    formData.append("role", "MERCHANT");
  } else {
    formData.append("role", "USER");
  }
  try {
    const response = await instance.post(`/signup`, formData);
    // console.log("check >>>>", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const signoutService = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await instance.get("/signout", config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const checkEmail = async (email) => {
  try {
    const response = await instance.get(`/signup/checkEmail/${email}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { signinService, signupService, signoutService, checkEmail };
