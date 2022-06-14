import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_URL
const headers = {
  'Content-type': 'application/json',
 }

 const postRegion = async (data) => {
     axios.defaults.baseURL = process.env.VUE_APP_URL
    return await axios.post("regions", data, {headers});
  };
  
  const getRegions = async () => {
      axios.defaults.baseURL = process.env.VUE_APP_URL
    return await axios.get('regions', {headers});
  };

export default {
  postRegion,
  getRegions,
};
