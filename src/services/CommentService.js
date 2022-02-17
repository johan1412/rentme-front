import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8443/"
const headers = {
  'Content-type': 'application/json',
  'Authorization': 'Bearer '+localStorage.getItem('token')
 }


 const postComment = async (data) => {
    axios.defaults.baseURL =  "https://localhost:8443/"
    return await axios.post("comments", data, {headers});
  };
  
  const getComments = async (id) => {
    axios.defaults.baseURL =  "https://localhost:8443/"
    return await axios.get(`comments/${id}`, {headers});
  };

  const updateComment = async (data, commentId) => {
    axios.defaults.baseURL =  "https://localhost:8443/"
    return await axios.patch(`comments/${commentId}`, data, {headers});
  };
  

export default {
  postComment,
  getComments,
  updateComment,
};
