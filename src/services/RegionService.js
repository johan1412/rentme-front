import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8443/"
const headers = {
  'Content-type': 'application/json',
 }

 const postRegion = async (data) => {
    axios.defaults.baseURL =  "https://localhost:8443/"
    return await axios.post("regions", data, {headers});
  };
  
  const getRegions = async () => {
    axios.defaults.baseURL =  "https://localhost:8443/"
    return await axios.get('regions', {headers});
  };

export default {
  postRegion,
  getRegions,
};
