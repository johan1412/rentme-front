import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_URL

 const url = process.env.VUE_APP_URL


const postMessage = async (data,token) => {
    const headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer '+token
    }
  return await axios.post(url+"/messages", data, {headers});
};
  
const getConversations = async (id,token) => {
    const headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer '+token
    }
  return await axios.get(url+`/conversations/${id}`, {headers});
};

const postReport = async (data,token) => {
    const headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer '+token
    }
  return await axios.post(url+"/reportings", data, {headers});
}
  

export default {
  postMessage,
  getConversations,
  postReport
};
