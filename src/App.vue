<template>
  <div>     
    <div v-if="change === 0">
      <navbar1/>     
    </div>     
    <div v-if="change === 1">    
      <navbar2/>
    </div>
    
    <router-view/>
  </div>
</template>

<script>
import navbar1 from './components/navbar1.vue'
import navbar2 from './components/navbar2.vue'
import login from './components/login.vue'
import test from './components/test.vue'

import store from './components/store.js'
import Vuex from 'vuex'
global.vuex = Vuex

export default {
  components: {navbar1,navbar2,login,test},
  store,
  computed: {
    change(){
        return store.state.change
    }
  }
}
</script>

