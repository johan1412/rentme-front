import Vue from "vue";
import App from "./App.vue";
import VueRouter from 'vue-router'
import LoginPage from './components/pages/authentification/Login.vue'
import HomePage from './components/Home.vue'

Vue.config.productionTip = false;

Vue.use(VueRouter)


const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
]

const router = new VueRouter({
  routes,
  history : true,
  mode : 'history'
})


new Vue({
  render: (h) => h(App),
  router
}).$mount("#app");
