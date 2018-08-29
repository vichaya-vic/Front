<template>
  <div style="margin:5%">
    <b-form-group class="justify-content-md-center" style="margin-left:15%;margin-right:15%">
      <b-input-group>
          <b-form-select :options="locations" v-model="my_filter.location">
            <template slot="first">
                <option :value="null" disabled>-- กรุณาเลือกสถานที่ --</option>
            </template>
          </b-form-select>
      </b-input-group>
    </b-form-group> 
    
    <b-tabs>
      <b-tab title="แสดงข้อมูลรายวัน" active v-on:click="show=false" >
        <b-row align-h="center" class="pt-3">
          <b-col sm="2" class="pt-1">เลือกวันที่ :</b-col >

          <b-col class="pt-1">
            <flat-pickr class="form-control" :config="config"  v-model="my_filter.typedate" ></flat-pickr>  
          </b-col>

          <b-col>
            <b-form-group>
              <b-form-radio-group buttons v-model="my_filter.inBuilding" :options="[{text:'ในอาคาร',value:true},{text:'นอกอาคาร',value:false}]" button-variant="outline-secondary"/>
            </b-form-group>
          </b-col>

          <b-col>
            <b-button  variant="success" v-on:click="Search('Day')">ค้นหา</b-button>
          </b-col>
        </b-row>
      </b-tab>

      <b-tab title="แสดงข้อมูลรายเดือน" v-on:click="show=false">
        <b-row align-h="center" class="pt-3">
          <b-col sm="2" class="pt-1">เลือกเดือน :</b-col >
            
          <b-col class="pt-1">
            <b-input-group>
              <b-form-select :options="db_month" v-model="my_filter.month">
                <template slot="first">
                  <option :value="null" disabled>-- กรุณาเลือกเดือน --</option>
                </template>
              </b-form-select>
            </b-input-group>
          </b-col>

          <b-col>
            <b-form-group>
              <b-form-radio-group buttons v-model="my_filter.inBuilding" :options="[{text:'ในอาคาร',value:true},{text:'นอกอาคาร',value:false}]" button-variant="outline-secondary"/>
            </b-form-group>
          </b-col>

          <b-col>
            <b-button  variant="success" v-on:click="Search('Month')">ค้นหา</b-button>
          </b-col>
        </b-row>
      </b-tab>
       
      <b-tab title="แสดงข้อมูลรายปี" v-on:click="show=false">
        <b-row align-h="center" class="pt-3">
          <b-col sm="2" class="pt-1">เลือกปี :</b-col >
            
          <b-col class="pt-1">
            <b-form-input 
              type="text"
              v-model="my_filter.year"
              placeholder="กรุณาระบุปี ค.ศ.">
            </b-form-input> 
          </b-col>

          <b-col>
            <b-form-group>
              <b-form-radio-group buttons v-model="my_filter.inBuilding" :options="[{text:'ในอาคาร',value:true},{text:'นอกอาคาร',value:false}]" button-variant="outline-secondary"/>
            </b-form-group>
          </b-col>

          <b-col>
            <b-button  variant="success" v-on:click="Search('Year')">ค้นหา</b-button>
          </b-col>
        </b-row>
      </b-tab>

      <b-tab title="แสดงข้อมูลแบบกำหนดเอง" v-on:click="show=false" >
        <b-row align-h="center" class="pt-3">
          <b-col sm="2" class="pt-1">เลือกวันที่ :</b-col >

          <b-col class="pt-1">
            <flat-pickr class="form-control" :config="Range_T"  v-model="my_filter.Range_Date" placeholder="กรุณาระบุช่วงวัน" ></flat-pickr> 
          </b-col>

          <b-col sm="2" class="pt-1">เลือกช่วงเวลา :</b-col >

          <b-col class="pt-1">
            <flat-pickr  :config="timeOptions"  v-model="my_filter.Ftime" ></flat-pickr>           
          </b-col>
          
          <b-col sm="2" class="pt-1">ถึง</b-col >

          <b-col class="pt-1">
            <flat-pickr  :config="timeOptions"  v-model="my_filter.Ttime" ></flat-pickr>           
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group>
              <b-form-radio-group buttons v-model="my_filter.inBuilding" :options="[{text:'ในอาคาร',value:true},{text:'นอกอาคาร',value:false}]" button-variant="outline-secondary"/>
            </b-form-group>
          </b-col>

          <b-col>
            <b-button  variant="success" v-on:click="Search('Custom')">ค้นหา</b-button>
          </b-col>
        </b-row>
      </b-tab>    
    </b-tabs>

    <b-container v-if="show">
      <b-row>
          <b-col>
            <range-slider class="slider pt-3 pl-3" :min=0 :max="timelabel.length-13" step="1" :disabled="false" v-on:input="add_all" v-model="sliderValue" > </range-slider>
          </b-col>

          <b-col>
            <b-form-group>
              <b-form-radio-group buttons v-model="type_chart" :options="[{text:'กราฟเส้น',value:'line'},{text:'กราฟแท่ง',value:'bar'}]" button-variant="outline-secondary" class="pt-3" v-on:input="add_all"/>
            </b-form-group>
          </b-col>
        </b-row>
      <b-row>
        <b-col><LC class="LineC" :chartData="this.dataa_uv" :options="this.option" /></b-col>
        <b-col><LC :chartData="this.dataa_tmp" :options="this.option" /> </b-col>
      </b-row>

      <b-row>
        <b-col><LC :chartData="this.dataa_wind" :options="this.option" /> </b-col>
        <b-col><LC :chartData="this.dataa_humid" :options="this.option" /> </b-col>
      </b-row>
    </b-container>
  </div>  
