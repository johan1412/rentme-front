import 'isomorphic-fetch'
import { Fetch } from 'vue-fetch'
 
// you can pass in mocked fetch or Headers if required
const $ = Fetch({
  // fetch,
  // Headers,
  logging: true
})
const baseURL: "https://localhost:8443/",
 
export default {
  create: async (data) => {
    return await $.post('/user', data)
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