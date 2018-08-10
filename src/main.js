import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import router from './router'

import { store } from './components/store.js'
Vue.use(BootstrapVue)

new Vue({
  router, 
  store,              // Add this line
  render: h => h(App)
}).$mount('#app')
