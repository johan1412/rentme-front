import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_URL
const headers = {
  "Content-type": "application/json"
 }

const searchInput = async () => {
  return await axios.get('products', headers);
};

export default {
  searchInput,
};