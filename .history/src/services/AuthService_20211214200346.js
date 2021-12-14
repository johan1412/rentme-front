import http from "./http-common";


const login = data => {
  return http.post(http+"/login", data);
};

const register = data => {
  return http.post(http+"/register", data);
};

export default {
  register,
  login,
};
