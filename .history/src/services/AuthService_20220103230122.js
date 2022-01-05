import axios from "axios";


const http = axios.create({
  baseURL: "https://localhost:8443/",
  headers: {
    "Content-type": "application/json",
  //   // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNmZmE0MTVhOWMxZDAwZGE0ZjZmZjMiLCJpYXQiOjE2MDc0NjYxMzR9.82J5kNEjsnbu6pxAtEKwsIeMO4d5cDBTZfERwXapp4g'
   }
});
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
