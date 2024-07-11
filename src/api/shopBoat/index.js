import instance from "api/axios";
import axios from "axios";

const getShopBoatProducts = async (id, page = 1, limit = 10, formData = {}) => {
  // let url = `/shopBoats/${id}/products?page=${page}&limit=${limit}`;
  let url = `/shopboat/getListShopBoats`;
  if (formData.name) {
    url += `&name=${formData.name}`;
  }
  if (formData.priceMin) {
    url += `&minPrice=${formData.priceMin}`;
  }
  if (formData.priceMax) {
    url += `&maxPrice=${formData.priceMax}`;
  }
  if (formData.category_id) {
    url += `&category_id=${formData.category_id}`;
  }
  if (formData.inStock) {
    url += `&inStock=${formData.inStock}`;
  }
  if (formData.discount) {
    url += `&discount=${formData.discount}`;
  }
  try {
    const response = await instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateProductById = async (id, data, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    const response = await instance.post(`/merchant/updateProductById/${id}`, data, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id, accessToken) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }

  try {
    const response = await instance.post(`/merchant/deleteProductById/${id}`, {}, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createNewProduct = async (data, token) => {

  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const response = await instance.post(`/merchant/createNewProduct`, data, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getShopBoatByIdUser = async (id, token) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    const response = await instance.get(`merchant/getShopBoatByIdUser/${id}`, config);
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateShopBoat = async (data) => {
  try {
    const response = await instance.put("/shopBoats", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAllShopBoats = async (page, formData = {}, token) => {
  let url = `/admin/getListShopBoats/${page}?`
  // console.log("accessToken>>>>>>", token)

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  if (formData.name) {
    url += `&name=${formData.name}`;
  }
  if (formData.code) {
    url += `&code=${formData.code}`;
  }
  if (formData.phoneNumber) {
    url += `&phoneNumber=${formData.phoneNumber}`;
  }
  if (formData.type) {
    url += `&type=${formData.type}`;
  }
  if (formData.status) {
    url += `&status=${formData.status}`;
  }

  try {
    const response = await instance.get(url, config);
    // console.log("response>>>>>>", response);
    return response;
  } catch (error) {
    console.error('Error fetching list of shop boats:', error);
  }
};

const getTotalPages = async (page, formData = {}, token) => {
  let url = `admin/getTotalPageShopBoat/${page}?`
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  if (formData.name) {
    url += `&name=${formData.name}`;
  }
  if (formData.code) {
    url += `&code=${formData.code}`;
  }
  if (formData.phoneNumber) {
    url += `&phoneNumber=${formData.phoneNumber}`;
  }
  if (formData.status) {
    url += `&status=${formData.status}`;
  }
  try {
    const response = await instance.get(url, config);
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const updateShopBoatById = async (id, data, token) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("avatar", data.avatar);
    formData.append("type", data.type);
    const response = await instance.post(`merchant/updateShopBoatById/${id}`, formData, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateShopBoatStatus = async (id, data, token) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    console.log("accessToken:>>> ", config);
    const response = await instance.post(`/admin/updateStatusById/${id}`, data, config);
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getListCategoriesOfShop = async (id) => {
  try {
    const response = await instance.get(`/shopBoats/${id}/categories`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAllShopBoatsWithoutPagination = async () => {
  return instance.get('/shopboat/getListShopBoats');
}

const getAllListOrderItem = async (idShop, page, token) => {
  let url = `merchant/getAllListOrderItem/${page}?`;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    console.log("url>>>>", url);
    if (idShop) {
      url += `shopBoatId=${idShop}`
    }
    console.log("url>>>>1", url);
    const response = await instance.get(url, config)
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getTotalPageOrderItem = async (idShop, page, token) => {
  let url = `merchant/getTotalPageOrderItem/${page}?`;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    if (idShop) {
      url += `shopBoatId=${idShop}`
    }
    const response = await instance.get(url, config)
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getOrderItemByOrderProductId = (idShop, orderProductId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const response = instance.get(`/merchant/getOrderItemByOrderProductId/${idShop}/${orderProductId}`, config);
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getAllListOrderProduct = async (idShop, page, token) => {
  let url = `merchant/getAllListOrderProduct/${idShop}/${page}`;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config)
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getTotalPageOrderProduct = async (idShop, page, token) => {
  let url = `merchant/getTotalPageOrderProduct/${idShop}/${page}`;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config)
    return response;
  }

  catch (error) {
    console.log(error);
  }
}

const getTotalOrderItemByShopBoatId = async (idShop, token) => {
  let url = `merchant/getTotalOrderItemByShopBoatId/${idShop}`;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config)
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getTotalOrderItemByShopBoatIdInTimeSlot = async (idShop, token) => {
  let url = `merchant/getTotalOrderItemByShopBoatIdInTimeSlot/${idShop}`;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config)
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getTotalOrderItemByShopBoatIdInWeek = async (idShop, token) => {
  let url = `merchant/getTotalOrderItemByShopBoatIdInWeek/${idShop}`;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config)
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getTotalOrderItemByShopBoatIdInDayOfWeek = async (idShop, token) => {
  let url = `merchant/getTotalOrderItemByShopBoatIdInDayOfWeek/${idShop}`;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config)
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getTotalOrderItemByShopBoatIdInMonth = async (idShop, token) => {
  let url = `merchant/getTotalOrderItemByShopBoatIdInMonth/${idShop}`;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config)
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getTotalOrderItemByShopBoatIdInWeekOfMonth = async (idShop, token) => {
  let url = `merchant/getTotalOrderItemByShopBoatIdInWeekOfMonth/${idShop}`;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config)
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getTotalOrderItemByShopBoatIdInYear = async (idShop, token) => {
  let url = `merchant/getTotalOrderItemByShopBoatIdInYear/${idShop}`;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config)
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getTotalOrderItemByShopBoatIdInMonthOfYear = async (idShop, token) => {
  let url = `merchant/getTotalOrderItemByShopBoatIdInMonthOfYear/${idShop}`;

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await instance.get(url, config)
    return response;
  }
  catch (error) {
    console.log(error);
  }
}



export {
  getShopBoatProducts,
  updateProductById,
  deleteProduct,
  getShopBoatByIdUser,
  createNewProduct,
  updateShopBoat,
  getAllShopBoats,
  getTotalPages,
  updateShopBoatById,
  getListCategoriesOfShop,
  getAllShopBoatsWithoutPagination,
  updateShopBoatStatus,
  getAllListOrderItem,
  getTotalPageOrderItem,
  getOrderItemByOrderProductId,
  getAllListOrderProduct,
  getTotalPageOrderProduct,
  getTotalOrderItemByShopBoatId,
  getTotalOrderItemByShopBoatIdInTimeSlot,
  getTotalOrderItemByShopBoatIdInWeek,
  getTotalOrderItemByShopBoatIdInDayOfWeek,
  getTotalOrderItemByShopBoatIdInMonth,
  getTotalOrderItemByShopBoatIdInWeekOfMonth,
  getTotalOrderItemByShopBoatIdInYear,
  getTotalOrderItemByShopBoatIdInMonthOfYear,
};
