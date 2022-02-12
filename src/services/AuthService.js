import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8443/"
const headers = {
  'Content-type': 'application/json',
  'Authorization': 'Bearer '+localStorage.getItem('token')
 }

const login = async data => {
  return await axios.post("authentication_token", data);
};

const register = async data => {
  return await axios.post("users", data);
};

const getUser = async (id) => {
  return await axios.get(`users/${id}`, {headers});
};

const parentCategories = async () => {
  return await axios.get("categories", {headers});
};

const postCategory = async (data) => {
  return await axios.post("categories", data, {headers});
};

const getProducts = async () => {
  return await axios.get("products", {headers});
};

const getProductsNotValid = async () => {
  return await axios.get("products/products-not-valid", {headers});
};

const updateProduct = async (id,data) => {
  return await axios.patch(`products/${id}`,data, {headers});
};


const deleteProduct = async (id) => {
  return await axios.delete(`products/${id}`, {headers});
};

export default {
  register,
  login,
  getUser,
  parentCategories,
  postCategory,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsNotValid
};
