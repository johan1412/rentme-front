import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_URL
const headers = {
  'Content-type': 'application/json',
  'Authorization': 'Bearer '+localStorage.getItem('token')
 }



 const postComment = async (data) => {
     axios.defaults.baseURL = process.env.VUE_APP_URL
     return await axios.post("comments", data, {headers});
  };
  
  const getComments = async (id) => {
      axios.defaults.baseURL = process.env.VUE_APP_URL
      return await axios.get(`comments/${id}`, {headers});
  };

  const updateComment = async (data, commentId) => {
      axios.defaults.baseURL = process.env.VUE_APP_URL
      return await axios.patch(`comments/${commentId}`, data, {headers});
  };
  

export default {
  postComment,
  getComments,
  updateComment,
};
