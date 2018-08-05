import Vue from 'vue'
import Router from 'vue-router'
import Allshown from './components/Allshown.vue'

Vue.use(Router)

export default new Router({
    mode:'history',
  routes: [
    {
      path: '/allshown',
      name: 'allshown',
      component: Allshown
    }
  ]
})