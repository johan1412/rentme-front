import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_URL

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

const getUser = async (id,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.get(url+`/users/${id}`, {headers});
};

const updateUser = async (id, data,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.patch(url+`/users/${id}`,data, {headers});
};

const updateAddress = async (id, data,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.patch(url+`/addresses/${id}`,data, {headers});
};

const parentCategories = async () => {
  return await axios.get(url+"/categories");
};

const postCategory = async (data,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.post(url+"/categories", data, {headers});
};

const getProducts = async () => {
  return await axios.get(url+"/products");
};

const getProductsSearch = async (data) => {
  return await axios.get(url+"/productsSearch", {params: data});
}

const getProductsByKeyWord = async (data) => {
  return await axios.get(url+"/products/search", {params: data});
}

const getProductsValid = async () => {
  return await axios.get(url+"/products/products-valid");
};

const getProduct = async (id) => {
  return await axios.get(url+`/products/${id}`);
};

const getProductsBySubCategory = async (id) => {
  return await axios.get(url+`/products/sub-category/${id}`);
};

const getCategories = async () => {
  return await axios.get(url+"/categories");
};

const getCategory = async (id) => {
  return await axios.get(url+`/categories/${id}`);
};

const editCategory = async (id,data,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.patch(url+`/categories/${id}`,data, {headers});
};

const deleteCategory = async (id,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.delete(url+`/categories/${id}`, {headers});
};

const getProductsNotValid = async (token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.get(url+"/products/products-not-valid", {headers});
};

const updateProduct = async (id,data,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.patch(url+`/products/${id}`,data, {headers});
};

const getSessionIdPayment = async (productId,tenantId,price,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.post(url+`/create-checkout-session/${productId}/${tenantId}`,{...price},{headers});
};

const refund = async (reservation,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.get(url+`/refund/${reservation.id}`,{headers});
};

const transferPayment = async (reservation,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.get(url+`/transfer/${reservation.id}`,{headers});
};

const renterCheckStripeAccount = async (token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.get(url+`/renter-check-stripe-account`,{headers});
};


const deleteProduct = async (id,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.delete(url+`/products/${id}`, {headers});
};

const postProduct = async (data,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.post(url+"/products", data, {headers});
};

const postImage = async (data,token) => {
  const headers = {
    'Content-type': 'multipart/form-data',
    'Authorization': 'Bearer '+token
  }
  return await axios.post(url+"/media_objects", data, {headers});
};


const getReservations = async (token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.get(url+"/reservations/user", {headers});
};

const getReservationsRenter = async (token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.get(url+"/reservations-renter", {headers});
};

const updateReservation = async (data,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.patch(url+`/reservations/${data.id}`,data, {headers});
};

const postReservation = async (data,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.post(url+"/reservations", data, {headers});
};

const getReportings = async (token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.get(url+"/reportings", {headers});
};

const deleteReporting = async (id,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.delete(url+`/reportings/${id}`, {headers});
};
const createExternalStripeAccount = async (code,renterId,token) => {
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.post(url+`/create-stripe-external-account`,{code:code,renterId:renterId},{headers});
};


export default {
  register,
  login,
  resetPassword,
  getUser,
  updateUser,
  updateAddress,
  parentCategories,
  postCategory,
  getProducts,
  getProductsBySubCategory,
  getProductsSearch,
  updateProduct,
  deleteProduct,
  getProductsNotValid,
  postProduct,
  getReservations,
  getReservationsRenter,
  updateReservation,
  getCategories,
  getCategory,
  editCategory,
  deleteCategory,
  getProduct,
  getSessionIdPayment,
  postImage,
  postReservation,
  refund,
  transferPayment,
  getProductsValid,
  getReportings,
  deleteReporting,
  getProductsByKeyWord,
  createExternalStripeAccount,
  renterCheckStripeAccount
};
