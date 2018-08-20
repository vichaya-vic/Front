import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Allshown from './components/Allshown.vue'
import Graph from './components/Graph.vue'
import User from './components/User.vue'
import Adduser from './components/Adduser.vue'

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
    },
    {
      path: '/graph',
      name: 'graph',
      component: Graph
    },
    {
      path:'/user',
      name:'user',
      component: User
    },
    {
      path:'/adduser',
      name:'adduser',
      component: Adduser
    }
  ]
})