import URL from "./http-common";


const login = data => {
  return http.post(URL+"authentication_token", data);
};

const register = data => {
  return http.post(URL+"register", data);
};

export default {
  register,
  login,
};
