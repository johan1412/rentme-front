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

const resetPassword = async () => {
  return await axios.post("https://localhost:8443/reset-password");
};

const getUser = async (id) => {
  return await axios.get(`https://localhost:8443/users/${id}`, {headers});
};

const parentCategories = async () => {
  return await axios.get("https://localhost:8443/categories");
};

const postCategory = async (data) => {
  return await axios.post("https://localhost:8443/categories", data, {headers});
};

const getProducts = async () => {
  return await axios.get("https://localhost:8443/products");
};

const getProductsValid = async () => {
  return await axios.get("https://localhost:8443/products/products-valid");
};

const getProduct = async (id) => {
  return await axios.get(`https://localhost:8443/products/${id}`);
};
const getCategories = async () => {
  return await axios.get("https://localhost:8443/categories");
};

const getProductsNotValid = async () => {
  return await axios.get("https://localhost:8443/products/products-not-valid", {headers});
};

const updateProduct = async (id,data) => {
  return await axios.patch(`https://localhost:8443/products/${id}`,data, {headers});
};

const getSessionIdPayment = async (product,tenant) => {
  return await axios.post(`https://localhost:8444/create-checkout-session`,{product:product,tenant:tenant});
};

const refund = async (data) => {
  return await axios.post(`https://localhost:8444/refund`,data);
};


const deleteProduct = async (id) => {
  return await axios.delete(`https://localhost:8443/products/${id}`, {headers});
};

const postProduct = async (data) => {
  return await axios.post("https://localhost:8443/products", data, {headers});
};

const postImage = async (data) => {
  return await axios.post("https://localhost:8443/media_objects", data, {...headers,
    'Content-type': 'multipart/form-data'
   });
};


const getReservations = async () => {
  return await axios.get("https://localhost:8443/reservations/user", {headers});
};

const updateReservation = async (data) => {
  return await axios.patch(`https://localhost:8443/reservations/${data.id}`,data, {headers});
};

const postReservation = async (data) => {
  return await axios.post("https://localhost:8443/reservations", data, {headers});
};

export default {
  register,
  login,
  resetPassword,
  getUser,
  parentCategories,
  postCategory,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsNotValid,
  postProduct,
  getReservations,
  updateReservation,
  getCategories,
  getProduct,
  getSessionIdPayment,
  postImage,
  postReservation,
  refund,
  getProductsValid
};
