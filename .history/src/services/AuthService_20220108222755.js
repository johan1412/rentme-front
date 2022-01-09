import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8443/"
const headers = {
  "Content-type": "application/json",
  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NDE2NzY5NzgsImV4cCI6MTY0MTY4MDU3OCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InRlc3RAZ21haWwuY29tIn0.rf7avnbKGu28LzUS0AvfS0rTIWhHMkOhI9rYxmj2ggFjOe0qqNggqlW5npdEzFskCN5JLdcF80hbkJMPH_-iWxJfAUao3UE7RjRXVtrlfp-Dg4dbOqdluFpt2J7QTQrL9xdcKHnecRb-UgfBV6BAkDeYHdTwEYXRVGG8253ZAcWRz0fv5bLQ3vXNYlRJC1xY-1biI-ZhNJYtHEgyEjn0g2oB24zCKrI5nV_1eOV4VdlLz4eyl5KeuPw1SQTOyrHJXRtiYj0fdhXxtdQmSeNaxzHOnFHTx3m-FacJzqM2-hK21TqZX8xQu5q7Hsx8W1SYSrmPtKftR-OHIv8m4kEefVpn4CMm5GAEZ7QyDqdU7JtpnPHEs3ns60Yh5B_X1HaryOT3FsaV_HmOnMqGAE_5SbfuCY5dgTKdN5a-cYCBlYlG913DBuXzgqgckkD_PZ-0wvis8hNT-7DLoe6806bhSBSGeGzJtmrKw9g02KGXb1Ty_k5c6bMP_GfRBO9_yad08s-spQsU2ETzlgXXxGO-7lQpNb8yHmtSJKqqt1oihgCk0e3XS0KBtp8smYdYdIFsGk_bcFSn1pEepfaKB9WKQ_i8X3FSZ2Zb3FtZAhdLcoMVCAYp8kMJDS_mhJ0hJ7612qB0gMzk5VtlNy8ltZ7QwPjFiqzhSCLhevJshAb6goc'
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

const postCategory = async (data) => {
  return await axios.get("categories", data, headers);
};

export default {
  register,
  login,
  getUser,
  parentCotegories,
  postCategory
};
