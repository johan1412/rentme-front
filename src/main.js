import Vue from "vue";
import App from "./App.vue";
import VueRouter from 'vue-router'
import Stripe from "@/components/pages/payment/Stripe";
import LoginPage from './components/pages/common/auth/LoginPage.vue'
import RegisterPage from './components/pages/common/auth/RegisterPage.vue'
import CategoryPage from './components/pages/admin/CategoryPage.vue'
import ListCategoriesPage from './components/pages/admin/ListCategoriesPage.vue'
import RegionPage from './components/pages/admin/RegionPage.vue'
import ListRegionsPage from './components/pages/admin/ListRegionsPage.vue'
import ProductsPage from './components/pages/admin/ProductsPage.vue'
import ReportingsPage from './components/pages/admin/ReportingsPage.vue'
import ProductPage from './components/pages/common/ProductPage.vue'
import ProfilePage from './components/pages/common/ProfilePage.vue'
import HomePage from './components/pages/common/HomePage'
import SearchPage from './components/pages/common/SearchPage'
import AccountPage from './components/pages/common/Account'
import Cgu from './components/pages/common/Cgu'
import Cgv from './components/pages/common/Cgv'
import AddProductPage from './components/pages/renter/AddProductPage'
import RenterProductsPage from './components/pages/renter/RenterProductsPage'
import MessagesPage from './components/pages/common/MessagesPage'
import Success from './components/pages/payment/Sucess'
import Cancel from './components/pages/payment/Cancel'
import Refund from './components/pages/payment/Refund'
import Error404 from "@/components/pages/errors/Error404";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './vuex'

import VueSpinners from 'vue-spinners'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//import StripeCheckout from './components/pages/payment/StripeCheckout.vue'

import * as VueGoogleMaps from 'vue2-google-maps'

import './registerServiceWorker'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS,
    libraries: 'places',
  }
});

Vue.prototype.$apiKey = process.env.VUE_APP_GOOGLE_MAPS;

Vue.config.productionTip = false;

Vue.use(VueRouter)

Vue.use(VueSpinners)

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/admin/categories-list', component: ListCategoriesPage },
  { path: '/admin/categories', component: CategoryPage },
  { path: '/admin/regions-list', component: ListRegionsPage },
  { path: '/admin/regions', component: RegionPage },
  { path: '/admin/products', component: ProductsPage },
  { path: '/admin/reportings', component: ReportingsPage },
  { path: '/search', component: SearchPage },
  { path: '/publish', component: AddProductPage},
  { path: '/products', component: RenterProductsPage},
  { path: '/products/:productId', component: ProductPage },
  { path: '/user/:userId', component: ProfilePage },
  { path: '/messages', component: MessagesPage },
  { path: '/success', component: Success },
  { path: '/cancel', component: Cancel },
  { path: '/refund', component: Refund },
  { path: '/account', component: AccountPage },
  { path: '/conditions-generales-utilisation', component: Cgu },
  { path: '/conditions-generales-vente', component: Cgv },
  { path: '/error-404', component: Error404},
  { path: '/stripe', component: Stripe},
  { path: '/*', component: Error404}
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
