<template>
<div>
  <h1 v-if="this.C==true">Finish</h1>
   <b-container class="bv-example-row"  v-if="this.C===true">
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
                                <input type="radio" id="inB"   value="true" v-model="x"  v-on:click="Inbuilding"  ><label for="inB">ในอาคาร</label>
                                <input type="radio" id="outB"  value="false" v-model="x"  v-on:click="outbuilding"><label for="outB">นอกอาคาร</label>
                                
                                <!-- <b-badge variant="dark">Form(Time)</b-badge>
                                <Flatpickr :options=" FtimeOptions"  v-model="my_filter.Ftime"/>
                                <b-badge variant="dark">To(Time)</b-badge>
                                <Flatpickr :options=" TtimeOptions"  v-model="my_filter.Ttime"/> -->
                                <b-button  variant="success" v-on:click="Search">ค้นหา</b-button>
                        </div>      
                  </b-col>
                    
            </b-row> 
            <b-row>
                <b-col><LC class="LineC" :chartData="this.dataa_uv" :options="this.option" /> </b-col>
                
                <b-col><LC :chartData="this.dataa_tmp" :options="this.option" /> </b-col>
            </b-row>
            <b-row>
                <b-col><LC :chartData="this.dataa_wind" :options="this.option" /> </b-col>
                <b-col><LC :chartData="this.dataa_humid" :options="this.option" /> </b-col>
            </b-row>
            <b-row>
                <b-col v-if="this.On_Off===false">
                      <b-button  variant="success" v-on:click="OpenAll">เปิดดูข้อมูลทั้งหมด</b-button>

                </b-col>
                <b-col v-if="this.On_Off===true">
                      <range-slider class="slider" :min=0 :max="timelabel.length-13" step="1" :disabled="false" v-on:input="OnSL" v-model="sliderValue" > </range-slider>
                      <b-button  variant="danger" v-on:click="OpenAll">ปิด</b-button>

                </b-col>
                <b-col>
                      <input type="radio" id="type_graph" value="line" v-model="type_chart" v-on:change="change_chart"  >
                      <label for="line">กราฟเส้น</label>
                      <input type="radio" id="type_graph" value="bar" v-model="type_chart" v-on:change="change_chart" >
                      <label for="bar">กราฟแท่ง</label>
                </b-col>
          </b-row> 
          
</b-container> 
</div>  
</template>
<script>
import flatPickr from 'vue-flatpickr-component';

import LC from "./LineChart.vue";
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
import axios from "axios";

