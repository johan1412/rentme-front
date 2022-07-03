import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_URL
const headers = {
  'Content-type': 'application/json',
}

const postRegion = async (data, token) => {
  axios.defaults.baseURL = process.env.VUE_APP_URL
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.post("regions", data, {headers});
};

const getRegions = async () => {
  axios.defaults.baseURL = process.env.VUE_APP_URL
  return await axios.get('regions', {headers});
};

const updateRegion = async (id, data, token) => {
  axios.defaults.baseURL = process.env.VUE_APP_URL
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.put(`regions/${id}`, data, {headers});
};

const deleteRegion = async (id, token) => {
  axios.defaults.baseURL = process.env.VUE_APP_URL
  const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer '+token
  }
  return await axios.delete(`regions/${id}`, {headers});
};

export default {
  postRegion,
  getRegions,
  updateRegion,
  deleteRegion,
};
