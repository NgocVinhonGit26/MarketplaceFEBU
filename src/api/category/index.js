import instance from "api/axios";

const getListCategories = async () => {
  try {
    const response = await instance.get(`/categories/list`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getCategoryById = async (id) => {
  try {
    const response = await instance.get(`/categories/id/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getCategoryBySlug = async (slug) => {
  try {
    const response = await instance.get(`/categories/${slug}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getListCategories, getCategoryById, getCategoryBySlug };
