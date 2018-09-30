<template>
  <div>     
    <div>
      <Navbar/>     
    </div>        
    <router-view/>
    <div>
      <Footer class="footer"/>
    </div>
  </div>
</template>
 
<script>
import Navbar from './layouts/Navbar.vue'
import Footer from './layouts/Footer.vue'
import store from './vuex/store.js'
import Vuex from 'vuex'
global.vuex = Vuex

export default {
  components: {Navbar,Footer},
  store,
  name: 'app'
}
</script>

<style>
.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: right;
}
</style>