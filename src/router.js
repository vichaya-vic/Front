import Vue from 'vue'
import Router from 'vue-router'
import Reg from './components/add.vue'
import table from './components/table.vue' 
import form from './components/addedit.vue' 
Vue.use(Router)

export default new Router({
    mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Reg
    },
    {
        path: '/table',
        name: 'table',
        component: table
    },
    {
      path: '/form',
      name: 'form',
      component: form
    }
  ]
})