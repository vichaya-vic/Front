import Vue from 'vue'
import Router from 'vue-router'
import Allshown from './components/Allshown.vue'
import Login from './components/Login.vue'
import User from './components/User.vue'
import Adduser from './components/Adduser.vue'
import Addlocation from './components/Addlocation.vue'

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
      path:'/user',
      name:'user',
      component: User
    },
    {
      path:'/adduser',
      name:'adduser',
      component: Adduser
    },
    {
      path:'/addlocation',
      name:'addlocation',
      component: Addlocation
    }
  ]
})