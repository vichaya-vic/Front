<template>
<div>
  <h1 v-if="this.C==true">Finish</h1>
   <b-container class="bv-example-row"  v-if="this.C===true">
            <b-row>
                <b-col><LC :chartData="this.dataa_uv" :options="this.option" /> </b-col>
                <b-col><LC :chartData="this.dataa_tmp" :options="this.option" /> </b-col>
            </b-row>
            <b-row>
                <b-col><LC :chartData="this.dataa_wind" :options="this.option" /> </b-col>
                <b-col><LC :chartData="this.dataa_humid" :options="this.option" /> </b-col
            ></b-row>
            <b-row>
                <b-col><range-slider class="slider" :min=0 :max=36 step="1" :disabled="false" v-on:input="add_all" v-model="sliderValue" > </range-slider></b-col>
                <b-col>
                      <input type="radio" id="type_graph" value="line" v-model="type_chart" v-on:change="add_all"  >
                      <label for="line">กราฟเส้น</label>
                      <input type="radio" id="type_graph" value="bar" v-model="type_chart" v-on:change="add_all" >
                      <label for="bar">กราฟแท่ง</label>
                </b-col>
          </b-row> 
          <b-row>
                  <b-col>  
                        <div>

                                <b-form-select id="exampleInput3"
                                        :options="db_location"
                                        required
                                        v-model="my_filter.location">
                                </b-form-select>
                                <b-badge variant="dark">เลือกวันที่</b-badge>
                                <Flatpickr :options="DateOptions"  v-model="my_filter.typedate"/>
                                <input type="radio" id="inB"   value="true" v-model="x"  v-on:click="Inbuilding" ><label for="inB">ในอาคาร</label>
                                <input type="radio" id="outB"  value="false" v-model="x"  v-on:click="outbuilding"   ><label for="outB">นอกอาคาร</label>
                                
                                <!-- <b-badge variant="dark">Form(Time)</b-badge>
                                <Flatpickr :options=" FtimeOptions"  v-model="my_filter.Ftime"/>
                                <b-badge variant="dark">To(Time)</b-badge>
                                <Flatpickr :options=" TtimeOptions"  v-model="my_filter.Ttime"/> -->
                                <b-button  variant="success" v-on:click="Search">ค้นหา</b-button>
                        </div>      
                  </b-col>
                    
            </b-row> 
</b-container> 
</div>  
</template>
<script>
import flatPickr from "vue-flatpickr-component";

import LC from "./LineChart.vue";
import RangeSlider from "vue-range-slider";
import "vue-range-slider/dist/vue-range-slider.css";
import axios from "axios";

var call = false;
export default {
  components: { LC, RangeSlider, flatPickr },
  data() {
    return {
      C: false,
      db_location: [{ text: "กรุณาเลือกสถานที่", value: null }, "A", "X"],
      my_filter: {
        location: "X",
        inBuilding: true,
        typedate: new Date().toDateString()
      },
      DateOptions: {
        // mode: "range",
        maxDate: new Date(),
        utc: true,
        defaultDate: new Date()
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
      option: {
        responsive: true,
        maintainAspectRatio: false
        //  scales: {
        //           yAxes: [ {ticks: {min: 0, max:12}}]
        //          },
      },
      timeline: [],
      timelabel: [],
      tmp_data: [
        1,
        2,
        3,
        4,
        5,
        6,
        6,
        5,
        4,
        3,
        2,
        1,
        1,
        2,
        3,
        4,
        5,
        6,
        6,
        5,
        4,
        3,
        2,
        1,
        1,
        2,
        3,
        4,
        5,
        6,
        6,
        5,
        4,
        3,
        2,
        1,
        1,
        2,
        3,
        4,
        5,
        6,
        6,
        5,
        4,
        3,
        2,
        1
      ],
      labes: [],
      dataa_uv: {},
      dataa_tmp: {},
      dataa_wind: {},
      dataa_humid: {},
      type_chart: "line",
      sliderValue: 0,
      form: {
        location: "A",
        inBuilding: true,
        typedate: "2018-08-14"
      },
      x: "disabled"
    };
  },
  methods: {
    Inbuilding() {
      this.my_filter.inBuilding = true;
    },
    outbuilding() {
      this.my_filter.inBuilding = false;
    },
    Search() {
      console.log(JSON.stringify(this.my_filter));

      this.getdata();
    },
    add_uv(x) {
      this.dataa_uv = {
        labels: this.timelabel,
        datasets: [
          {
            label: "UV",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: this.tmp_data.slice(x, x + 13),
            type: this.type_chart
          }
        ]
      };
    },
    add_tmp(x) {
      this.dataa_tmp = {
        labels: this.timelabel,
        datasets: [
          {
            label: "Temperature",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: this.tmp_data.slice(x, x + 13),
            type: this.type_chart
          }
        ]
      };
    },
    add_wind(x) {
      this.dataa_wind = {
        labels: this.timelabel,
        datasets: [
          {
            label: "Wind",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: this.tmp_data.slice(x, x + 13),
            type: this.type_chart
          }
        ]
      };
    },
    add_humid(x) {
      this.dataa_humid = {
        labels: this.timelabel,
        datasets: [
          {
            label: "humid",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: this.tmp_data.slice(x, x + 13),
            type: this.type_chart
          }
        ]
      };
    },
    add_all() {
      this.add_uv(this.sliderValue);
      this.add_tmp(this.sliderValue);
      this.add_wind(this.sliderValue);
      this.add_humid(this.sliderValue);
      console.log();
    },
    getdata() {
      var self = this;

      //setInterval(function(){   }, 3000);
      axios
        .post("//localhost:8081/api/getgraph", {
          location: self.my_filter.location,
          inBuilding: self.my_filter.inBuilding,
          typedate: self.my_filter.typedate
        })
        .then(function(response) {
          self.timeline = response.data.time;
          var x = 24;
          self.timelabel = self.timelabel.concat(
            self.timeline.slice(x - 6, x + 7)
          );
          self.C = true;
          self.add_all();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    getUnits: function() {
      this.getdata();
    }
  },
  beforeMount() {
    this.getUnits();
  },
  mounted() {}
};
</script>
<style>
.slider {
  /* overwrite slider styles */
  width: 800px;
}
</style> 