<template>
  <div id="div1">
    <Navbar/>      
    <router-view id="content1"/>
    <Footer/>    
  </div>
</template>
 
<script>
import Navbar from "./layouts/Navbar.vue";
import Footer from "./layouts/Footer.vue";
import store from "./vuex/store.js";
import Vuex from "vuex";
global.vuex = Vuex;

export default {
  components: { Navbar, Footer },
  store,
  name: "app"
};
</script>

<style>
#div1{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
#content1{
  flex: 1;
}
</style>