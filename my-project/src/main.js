import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueFlatpickr from 'vue-flatpickr'
import 'vue-flatpickr/theme/dark.css'

Vue.use(VueFlatpickr)
Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  render: h => h(App),
  
})
    