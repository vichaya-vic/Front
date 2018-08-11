import Vue from 'vue'
import Router from 'vue-router'
import Allshown from './components/Allshown.vue'
import Login from './components/Login.vue'

Vue.use(Router)

export default new Router({
    mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'login',
      component: Login
    },
    {
      path: '/allshown',
      name: 'allshown',
      component: Allshown
    }
  ]
})