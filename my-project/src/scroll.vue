<template>
<div>
     <range-slider
    class="slider"
    min="12"
    max="48"
    step="1"
    v-on:input="onChange"
    v-model="sliderValue">
  </range-slider>
</div>
</template>
<script>
import RangeSlider from 'vue-range-slider'
// you probably need to import built-in style
import 'vue-range-slider/dist/vue-range-slider.css'
 
export default {
  data () {
    return {
      sliderValue: 0
    }
  },
  components: {
    RangeSlider
  },
  methods:{
        onChange() {
      console.log("change");
      },
  }

}
</script> 
 
<style>
.slider {
  /* overwrite slider styles */
  width: 800px
}
</style> 