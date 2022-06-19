import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_URL

 const postComment = async (data,token) => {
     axios.defaults.baseURL = process.env.VUE_APP_URL
     const headers = {
         'Content-type': 'application/json',
         'Authorization': 'Bearer '+token
     }
     return await axios.post("comments", data, {headers});
  };
  
  const getComments = async (id,token) => {
      const headers = {
          'Content-type': 'application/json',
          'Authorization': 'Bearer '+token
      }
      axios.defaults.baseURL = process.env.VUE_APP_URL
      return await axios.get(`comments/${id}`, {headers});
  };

  const updateComment = async (data, commentId,token) => {
      const headers = {
          'Content-type': 'application/json',
          'Authorization': 'Bearer '+token
      }
      axios.defaults.baseURL = process.env.VUE_APP_URL
      return await axios.patch(`comments/${commentId}`, data, {headers});
  };
  

export default {
  postComment,
  getComments,
  updateComment,
};
