import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
const state = {
    user : null,
    products : [],
    numberOfProductsNotValid: 0,
    parentCategories:[]
}

const store = new Vuex.Store({
    plugins:[createPersistedState()],
  state,
  getters:{
      user: (state) => {
          return state.user
      },
      parentCategories: (state) => {
          return state.parentCategories
      },
      numberOfProductsNotValid: (state) => {
          return state.numberOfProductsNotValid
      },
      adminPermission: (state, getters) => {
        return getters.user ? getters.user.roles.includes('ROLE_ADMIN') : false
      },
      products: (state) => {
        return state.products
      }
  },
  actions:{
      user(context,user){
          context.commit('user',user)
      },
      products(context,products){
        context.commit('products',products)
    },
     numberOfProductsNotValid(context,numberOfProductsNotValid){
          context.commit('numberOfProductsNotValid',numberOfProductsNotValid)
     },
      parentCategories(context,parentCategories){
          context.commit('parentCategories',parentCategories)
     },
  },
  mutations:{ 
      user(state,user){
          state.user = user
      },
      products(state,products){
        state.products = products
    },
     numberOfProductsNotValid(state,numberOfProductsNotValid){
          state.numberOfProductsNotValid = numberOfProductsNotValid
    },
      parentCategories(state,parentCategories){
          state.parentCategories = parentCategories
      }
  }
})

export default store
