import Vue from 'Vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    user = null
}

const store = new Vuex.Store({
  state,
  getters:{
      user: (state) => {
          return state.user
      }
  },
  actions:{},
  mutations:{}
})

export default store