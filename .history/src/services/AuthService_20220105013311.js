import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8443/"
axios.defaults.common["Content-type"] = "application/json"
axios.defaults.common["Content-type"] = "application/json"

const login = async data => {
  return await axios.post(baseURL+"authentication_token", data , {headers});
};

const register = async data => {
  return await axios.post(baseURL+"users", data , {headers});
};

export default {
  register,
  login,
};
