<template>
<div>
   <b-container class="bv-example-row">
    <b-row>
        <b-col><LC :chartData="this.dataa_uv" :options="this.option" /> </b-col>
        <b-col><LC :chartData="this.dataa_tmp" :options="this.option" /> </b-col>
    </b-row>
    <b-row>
        <b-col><LC :chartData="this.dataa_wind" :options="this.option" /> </b-col>
        <b-col><LC :chartData="this.dataa_humid" :options="this.option" /> </b-col
    ></b-row>
    <b-row>
        <b-col><range-slider class="slider" min="0" max="36" step="1" v-on:input="add_all" v-model="sliderValue"> </range-slider></b-col>
        <b-col>
               <input type="radio" id="line" value="line" v-model="type_chart" v-on:change="add_all"  >
                <label for="line">Line</label>
              <input type="radio" id="var" value="bar" v-model="type_chart" v-on:change="add_all" >
                <label for="bar">Bar</label>
        </b-col>
    </b-row> 
   <b-row>
          <b-col><fil/></b-col>
            
    </b-row> 
</b-container> 
</div>  
</template>
<script>
import graph from "./test.vue";
import fil from "./filter-g.vue";
import LC from "./LineChart.vue";
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
export default {
  components: { graph, fil, LC,RangeSlider },
  data() {
    return {
      option: { responsive:false, maintainAspectRatio: false, 
      //  scales: {
      //           yAxes: [ {ticks: {min: 0, max:24}}]
      //          },         
       },
      timeline:[],
      tmp_data:{},
      labes: [],
      dataa_uv: { labels: [], datasets: [] },
      dataa_tmp: { labels: [], datasets: [] },
      dataa_wind: { labels: [], datasets: [] },
      dataa_humid: { labels: [], datasets: [] },
      type_chart:'line',
      sliderValue: 0,
    };
  },
  methods: {
    add_uv(x) {
      this.dataa_uv = {
        labels:this.timeline.slice(x,x+12),
        datasets: [
          {
            label: "UV",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data:this.tmp_data.slice(x,x+12),
            type:this.type_chart
          }
        ]
      };
    },
    add_tmp(x) {
      this.dataa_tmp = {
        labels: this.timeline.slice(x,x+12),
        datasets: [
          {
            label: "Temperature",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data:this.tmp_data.slice(x,x+12),
            type:this.type_chart
          }
        ]
      };
    },
    add_wind(x) {
      this.dataa_wind = {
        labels:this.timeline.slice(x,x+12),
        datasets: [
          {
            label: "Wind",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data:this.tmp_data.slice(x,x+12),
            type:this.type_chart

          }
        ]
      };
    },
    add_humid(x) {
      this.dataa_humid = {
        labels: this.timeline.slice(x,x+12),
        datasets: [
          {
            label: "humid",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data:this.tmp_data.slice(x,x+12),
            type:this.type_chart
          }
        ]
      };
    },
    add_all(){
      this.add_uv(this.sliderValue);
      this.add_tmp(this.sliderValue);
      this.add_wind(this.sliderValue);
      this.add_humid(this.sliderValue);
    }, 
    getUnits: function() {this.add_all()}
  },
  
    beforeMount(){this.getUnits()
 },
};
</script>
<style>
.slider {
  /* overwrite slider styles */
  width: 800px
}
</style> 