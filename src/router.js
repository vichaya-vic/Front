import Vue from 'vue'
import Router from 'vue-router'
import Add from './components/add.vue'
//import table from './components/table.vue' 
import Addedit from './components/addedit.vue' 
Vue.use(Router)

export default new Router({
    mode: 'history',
  routes: [
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/addedit',
      name: 'addedit',
      component: Addedit
    }
  ]
})