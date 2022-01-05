import 'isomorphic-fetch'
import { Fetch } from 'vue-fetch'
 
// you can pass in mocked fetch or Headers if required

const baseURL = "https://localhost:8443/"
const $ = Fetch({
  headers: {
    "Content-type": "application/json",
  //   // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNmZmE0MTVhOWMxZDAwZGE0ZjZmZjMiLCJpYXQiOjE2MDc0NjYxMzR9.82J5kNEjsnbu6pxAtEKwsIeMO4d5cDBTZfERwXapp4g'
   },
  logging: true
})
 
export default {
  login: async (data) => {
    return await $.post(baseURL+'authentication_token', data)
  },
  register: async (data) => {
    return await $.post(baseURL+'register', data)
  },
  // updateById: async (id, data) => {
  //   return await $.put(`/user/${id}`, )
  // },
  // deleteById: async (id) => {
  //   return await $.delete(`/user/${id}`)
  // },
  // findById: async (id) => {
  //   return await $.get(`/user/${id}`)
  // }
}