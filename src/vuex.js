import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
const state = {
    user : null,
    products : [],
    product : null,
    numberOfProductsNotValid: 0,
    parentCategories:[],
    categories:[]
}

const store = new Vuex.Store({
    plugins:[createPersistedState()],
  state,
  getters:{
      user: (state) => {
          return state.user
      },
      product: (state) => {
          return state.product
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
      },
      categories: (state) => {
        return state.categories
      }
  },
  actions:{
      user(context,user){
          context.commit('user',user)
      },
      product(context,product){
          context.commit('product',product)
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
      categories(context,categories){
          context.commit('categories',categories)
     },
  },
  mutations:{ 
      user(state,user){
          state.user = user
      },
      product(state,product){
          state.product = product
      },
      products(state,products){
        state.products = products
    },
     numberOfProductsNotValid(state,numberOfProductsNotValid){
          state.numberOfProductsNotValid = numberOfProductsNotValid
    },
      parentCategories(state,parentCategories){
          state.parentCategories = parentCategories
      },
      categories(state,categories){
        state.categories = categories
    }
  }
})

export default store
