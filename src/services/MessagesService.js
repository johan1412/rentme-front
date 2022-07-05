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

const setRead = async (senderId, recieverId, productId, token) => {
    const headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer '+token
    }
    return await axios.patch(url+`/messages/setread/${senderId}/${recieverId}/${productId}`, null,{headers});
}

const getUnread = async (id, token) => {
    const headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer '+token
    }
    return await axios.get(url+`/messages/unread/${id}`,{headers});
}

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
  setRead,
  getUnread,
  postReport
};
