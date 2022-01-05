import URL from "./http-common";


const login = data => {
  return http.post(http+"authentication_token", data);
};

const register = data => {
  return http.post(http+"register", data);
};

export default {
  register,
  login,
};
