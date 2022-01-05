import 'isomorphic-fetch'
import { Fetch } from 'vue-fetch'
 
// you can pass in mocked fetch or Headers if required

const baseURL = "https://localhost:8443/"
const $ = Fetch({
  // fetch,
  // Headers,
  logging: true
})
 
export default {
  login: async (data) => {
    return await $.post(user+'authentication_token', data)
  },
  create: async (data) => {
    return await $.post(user+'authentication_token', data)
  },
  updateById: async (id, data) => {
    return await $.put(`/user/${id}`, )
  },
  deleteById: async (id) => {
    return await $.delete(`/user/${id}`)
  },
  findById: async (id) => {
    return await $.get(`/user/${id}`)
  }
}