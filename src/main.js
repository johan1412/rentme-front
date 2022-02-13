import Vue from "vue";
import App from "./App.vue";
import VueRouter from 'vue-router'
import LoginPage from './components/pages/common/auth/LoginPage.vue'
import RegisterPage from './components/pages/common/auth/RegisterPage.vue'
import CategoryPage from './components/pages/admin/CategoryPage.vue'
import ProductsPage from './components/pages/admin/ProductsPage.vue'
import ProductPage from './components/pages/common/ProductPage.vue'
import ProfilePage from './components/pages/common/ProfilePage.vue'
import HomePage from './components/pages/common/HomePage'
import SearchPage from './components/pages/common/SearchPage'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './vuex'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import StripeCheckout from './components/pages/payment/StripeCheckout.vue'

import * as VueGoogleMaps from 'vue2-google-maps'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBF0i4DOu1KSee4xm2LSnWMF_wEysCB4GA',
    libraries: 'places',
  }
});

Vue.prototype.$apiKey = 'AIzaSyBF0i4DOu1KSee4xm2LSnWMF_wEysCB4GA';

Vue.config.productionTip = false;

Vue.use(VueRouter)


const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/admin/categories', component: CategoryPage },
  { path: '/admin/products', component: ProductsPage },
  { path: '/search', component: SearchPage },
  { path: '/products/:productId', component: ProductPage },
  { path: '/user/:userId', component: ProfilePage },
]

const router = new VueRouter({
  routes,
  history: true,
  mode: 'history'
})


new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount("#app");
