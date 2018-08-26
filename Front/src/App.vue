<template>
  <div>     
    <div>
      <Navbar/>     
    </div>        
    <router-view/>
  </div>
</template>
 
<script>
import Navbar from './layouts/Navbar.vue'
import store from './vuex/store.js'
import Vuex from 'vuex'
global.vuex = Vuex

export default {
  components: {Navbar},
  store,
}
</script>