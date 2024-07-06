import instance from "api/axios";

const getTop4Products = () => {
  try {
    const response = instance.get(`/products/top4`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAllProductOrderByCategory = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = instance.get(`/product/getAllProductOrderByCategory`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getProductBySlug = (slug) => {
  try {
    const response = instance.get(`/product/getProductBySlug/${slug}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const searchProduct = (page, query = {}, idShop, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url = `/merchant/searchProduct/${page}/${idShop}?`;
  if (query.name) {
    url += "&name=" + query.name;
  }
  if (query.priceFrom) {
    url += "&priceFrom=" + query.priceFrom;
  }
  if (query.priceTo) {
    url += "&priceTo=" + query.priceTo;
  }
  if (query.countInStock) {
    url += "&countInStock=" + query.countInStock;
  }
  if (query.category) {
    url += "&category=" + query.category;
  }
  if (query.sale) {
    url += "&sale=" + query.sale;
  }


  try {
    const response = instance.get(url, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const searchProductForUser = (page, query = {}) => {
  let url = `/product/searchProductByName/${page}?`;
  if (query.name) {
    url += "&name=" + query.name;
  }


  try {
    const response = instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
}

const getTotalPageProductForUser = (page, query = {}) => {
  let url = `/product/getTotalPageSearchProductByName/${page}?`;
  if (query.name) {
    url += "&name=" + query.name;
  }
  try {
    const response = instance.get(url);
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

const getTotalPageProduct = (page, query = {}, idShop, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url = `/merchant/getTotalPage/${page}/${idShop}?`;
  if (query.name) {
    url += "&name=" + query.name;
  }
  if (query.priceFrom) {
    url += "&priceFrom=" + query.priceFrom;
  }
  if (query.priceTo) {
    url += "&priceTo=" + query.priceTo;
  }
  if (query.countInStock) {
    url += "&countInStock=" + query.countInStock;
  }
  if (query.category) {
    url += "&category=" + query.category;
  }
  if (query.sale) {
    url += "&sale=" + query.sale;
  }


  try {
    const response = instance.get(url, config);
    return response
  } catch (error) {
    console.log(error);
  }
};

const getProductByCategory = (page, limit, categorySlug) => {
  try {
    let url =
      "/customer/products/category/" +
      categorySlug +
      "?page=" +
      page +
      "&limit=" +
      limit;
    const response = instance.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAllProductAdmin = (page, query = {}, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url = `/admin/getAllProductAdmin/${page}?`;
  if (query.name) {
    url += "&name=" + query.name;
  }
  if (query.priceFrom) {
    url += "&priceFrom=" + query.priceFrom;
  }
  if (query.priceTo) {
    url += "&priceTo=" + query.priceTo;
  }
  if (query.countInStock) {
    url += "&countInStock=" + query.countInStock;
  }
  if (query.category) {
    url += "&category=" + query.category;
  }
  if (query.sale) {
    url += "&sale=" + query.sale;
  }

  try {
    const response = instance.get(url, config);
    return response;
  } catch (error) {
    console.log(error);
  }

}

const getTotalPageProductAdmin = (page, query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url = `/admin/getTotalPageProductAdmin/${page}?`;
  if (query.name) {
    url += "&name=" + query.name;
  }
  if (query.priceFrom) {
    url += "&priceFrom=" + query.priceFrom;
  }
  if (query.priceTo) {
    url += "&priceTo=" + query.priceTo;
  }
  if (query.countInStock) {
    url += "&countInStock=" + query.countInStock;
  }
  if (query.category) {
    url += "&category=" + query.category;
  }
  if (query.sale) {
    url += "&sale=" + query.sale;
  }

  try {
    const response = instance.get(url, config);
    return response;
  } catch (error) {
    console.log(error);
  }

}


const updateQuantityProductById = (id, orderQuantity, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = instance.post(`/merchant/updateQuantityProductById/${id}/${orderQuantity}`, {}, config);
    return response;
  } catch (error) {
    console.log(error);
  }
}




export {
  getTop4Products,
  getAllProductOrderByCategory,
  getProductBySlug,
  searchProduct,
  searchProductForUser,
  getTotalPageProductForUser,
  getTotalPageProduct,
  getProductByCategory,
  getAllProductAdmin,
  getTotalPageProductAdmin,
  updateQuantityProductById
};
