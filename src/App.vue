<template>
  <div>
    <bar/> 
    <router-view/>
  </div>
</template>

<script>
import Add from './components/add.vue'
//import reg from './components/reg.vue'
import bar from './layout/navbar.vue'

  export default{
    components:{Add,bar}
  }
</script>