import Vue from "vue";
import App from "./App.vue";
import VueRouter from 'vue-router'
import LoginPage from './components/pages/common/auth/LoginPage.vue'
import RegisterPage from './components/pages/common/auth/RegisterPage.vue'
import HomePage from './components/pages/common/HomePage.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

Vue.use(VueRouter)


const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
]

const router = new VueRouter({
  routes,
  history: true,
  mode: 'history'
})


new Vue({
  render: (h) => h(App),
  router
}).$mount("#app");
