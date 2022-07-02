import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
const state = {
    user : null,
    products : [],
    product : null,
    numberOfProductsNotValid: 0,
    numberOfProductsReported: 0,
    parentCategories:[],
    reservations : [],
    categories:[],
    regions:[],
    reportings:[]
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
      numberOfProductsReported: (state) => {
          return state.numberOfProductsReported
      },
      adminPermission: (state, getters) => {
        return getters.user ? getters.user.roles.includes('ROLE_ADMIN') : false
      },
      userPermission: (state, getters) => {
          return getters.user ? getters.user.roles.includes('ROLE_USER') : false
      },
      allPermission: (state, getters) => {
            return getters.user ? getters.user.roles.includes('ROLE_USER','ROLE_ADMIN','ROLE_RENTER') : false
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
      },
      regions: (state) => {
        return state.regions
      },
      reportings: (state) => {
        return state.reportings
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
    numberOfProductsReported(context,numberOfProductsReported){
      context.commit('numberOfProductsReported',numberOfProductsReported)
    },
    parentCategories(context,categories){
      context.commit('parentCategories',categories.filter(category => category.parent === null))
    },
      reservations(context,reservations){
            context.commit('reservations',reservations)
      },
        categories(context,categories){
            context.commit('categories',categories)
            context.commit('parentCategories',categories)
      },
        regions(context,regions){
            context.commit('regions',regions)
      },
        reportings(context,reportings){
            context.commit('reportings',reportings)
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
    numberOfProductsReported(state,numberOfProductsReported){
      state.numberOfProductsReported = numberOfProductsReported
    },
    parentCategories(state,parentCategories){
        state.parentCategories = parentCategories
    },
    reservations(state,reservations){
        state.reservations = reservations
    },
    categories(state,categories){
        state.categories = categories
    },
    regions(state,regions){
        state.regions = regions
    },
      reportings(state,reportings){
        state.reportings = reportings
    }
  }
})

export default store
