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
      
      productsNotValide: (state) => {
        return this.$store
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