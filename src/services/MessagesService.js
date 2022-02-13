import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8444/"
const headers = {
  'Content-type': 'application/json',
  'Authorization': 'Bearer '+localStorage.getItem('token')
 }


 const postMessage = async (data) => {
    axios.defaults.baseURL =  "https://localhost:8444/"
    return await axios.post("messages", data, {headers});
  };
  
  const getConversations = async (id) => {
    axios.defaults.baseURL =  "https://localhost:8444/"
    return await axios.get(`conversations/${id}`, {headers});
  };
  

export default {
  postMessage,
  getConversations
};
