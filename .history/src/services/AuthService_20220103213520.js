import axios from "axios";


const http = axios.create({
  baseURL: "https://localhost:8443/",
  headers: {
    "Content-type": "application/json",
  //   // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNmZmE0MTVhOWMxZDAwZGE0ZjZmZjMiLCJpYXQiOjE2MDc0NjYxMzR9.82J5kNEjsnbu6pxAtEKwsIeMO4d5cDBTZfERwXapp4g'
   }
});

const login = async data => {
  return http.post(http+"authentication_token", data);
};

const register = async data => {
  return http.post(http+"register", data);
};

export default {
  register,
  login,
};
