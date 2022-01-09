import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8443/"
const headers = {
  "Content-type": "application/json"
 }

const login = async data => {
  return await axios.post("authentication_token", data , {headers});
};

const register = async data => {
  return await axios.post("users", data , {headers});
};

const getUser = async (id) => {
  return await axios.get(`users/${id}`, headers);
};

const parentCotegories = async () => {
  return await axios.get("categories", headers);
};

const postCategory = async () => {
  return await axios.get("categories", headers);
};

export default {
  register,
  login,
  getUser,
  parentCotegories,
  postCategory
};
