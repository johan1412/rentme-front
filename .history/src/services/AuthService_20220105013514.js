import axios from 'axios';

axios.defaults.baseURL =  'https://localhost:8443/'
axios.defaults.common["Content-type"] = 'application/json'
axios.defaults.common["Autorisation"] = 'Bearer '+localStorage.getItem('token')

const login = async data => {
  return await axios.post('authentication_token', data);
};

const register = async data => {
  return await axios.post('users', data);
};

export default {
  register,
  login,
};
