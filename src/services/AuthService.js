import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8443/"

const headers = {
  'Content-type': 'application/json',
  'Authorization': 'Bearer '+localStorage.getItem('token')
 }



const login = async (data) => {
  return await axios.post("https://localhost:8443/authentication_token", data);
};

const register = async (data) => {
  return await axios.post("https://localhost:8443/users", data);
};

const resetPassword = async () => {
  return await axios.post("https://localhost:8443/reset-password");
};

const getUser = async (id) => {
  return await axios.get(`https://localhost:8443/users/${id}`, {headers});
};

const updateUser = async (id, data) => {
  return await axios.patch(`https://localhost:8443/users/${id}`,data, {headers});
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

const getSessionIdPayment = async (productId,tenantId,price) => {
  return await axios.post(`https://localhost:8443/create-checkout-session/${productId}/${tenantId}`,{...price},{headers});
};

const refund = async (reservation) => {
  return await axios.get(`https://localhost:8443/refund/${reservation.id}`,{headers});
};


const deleteProduct = async (id) => {
  return await axios.delete(`https://localhost:8443/products/${id}`, {headers});
};

const postProduct = async (data) => {
  return await axios.post("https://localhost:8443/products", data, {headers});
};

const postImage = async (data) => {
  const headers = {
    'Content-type': 'multipart/form-data',
    'Authorization': 'Bearer '+localStorage.getItem('token')
  }
  return await axios.post("https://localhost:8443/media_objects", data, {headers});
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
  updateUser,
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
