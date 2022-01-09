import axios from "axios";

axios.defaults.baseURL =  "https://localhost:8443/"
const headers = {
  "Content-type": "application/json",
  "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NDE2NzAwMzksImV4cCI6MTY0MTY3MzYzOSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InRlc3RAZ21haWwuY29tIn0.lWgZmpP4bW6ocR-T_XQS3KRKMRL7qXYBWhyhWxCparN9CX2Ma7-7OC7MJuBBmnagi12igk3ORgVVJk8EmgPFjInr5UTRTtApTQvXxPTfqZyKs5Gm5eQKMh82QevUbvb6-vimcrD3IrREX98LP8hSvrwYQypFZm5uZFd78iDEfLcwIHarC9vk6NNXjzcH2YGMinSNSgsjmucPUAoRgIegddt_CeBFZ1HTVzQJZMfIyOAnx62Hp3MkVMO7MbQNBgIIqEjZesotpF0sHG7cnHwSaDeGtTwq226NS3b1bOwXzOSNJXp9BsX_beMW76Pq5jjQrZekojvJtjs1lQUhBwP13jOe2OJJwWo8bMUSvna1NXrQfH9a8USwf8vXavXv1IR9h1Ew5OXA7GiXQBTLYCQsY26K-1bpaoRrtVY-u8hR2Zxg4djpNhlXY9QJCxWALGlcbcsXqv1enB8ixqJ1iIHXee0oD10TTOLDFCIhPSst5CfuUGX7XwhKa7SE7PUThFkRpQi8g1bEbVpSWwscDdb37pbdsG4sItlu5F0EHDzy3TDMLtt_mOqHdoWLqzaoY4IK8lhPJFvTSFdQkp_Kwo7B_Q3BIjfhARXyOdDpUBTCe5d4p9e08ApVdQZbUOLbLjI2mtgPCOnsgfaSBkFSPMT2mdkcwp4vYt6_K95iDSDHuoU"
 }

const login = async data => {
  return await axios.post("authentication_token", data , {headers});
};

const register = async data => {
  return await axios.post("users", data , {headers});
};

const getUser = async (id) => {
  return await axios.get(`users/${id}`, headers);
};

const parentCotegories = async () => {
  return await axios.get("categories", headers);
};

const postCategory = async (data) => {
  return await axios.get("categories", data, headers);
};

export default {
  register,
  login,
  getUser,
  parentCotegories,
  postCategory
};
