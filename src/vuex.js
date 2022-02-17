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
    reservations : [],
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
      userPermission: (state, getters) => {
          return getters.user ? getters.user.roles.includes('ROLE_USER') : false
      },
      renterPermission: (state, getters) => {
          return getters.user ? getters.user.roles.includes('ROLE_RENTER') : false
      },
      products: (state) => {
        return state.products
      },
      reservations: (state) => {
            return state.reservations
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
      reservations(context,reservations){
            context.commit('reservations',reservations)
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
      reservations(state,reservations){
          state.reservations = reservations
      },
    categories(state,categories){
        state.categories = categories
    }
  }
})

export default store
