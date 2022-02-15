import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8443/"
const headers = {
  'Content-type': 'application/json',
  'Authorization': 'Bearer '+localStorage.getItem('token')
 }

const login = async data => {
  return await axios.post("https://localhost:8443/authentication_token", data);
};

const register = async data => {
  return await axios.post("https://localhost:8443/users", data);
};

const getUser = async (id) => {
  return await axios.get(`https://localhost:8443/users/${id}`, {});
};

const parentCategories = async () => {
  return await axios.get("https://localhost:8443/categories", {headers});
};

const postCategory = async (data) => {
  return await axios.post("https://localhost:8443/categories", data, {headers});
};

const getProducts = async () => {
  return await axios.get("https://localhost:8443/products", {headers});
};

const getProductsNotValid = async () => {
  return await axios.get("https://localhost:8443/products/products-not-valid", {headers});
};

const updateProduct = async (id,data) => {
  return await axios.patch(`https://localhost:8443/products/${id}`,data, {headers});
};


const deleteProduct = async (id) => {
  return await axios.delete(`https://localhost:8443/products/${id}`, {headers});
};

const postProduct = async (data) => {
  return await axios.post("https://localhost:8443/products", data, {headers});
};

const postImage = async (data) => {
  return await axios.post("https://localhost:8443/media_objects", data, {
    'Content-type': 'multipart/form-data',
    'Authorization': 'Bearer '+localStorage.getItem('token')
   });
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
  getProductsNotValid,
  postProduct,
  postImage
};