</template>

<script>
import LC from "./LineChart.vue";
import RangeSlider from "vue-range-slider";
import flatPickr from "vue-flatpickr-component";
import "vue-range-slider/dist/vue-range-slider.css";
import axios from "axios";

var call = false;
export default {
  components: { LC, RangeSlider, flatPickr },
  beforeMount() {
    if (!this.Status) this.$router.push("/login");
    else {
      if (this.$route.params.location === undefined)
        this.my_filter.location = null;
      else {
        this.my_filter.location = this.$route.params.location;
        this.show = true;
        this.getDay();
      }
      this.getLocations();
    }
  },
  data() {
    return {
      locations: [],
      show: false,
      my_filter: {
        location: null,
        inBuilding: true,
        typedate: new Date().toDateString(),
        month:new Date().getMonth()+1,
        year:new Date().getFullYear(),
        Ftime:"12:00",
        Ttime:"12:00",
        Range_Date:null
      },
      db_month: [
        { text: "มกราคม"      ,value:1 },
        { text: "กุมภาพันธ์"    ,value:2 },
        { text: "มีนาคม"      ,value:3},
        { text: "เมษายน"     ,value:4 },
        { text: "พฤษภาคม"    ,value:5},
        { text: "มิถุนายน"     ,value:6 },
        { text: "กรกฎาคม"    ,value:7},
        { text: "สิงหาคม"     ,value:8 },
        { text: "กันยายน"     ,value:9},
        { text: "ตุลาคม"     ,value:10 },
        { text: "พฤ"        ,value:11 },
        { text: "กันยายน"     ,value:12}
      ],
      config: {
        //mode: "range",
        dateFormat: "Y/m/d",
        defaultDate: new Date(),
        maxDate: new Date()
      },
      Range_T: {
        mode: "range",
        defaultDate: new Date(),
        maxDate: new Date()
      },
      timeOptions: {
        enableTime: true,
        noCalendar: true,
        time_24hr: true,
        defaultDate: "12:00"
      },
      option: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100,
                fontSize: 15
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 15
              }
            }
          ]
        },
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontSize: 15
          }
        }
      },
      timeline: [],
      timelabel: [],
      tmp_data: [],
      labes: [],
      uv_l: [],
      tmp_l: [],
      wind_l: [],
      humid_l: [],
      dataa_uv: {},
      dataa_tmp: {},
      dataa_wind: {},
      dataa_humid: {},
      type_chart: "line",
      sliderValue: 0,
    };
  },
  computed: {
    Status() {
      return store.state.status;
    }
  },
  methods: {
    Search(m) {
      if (this.my_filter.location != null) {
        if(m==='Day') this.getDay();
        else if(m==='Month') this.getMonth();
        else if(m==='Year') this.getYear();
        else if(m==='Custom') this.getCustom();
        this.show = true;
      }
    },
    add_uv(x) {
      this.dataa_uv = {
        labels: this.timelabel,
        datasets: [
          {
            label: "UV",
            borderColor: "Tomato",
            pointBackgroundColor: "Tomato",
            borderWidth: 3,
            pointBorderColor: "Tomato",
            backgroundColor:
              this.type_chart == "line" ? this.gradient : "Tomato",
            data: this.uv_l.slice(x, x + 13),
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
            borderColor: "DodgerBlue",
            pointBackgroundColor: "DodgerBlue",
            borderWidth: 3,
            pointBorderColor: "DodgerBlue",
            backgroundColor:
              this.type_chart == "line" ? this.gradient : "DodgerBlue",
            data: this.tmp_l.slice(x, x + 13),
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
            borderColor: "Orange",
            pointBackgroundColor: "Orange",
            borderWidth: 3,
            pointBorderColor: "Orange",
            backgroundColor:
              this.type_chart == "line" ? this.gradient : "Orange",
            data: this.wind_l.slice(x, x + 13),
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
            borderColor: "MediumSeaGreen",
            pointBackgroundColor: "MediumSeaGreen",
            borderWidth: 3,
            pointBorderColor: "MediumSeaGreen",
            backgroundColor:
              this.type_chart == "line" ? this.gradient : "MediumSeaGreen",
            data: this.humid_l.slice(x, x + 13),
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
    },
    getLocations() {
      axios.defaults.withCredentials = true;
      axios
        .post("//localhost:8081/api/getLocations")
        .then(response => {
          if (response.data.confirm) {
            this.locations = response.data.locations.map(function(obj) {
              return obj.location;
            });
          } else {
            this.addName("");
            this.addEmail("");
            this.addStatus(false);
            this.addPermission(false);
            this.$router.push("/");
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    getDay() {
      //setInterval(function(){   }, 3000);
      console.log(this.my_filter.typedate);
      axios.defaults.withCredentials = true;
      axios
        .post("//localhost:8081/api/getDay", {
          location: this.my_filter.location,
          inBuilding: this.my_filter.inBuilding,
          typedate: this.my_filter.typedate
        })
        .then(response => {
          console.log(response.data);
          if (response.data.confirm) {
              var x = 24;

              this.timelabel = response.data.data.time.slice(x - 6, x + 7);
              this.wind_l = response.data.data.wind.slice(x - 6, x + 7);
              this.tmp_l = response.data.data.tmp.slice(x - 6, x + 7);
              this.uv_l = response.data.data.uv.slice(x - 6, x + 7);
              this.humid_l = response.data.data.humid.slice(x - 6, x + 7);
              this.add_all();
            
          } else {
            if (response.data.err === "permission denied") {
              this.addName("");
              this.addEmail("");
              this.addStatus(false);
              this.addPermission(false);
              this.$router.push("/");
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getMonth() {
      this.C = false;
      axios
        .post("//localhost:8081/api/getMonth", {
          location: this.my_filter.location,
          inBuilding: this.my_filter.inBuilding,
          month: this.my_filter.month
        })
        .then(response => {
          console.log(response.data);
          if (response.data.confirm) {
            if (response.data.data !== null) {
              this.timelabel = response.data.data.time;
              this.wind_l = response.data.data.wind;
              this.tmp_l = response.data.data.tmp;
              this.uv_l = response.data.data.uv;
              this.humid_l = response.data.data.humid;
              this.add_all();
            } else console.log("not find");
          } else {
            if (response.data.err === "permission denied") {
              this.addName("");
              this.addEmail("");
              this.addStatus(false);
              this.addPermission(false);
              this.$router.push("/");
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getYear() {
      this.C = false;
      axios
        .post("//localhost:8081/api/getYear", {
          location: this.my_filter.location,
          inBuilding: this.my_filter.inBuilding,
          year: this.my_filter.year
        })
        .then(response => {
          console.log(response.data);
          if (response.data.confirm) {
            if (response.data.data !== null) {
              this.timelabel = response.data.data.time;
              this.wind_l = response.data.data.wind;
              this.tmp_l = response.data.data.tmp;
              this.uv_l = response.data.data.uv;
              this.humid_l = response.data.data.humid;
              this.add_all();
            } else console.log("not find");
          } else {
            if (response.data.err === "permission denied") {
              this.addName("");
              this.addEmail("");
              this.addStatus(false);
              this.addPermission(false);
              this.$router.push("/");
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCustom() {
      this.C = false;
      axios
        .post("//localhost:8081/api/getCustom", {
          location: this.my_filter.location,
          inBuilding: this.my_filter.inBuilding,
          typedate: this.my_filter.Range_Date,
          Ftime: this.my_filter.Ftime + ":00",
          Ttime: this.my_filter.Ttime + ":00"
        })
        .then(response => {
          console.log(response.data);
          if (response.data.confirm) {
            if (response.data.data !== null) {
              this.timelabel = response.data.data.time;
              this.wind_l = response.data.data.wind;
              this.tmp_l = response.data.data.tmp;
              this.uv_l = response.data.data.uv;
              this.humid_l = response.data.data.humid;
              this.add_all();
            } else console.log("not find");
          } else {
            if (response.data.err === "permission denied") {
              this.addName("");
              this.addEmail("");
              this.addStatus(false);
              this.addPermission(false);
              this.$router.push("/");
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addName(x) {
      store.commit("addName", x);
    },
    addEmail(x) {
      store.commit("addEmail", x);
    },
    addStatus(x) {
      store.commit("addStatus", x);
    },
    addPermission(x) {
      store.commit("addPermission", x);
    }
  }
};
</script>
<style>
.slider {
  width: 100%;
}
</style> 