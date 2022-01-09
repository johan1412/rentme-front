import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    user : null,
    products : null
}

const store = new Vuex.Store({
  state,
  getters:{
      user: (state) => {
          return state.user
      },
      productsNotValid: state => {
        return state.products.filter(product => !product.isValid)
      },
      productsNotValid: (state, getters) => {
        return getters.doneTodos.length
      }
  },
  actions:{
      user(context,user){
          context.commit('user',user)
      }
  },
  mutations:{ 
      user(state,user){
          state.user = user
      }
  }
})

export default store