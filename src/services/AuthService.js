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
  return await axios.get("categories");
};

const postCategory = async (data) => {
  return await axios.post("categories", data, {headers});
};

const getProducts = async () => {
  return await axios.get("products");
};
const getProduct = async (id) => {
  return await axios.get(`products/${id}`);
};
const getCategories = async () => {
  return await axios.get("categories");
};

const getProductsNotValid = async () => {
  return await axios.get("products/products-not-valid", {headers});
};

const updateProduct = async (id,data) => {
  return await axios.patch(`products/${id}`,data, {headers});
};

const getSessionIdPayment = async (product,tenant) => {
  return await axios.post(`https://localhost:8444/create-checkout-session`,{product:product,tenant:tenant});
};


const deleteProduct = async (id) => {
  return await axios.delete(`products/${id}`, {headers});
};

const postProduct = async (data) => {
  return await axios.post("products", data, {headers});
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
  getCategories,
  getProduct,
  getSessionIdPayment
};