var call = false;
export default {
  components: {  LC,RangeSlider,   flatPickr },
  data() {
    return {      
                  C:false,
                  On_Off:false,
                  db_location:[  { text: 'กรุณาเลือกสถานที่', value: null },'A','X'],
                  my_filter:{
                      location:'X',
                      inBuilding:true,
                      typedate:new Date().toDateString(),
                  },
                  DateOptions: {
                      // mode: "range",
                      maxDate:  new Date(),
                      utc: true,
                      defaultDate: new Date(),
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
                option: { responsive:true, maintainAspectRatio: false, 
                 scales: {
                          yAxes: [ {ticks: {min: 0, max:100}}]
                         },         
                },
                timeline :[],
                timelabel:[],
                tmp_data:[],
                labes:[],
                uv_l:[],
                tmp_l:[],
                wind_l:[],
                humid_l:[],
               
                dataa_uv: {},
                dataa_tmp: {},
                dataa_wind: {},
                dataa_humid: {},
                type_chart:'line',
                sliderValue: 0,
                form_data:{
                          humid: [],
                          uv: [],
                          tmp: [],
                          wind: [],
                          time: []
                    },
                    x:"disabled"
           
    };
  },
  methods: {

                change_chart(){
                  
                  if(this.On_Off === true){this.OnSL();} 
                  else  this.add_all()

                },
                  Inbuilding()
                {
                  this.my_filter.inBuilding = true
            
                },
                  outbuilding()
                {
                    this.my_filter.inBuilding = false  
                     
                },
                  Search()
                      {
                          console.log(JSON.stringify(this.my_filter));
                        this.getdata()
                      },
                  OpenAll(){
                    if(this.On_Off ===false) { this.On_Off =true ; this.OnSL();}
                    else{this.On_Off =false ; this.C=false ;this.getdata();this.sliderValue=0} 
                  },
                  OnSL(){
                      this.timelabel = this.form_data.time
                          this.dataa_uv = {
                                        labels:this.timelabel.slice(this.sliderValue,this.sliderValue+13),
                                        datasets: [
                                          {
                                            label: "UV",
                                            borderColor: "Tomato",
                                            pointBackgroundColor:  "Tomato",
                                            borderWidth: 3,
                                            pointBorderColor:  "Tomato",
                                            backgroundColor:  this.type_chart == "line" ? this.gradient:  "Tomato",
                                            data:this.form_data.uv.slice(this.sliderValue,this.sliderValue+13),
                                            type:this.type_chart
                                          }
                                        ]
                          };
                          this.dataa_tmp = {
                                            labels: this.timelabel.slice(this.sliderValue,this.sliderValue+13),
                                            datasets: [
                                              {
                                                label: "Temperature",
                                                borderColor: "DodgerBlue",
                                                pointBackgroundColor: "DodgerBlue",
                                                borderWidth: 3,
                                                pointBorderColor: "DodgerBlue",
                                                backgroundColor: this.type_chart == "line" ? this.gradient: "DodgerBlue",
                                                data:this.form_data.tmp.slice(this.sliderValue,this.sliderValue+13),
                                                type:this.type_chart
                                              }
                                            ]
                          };
                          this.dataa_wind = {
                                            labels:this.timelabel.slice(this.sliderValue,this.sliderValue+13),
                                            datasets: [
                                              {
                                                label: "Wind",
                                                borderColor: "Orange",
                                                pointBackgroundColor: "Orange",
                                                borderWidth: 3,
                                                pointBorderColor: "Orange",
                                                backgroundColor:this.type_chart == "line" ? this.gradient:"Orange", 
                                                data:this.form_data.wind.slice(this.sliderValue,this.sliderValue+13),
                                                type:this.type_chart

                                              }
                                            ]
                            };
                            this.dataa_humid = {
                                            labels:this.timelabel.slice(this.sliderValue,this.sliderValue+13),
                                            datasets: [
                                              {
                                                label: "humid",
                                                borderColor: "MediumSeaGreen",
                                                pointBackgroundColor: "MediumSeaGreen",
                                                borderWidth: 3,
                                                pointBorderColor: "MediumSeaGreen",
                                                backgroundColor:this.type_chart == "line" ? this.gradient:"MediumSeaGreen",
                                                data:this.form_data.humid.slice(this.sliderValue,this.sliderValue+13),
                                                type:this.type_chart
                                              }
                                            ]
                            };


                  },
                  add_uv(x) {
                    this.dataa_uv = {
                      labels:this.timelabel,
                      datasets: [
                        {
                         label: "UV",
                         borderColor: "Tomato",
                         pointBackgroundColor:  "Tomato",
                         borderWidth: 3,
                         pointBorderColor:  "Tomato",
                         backgroundColor:  this.type_chart == "line" ? this.gradient:  "Tomato",
                          data:this.uv_l.slice(x,x+13),
                          type:this.type_chart
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
                         borderColor: "DodgerBlue",
                         pointBackgroundColor: "DodgerBlue",
                         borderWidth: 3,
                         pointBorderColor: "DodgerBlue",
                         backgroundColor: this.type_chart == "line" ? this.gradient: "DodgerBlue",
                          data:this.tmp_l.slice(x,x+13),
                          type:this.type_chart
                        }
                      ]
                    };
                  },
                  add_wind(x) {
                    this.dataa_wind = {
                      labels:this.timelabel,
                      datasets: [
                        {
                          label: "Wind",
                          borderColor: "Orange",
                          pointBackgroundColor: "Orange",
                          borderWidth: 3,
                          pointBorderColor: "Orange",
                          backgroundColor:this.type_chart == "line" ? this.gradient:"Orange", 
                          data:this.wind_l.slice(x,x+13),
                          type:this.type_chart

                        }
                      ]
                    };
                  },
                  add_humid(x) {
                    this.dataa_humid = {
                      labels:this.timelabel,
                      datasets: [
                        {
                           label: "humid",
                          borderColor: "MediumSeaGreen",
                          pointBackgroundColor: "MediumSeaGreen",
                          borderWidth: 3,
                          pointBorderColor: "MediumSeaGreen",
                          backgroundColor:this.type_chart == "line" ? this.gradient:"MediumSeaGreen",
                          data:this.humid_l.slice(x,x+13),
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
                  getdata(){

              var self = this ;
              
              
              //setInterval(function(){   }, 3000);
                                  axios.post(
                            "//localhost:8081/api/getgraph", {
                            "location":self.my_filter.location,
                            "inBuilding":self.my_filter.inBuilding,
                            "typedate": self.my_filter.typedate
                        })
                                .then(function(response) { 



                      console.log(response)

                                  if(response.data != "")
                                  {
                                      self.form_data.time   = response.data.time;
                                      self.form_data.uv     = response.data.uv
                                        self.form_data.tmp    = response.data.tmp
                                        self.form_data.humid  = response.data.humid
                                        self.form_data.wind   = response.data.wind
                                      var x =24;
                                      self.timelabel    = response.data.time.slice(x-6,x+7)
                                      self.wind_l       = response.data.wind.slice(x-6,x+7)
                                      self.tmp_l        = response.data.tmp.slice(x-6,x+7)
                                      self.uv_l         = response.data.uv.slice(x-6,x+7)
                                      self.humid_l      = response.data.humid.slice(x-6,x+7)
                                      self.C = true  
                                      self.add_all(); 
                                  }
                                  else console.log("not find")    
                                })
                                .catch(function(error) {
                                  console.log(error);
                                });      

                      
                
                  },

                  
                  getUnits: function() {this.getdata();}
    },
    beforeMount(){this.getUnits() },
     mounted(){   }
};
</script>
<style>
.slider {
  /* overwrite slider styles */
  width: 800px
}

 /* .LineC{

width:800px;
height: 400px;
display: block;




  

 } */
    

</style> 