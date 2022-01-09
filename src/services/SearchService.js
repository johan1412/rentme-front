import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8443/"
const headers = {
  "Content-type": "application/json"
 }

const searchInput = async () => {
  return await axios.get('products', headers);
};

export default {
  searchInput,
};