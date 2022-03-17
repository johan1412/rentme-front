import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8444/"
const headers = {
  "Content-type": "application/json"
 }

const checkout = async (productId,renterId,tenantId) => {
  return await axios.post(`/create-checkout-session/${productId}/${renterId}/${tenantId}`, headers);
};


export default {
  checkout,
};
