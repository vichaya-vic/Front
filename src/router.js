import Vue from 'vue'
import Router from 'vue-router'
import test from './components/test.vue'
import login from './components/login.vue'


Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/test',
        name: 'test',
        component: test
      },
      {
        path: '/',
        name: 'login',
        props: true,
        component: login
      }
    ]
  })