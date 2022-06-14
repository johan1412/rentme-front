import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_URL


const headers = {
  'Content-type': 'application/json',
  'Authorization': 'Bearer '+localStorage.getItem('token')
 }
 
const url = process.env.VUE_APP_URL



const login = async (data) => {
  return await axios.post(url+"/authentication_token", data);
};

const register = async (data) => {
  return await axios.post(url+"/users", data);
};

const resetPassword = async () => {
  return await axios.post(url+"/reset-password");
};

const getUser = async (id) => {
  return await axios.get(url+`/users/${id}`, {headers});
};

const updateUser = async (id, data) => {
  return await axios.patch(url+`/users/${id}`,data, {headers});
};

const parentCategories = async () => {
  return await axios.get(url+"/categories");
};

const postCategory = async (data) => {
  return await axios.post(url+"/categories", data, {headers});
};

const getProducts = async () => {
  return await axios.get(url+"/products");
};

const getProductsValid = async () => {
  return await axios.get(url+"/products/products-valid");
};

const getProduct = async (id) => {
  return await axios.get(url+`/products/${id}`);
};
const getCategories = async () => {
  return await axios.get(url+"/categories");
};

const getProductsNotValid = async () => {
  return await axios.get(url+"/products/products-not-valid", {headers});
};

const updateProduct = async (id,data) => {
  return await axios.patch(url+`/products/${id}`,data, {headers});
};

const getSessionIdPayment = async (productId,tenantId,price) => {
  return await axios.post(url+`/create-checkout-session/${productId}/${tenantId}`,{...price},{headers});
};

const refund = async (reservation) => {
  return await axios.get(url+`/refund/${reservation.id}`,{headers});
};


const deleteProduct = async (id) => {
  return await axios.delete(url+`/products/${id}`, {headers});
};

const postProduct = async (data) => {
  return await axios.post(url+"/products", data, {headers});
};

const postImage = async (data) => {
  const headers = {
    'Content-type': 'multipart/form-data',
    'Authorization': 'Bearer '+localStorage.getItem('token')
  }
  return await axios.post(url+"/media_objects", data, {headers});
};


const getReservations = async () => {
  return await axios.get(url+"/reservations/user", {headers});
};

const updateReservation = async (data) => {
  return await axios.patch(url+`/reservations/${data.id}`,data, {headers});
};

const postReservation = async (data) => {
  return await axios.post(url+"/reservations", data, {headers});
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
