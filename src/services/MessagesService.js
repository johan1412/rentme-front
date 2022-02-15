import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8445/"
const headers = {
  'Content-type': 'application/json',
  'Authorization': 'Bearer '+localStorage.getItem('token')
 }


 const postMessage = async (data) => {
    return await axios.post("https://localhost:8445/messages", data, {headers});
  };
  
  const getConversations = async (id) => {
    return await axios.get(`https://localhost:8445/conversations/${id}`, {headers});
  };
  

export default {
  postMessage,
  getConversations
};
