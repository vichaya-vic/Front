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
          <b-col>  
                <div>
                        <b-badge variant="dark">Date</b-badge>
                        <Flatpickr :options="DateOptions"  v-model="my_filter.date"/>
                        <!-- <b-badge variant="dark">Form(Time)</b-badge>
                        <Flatpickr :options=" FtimeOptions"  v-model="my_filter.Ftime"/>
                        <b-badge variant="dark">To(Time)</b-badge>
                        <Flatpickr :options=" TtimeOptions"  v-model="my_filter.Ttime"/> -->
                        <b-button  variant="success" v-on:click="Search">Search</b-button>
                </div>      
          </b-col>
            
    </b-row> 
</b-container> 
</div>  
</template>
<script>
import flatPickr from 'vue-flatpickr-component';
import graph from "./test.vue";
import LC from "./LineChart.vue";
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
export default {
  components: { graph, LC,RangeSlider,   flatPickr },
  data() {
    return {
                  my_filter:{
                      date:'',
                      Ftime:'',
                      Ttime:''
                  },
                  DateOptions: {
                      // mode: "range",
                      utc: true,
                      defaultDate: '2016-12-27T16:16:22.585Z',
                  },   
                    FtimeOptions: {
                        enableTime: true,
                        noCalendar: true,
                        time_24hr: true,
                        defaultDate: "12:00"
                  }, 
                  TtimeOptions: {
                        enableTime: true,
                        noCalendar: true,
                        time_24hr: true,
                        defaultDate: "12:00"
                  }, 
                option: { responsive:false, maintainAspectRatio: false, 
                //  scales: {
                //           yAxes: [ {ticks: {min: 0, max:12}}]
                //          },         
                },
                timeline:[1,2,3,4,5,6,7,8,9,10,11,12,12,11,10,9,8,7,6,5,4,3,2,1,1,2,3,4,5,6,7,8,9,10,11,12,12,11,10,9,8,7,6,5,4,3,2,1],
                tmp_data:[1,2,3,4,5,6,6,5,4,3,2,1,1,2,3,4,5,6,6,5,4,3,2,1,1,2,3,4,5,6,6,5,4,3,2,1,1,2,3,4,5,6,6,5,4,3,2,1],
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
       Search()
        {
            console.log(JSON.stringify(this.my_filter));
            return JSON.stringify(this.my_filter);
        },
    add_uv(x) {
      this.dataa_uv = {
        labels:this.timeline.slice(x,x+30),
        datasets: [
          {
            label: "UV",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data:this.tmp_data.slice(x,x+30),
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