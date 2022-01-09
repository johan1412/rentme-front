import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    user : null,
    products : []
}

const store = new Vuex.Store({
  state,
  getters:{
      user: (state) => {
          return state.user
      },
      productsNotValid: (state) => {
        return state.products ? state.products?.filter(product => !product.isValid) : []
      },
      productsNotValidCount: (state, getters) => {
        return getters.productsNotValid ? getters.productsNotValid.length : 0
      }
  },
  actions:{
      user(context,user){
          context.commit('user',user)
      },
      products(context,products){
        context.commit('products',products)
    }
  },
  mutations:{ 
      user(state,user){
          state.user = user
      },
      products(state,products){
        state.product = products
    }
  }
})

export default store