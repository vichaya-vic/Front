import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import VueFlatpickr from 'vue-flatpickr'

import App from './App.vue'
import router from './router'
import store from './vuex/store.js'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.use(VueFlatpickr)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
