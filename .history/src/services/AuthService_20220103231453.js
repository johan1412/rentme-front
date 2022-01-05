import axios from "axios";


const baseURL =  "https://localhost:8443/"
const headers = {
  "Content-type": "application/json"
 }

const login = async data => {
  return await axios.post(baseURL+"authentication_token", data , {headers});
};

const register = async data => {
  return await axios.post(baseURL+"register", data , {headers});
};

export default {
  register,
  login,
};
