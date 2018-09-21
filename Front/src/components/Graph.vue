<template>
  <div class="app flex-row align-items-center mt-5">
    <div class="container">
      <b-row>
        <b-col cols="1" class="pl-5"><b-img v-if="my_filter.location!=null" :src="require('../assets/flag-'+datas[datas.findIndex(x => x.location == my_filter.location)].outdoor.flag+'.png')" left width="40" height="40"/></b-col>
        <b-col cols="10">
          <b-form-group class="justify-content-md-center">
            <b-input-group>
              <b-form-select :options="locations" v-model="my_filter.location">
                <template slot="first"><option :value="null" disabled>-- กรุณาเลือกสถานที่ --</option></template>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row> 
    
      <b-tabs>
        <b-tab title="แสดงข้อมูลรายวัน" active v-on:click="clearData" >
          <b-row class="justify-content-center text-center" align-h="center" align-v="center">
            <b-col>
              <b-input-group class="mt-4">
                <div class="input-group-prepend"><div class="input-group-text"><b-img :src="require('../assets/calendar.png')" left width="20" height="20"/></div></div>
                <flat-pickr class="form-control" :config="config"  v-model="my_filter.typedate" ></flat-pickr>
              </b-input-group>
            </b-col>

            <b-col><b-form-radio-group class="mt-4" buttons v-model="my_filter.inBuilding" :options="[{text:'ในอาคาร',value:true},{text:'นอกอาคาร',value:false}]" button-variant="outline-secondary"/></b-col>
            <b-col><b-button class="mt-4" variant="info" v-on:click="Search('Day')">ค้นหา</b-button></b-col>
          </b-row>

          <b-row v-if="show&&!showAlert" align-h="center" align-v="center"><range-slider class="slider mt-4" :min=0 :max="timelabel.length-13" step="1" :disabled="false" v-on:input="OnSL" v-model="sliderValue" > </range-slider></b-row>
        </b-tab>

        <b-tab title="แสดงข้อมูลรายเดือน" v-on:click="clearData">
          <b-row class="justify-content-center text-center" align-h="center" align-v="center"> 
            <b-col>
              <b-input-group class="mt-4">
                <div class="input-group-prepend"><div class="input-group-text"><b-img :src="require('../assets/calendar.png')" left width="20" height="20"/></div></div>
                <b-form-select :options="db_month" v-model="my_filter.month">
                  <template slot="first">
                    <option :value="null" disabled>-- กรุณาเลือกเดือน --</option>
                  </template>
                </b-form-select>
              </b-input-group>
            </b-col>
            <b-col><b-form-radio-group class="mt-4" buttons v-model="my_filter.inBuilding" :options="[{text:'ในอาคาร',value:true},{text:'นอกอาคาร',value:false}]" button-variant="outline-secondary"/></b-col>
            <b-col><b-button class="mt-4" variant="info" v-on:click="Search('Month')">ค้นหา</b-button></b-col>
          </b-row>
        </b-tab>
       
        <b-tab title="แสดงข้อมูลรายปี" v-on:click="clearData">
          <b-row class="justify-content-center text-center" align-h="center" align-v="center">
            <b-col>
              <b-input-group class="mt-4">
                <div class="input-group-prepend"><div class="input-group-text"><b-img :src="require('../assets/calendar.png')" left width="20" height="20"/></div></div>
                <b-form-input type="text" v-model="my_filter.year" placeholder="กรุณาระบุปี ค.ศ."></b-form-input> 
              </b-input-group>
            </b-col>
            <b-col><b-form-radio-group class="mt-4" buttons v-model="my_filter.inBuilding" :options="[{text:'ในอาคาร',value:true},{text:'นอกอาคาร',value:false}]" button-variant="outline-secondary"/></b-col>
            <b-col><b-button class="mt-4" variant="info" v-on:click="Search('Year')">ค้นหา</b-button></b-col>
        </b-row>
      </b-tab>

      <b-tab title="แสดงข้อมูลแบบกำหนดเอง" v-on:click="clearData" >
        <b-row class="justify-content-center text-center" align-h="center" align-v="center">
            <b-col>
              <b-input-group class="mt-4">
                <div class="input-group-prepend"><div class="input-group-text"><b-img :src="require('../assets/calendar.png')" left width="20" height="20"/></div></div>
                <flat-pickr class="form-control" :config="Range_T"  v-model="my_filter.Range_Date" placeholder="กรุณาระบุช่วงวัน" ></flat-pickr>
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group class="mt-4">
                <div class="input-group-prepend"><div class="input-group-text"><b-img :src="require('../assets/time.png')" left width="20" height="20"/></div></div>
                <flat-pickr class="form-control" :config="timeOptions"  v-model="my_filter.Ftime" placeholder="เวลาเริ่มต้น"></flat-pickr>
                <div class="input-group-prepend"><div class="input-group-text"><b-img :src="require('../assets/to.png')" left width="20" height="20"/></div></div>
                <flat-pickr class="form-control" :config="timeOptions"  v-model="my_filter.Ttime" placeholder="เวลาสิ้นสุด"></flat-pickr>
              </b-input-group>
            </b-col>
            <b-col cols="2"><b-form-radio-group class="mt-4" buttons v-model="my_filter.inBuilding" :options="[{text:'ในอาคาร',value:true},{text:'นอกอาคาร',value:false}]" button-variant="outline-secondary"/></b-col>
            <b-col cols="1"><b-button class="mt-4 ml-3" variant="info" v-on:click="Search('Custom')">ค้นหา</b-button></b-col>
            <b-col cols="1"><b-button class="mt-4 p-2" variant="success" v-on:click="getCSV"><b-img :src="require('../assets/download.png')" left width="20" height="20"/></b-button></b-col>
        </b-row>
      </b-tab>    
    </b-tabs>

    <b-container v-if="show&&!showAlert">
      <b-row>
          <b-col>
            <b-form-group>
              <b-form-radio-group buttons v-model="type_chart" :options="[{text:'กราฟเส้น',value:'line'},{text:'กราฟแท่ง',value:'bar'}]" button-variant="outline-secondary" class="pt-3" v-on:input="add_all"/>
            </b-form-group>
          </b-col>
      </b-row>

      <b-card-group>
        <b-row class="justify-content-center text-center">
          <b-col lg="6" class="mb-4">
            <b-card no-body>
              <b-card-header><h5 class="font-weight-bold">รังสี UV</h5></b-card-header>
              <b-card-body>
                <LC class="LineC" :chartData="this.dataa_uv" :options="this.option" />
              </b-card-body>
            </b-card>
          </b-col>

          <b-col lg="6" class="mb-4">
            <b-card no-body>
              <b-card-header><h5 class="font-weight-bold">อุณหภูมิ</h5></b-card-header>
              <b-card-body>
                <LC :chartData="this.dataa_tmp" :options="this.option" />
              </b-card-body>
            </b-card>
            </b-col>

          <b-col lg="6" class="mb-4">
            <b-card no-body>
              <b-card-header><h5 class="font-weight-bold">แรงลม</h5></b-card-header>
              <b-card-body>
                <LC :chartData="this.dataa_wind" :options="this.option" />
              </b-card-body>
            </b-card>
          </b-col>

          <b-col lg="6" class="mb-4">
            <b-card no-body>
              <b-card-header><h5 class="font-weight-bold">ความชื้น</h5></b-card-header>
              <b-card-body>
                <LC :chartData="this.dataa_humid" :options="this.option" />
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-card-group>
    </b-container>

    <b-alert variant="danger" class="mt-4" dismissible :show="showAlert" @dismissed="showAlert=false">
      ไม่พบข้อมูลนี้ในระบบ
    </b-alert>
  </div> 
  </div> 
</template>

<script>
import LC from "./LineChart.vue";
import RangeSlider from "vue-range-slider";
import flatPickr from "vue-flatpickr-component";
import "vue-range-slider/dist/vue-range-slider.css";
import axios from "axios";

var url = require("../config").url;
var call = false;

export default {
  components: { LC, RangeSlider, flatPickr },
  beforeMount() {
    if (!this.Status) this.$router.push("/login");
    else {
      this.getLocations();
    }
  },
  data() {
    return {
      locations: [],
      datas: [],
      show: false,
      showAlert: false,
      my_filter: {
        location: null,
        inBuilding: true,
        typedate: new Date().toLocaleDateString(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        Ftime: "12:00",
        Ttime: "12:00",
        Range_Date: null
      },
      db_month: [
        { text: "มกราคม", value: 1 },
        { text: "กุมภาพันธ์", value: 2 },
        { text: "มีนาคม", value: 3 },
        { text: "เมษายน", value: 4 },
        { text: "พฤษภาคม", value: 5 },
        { text: "มิถุนายน", value: 6 },
        { text: "กรกฎาคม", value: 7 },
        { text: "สิงหาคม", value: 8 },
        { text: "กันยายน", value: 9 },
        { text: "ตุลาคม", value: 10 },
        { text: "พฤศจิกายน", value: 11 },
        { text: "ธันวาคม", value: 12 }
      ],
      config: {
        //mode: "range",
        dateFormat: "m/d/Y",
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
                // min: 0,
                // max: 100,
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
      form_data: {
        humid: [],
        uv: [],
        tmp: [],
        wind: [],
        time: []
      }
    };
  },
  computed: {
    Status() {
      return store.state.status;
    }
  },
  methods: {
    clearData() {
      this.show = false;
      this.showAlert = false;
    },
    Search(m) {
      if (this.my_filter.location != null) {
        if (m === "Day") this.getDay();
        else if (m === "Month") this.getMonth();
        else if (m === "Year") this.getYear();
        else if (m === "Custom") this.getCustom();
      }
    },
    OnSL() {
      this.timelabel = this.form_data.time;
      this.dataa_uv = {
        labels: this.timelabel.slice(this.sliderValue, this.sliderValue + 13),
        datasets: [
          {
            label: "UV",
            borderColor: "Tomato",
            pointBackgroundColor: "Tomato",
            borderWidth: 3,
            pointBorderColor: "Tomato",
            backgroundColor:
              this.type_chart == "line" ? this.gradient : "Tomato",
            data: this.form_data.uv.slice(
              this.sliderValue,
              this.sliderValue + 13
            ),
            type: this.type_chart
          }
        ]
      };
      this.dataa_tmp = {
        labels: this.timelabel.slice(this.sliderValue, this.sliderValue + 13),
        datasets: [
          {
            label: "Temperature",
            borderColor: "DodgerBlue",
            pointBackgroundColor: "DodgerBlue",
            borderWidth: 3,
            pointBorderColor: "DodgerBlue",
            backgroundColor:
              this.type_chart == "line" ? this.gradient : "DodgerBlue",
            data: this.form_data.tmp.slice(
              this.sliderValue,
              this.sliderValue + 13
            ),
            type: this.type_chart
          }
        ]
      };
      this.dataa_wind = {
        labels: this.timelabel.slice(this.sliderValue, this.sliderValue + 13),
        datasets: [
          {
            label: "Wind",
            borderColor: "Orange",
            pointBackgroundColor: "Orange",
            borderWidth: 3,
            pointBorderColor: "Orange",
            backgroundColor:
              this.type_chart == "line" ? this.gradient : "Orange",
            data: this.form_data.wind.slice(
              this.sliderValue,
              this.sliderValue + 13
            ),
            type: this.type_chart
          }
        ]
      };
      this.dataa_humid = {
        labels: this.timelabel.slice(this.sliderValue, this.sliderValue + 13),
        datasets: [
          {
            label: "humid",
            borderColor: "MediumSeaGreen",
            pointBackgroundColor: "MediumSeaGreen",
            borderWidth: 3,
            pointBorderColor: "MediumSeaGreen",
            backgroundColor:
              this.type_chart == "line" ? this.gradient : "MediumSeaGreen",
            data: this.form_data.humid.slice(
              this.sliderValue,
              this.sliderValue + 13
            ),
            type: this.type_chart
          }
        ]
      };
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
            data: this.uv_l,
            type: this.type_chart
          }
        ]
      };
    },
    add_tmp() {
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
            data: this.tmp_l,
            type: this.type_chart
          }
        ]
      };
    },
    add_wind() {
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
            data: this.wind_l,
            type: this.type_chart
          }
        ]
      };
    },
    add_humid() {
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
            data: this.humid_l,
            type: this.type_chart
          }
        ]
      };
    },
    add_all() {
      this.add_uv();
      this.add_tmp();
      this.add_wind();
      this.add_humid();
    },
    getLocations() {
      axios.defaults.withCredentials = true;
      axios
        .post(url + "/api/getDatas")
        .then(response => {
          if (response.data.confirm) {
            var locations = [];
            var datas = [];
            for (var i = 0; i < response.data.datas.length; i++) {
              locations.push(response.data.datas[i].location);
              datas.push(response.data.datas[i]);
            }
            this.locations = locations;
            this.datas = datas;
            if (this.$route.params.key === undefined) {
              this.my_filter.location = null;
            } else {
              this.my_filter.location =
                response.data.datas[
                  response.data.datas.findIndex(
                    x => x.key == this.$route.params.key
                  )
                ].location;
              this.show = true;
              this.getDay();
            }
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
        .post(url + "/api/getDay", {
          location: this.my_filter.location,
          inBuilding: this.my_filter.inBuilding,
          typedate: this.my_filter.typedate
        })
        .then(response => {
          console.log(response.data);
          if (response.data.confirm) {
            this.form_data.time = response.data.data.time;
            this.form_data.uv = response.data.data.uv;
            this.form_data.tmp = response.data.data.tmp;
            this.form_data.humid = response.data.data.humid;
            this.form_data.wind = response.data.data.wind;
            var x = 24;

            this.timelabel = response.data.data.time.slice(x - 6, x + 7);
            this.wind_l = response.data.data.wind.slice(x - 6, x + 7);
            this.tmp_l = response.data.data.tmp.slice(x - 6, x + 7);
            this.uv_l = response.data.data.uv.slice(x - 6, x + 7);
            this.humid_l = response.data.data.humid.slice(x - 6, x + 7);
            this.add_all();
            this.show = true;
            this.showAlert = false;
          } else {
            if (response.data.err === "permission denied") {
              this.addName("");
              this.addEmail("");
              this.addStatus(false);
              this.addPermission(false);
              this.$router.push("/");
            } else if (response.data.err === "no data") {
              this.show = false;
              this.showAlert = true;
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
        .post(url + "/api/getMonth", {
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
              this.sliderValue = 0;
              this.add_all();
              this.show = true;
              this.showAlert = false;
            }
          } else {
            if (response.data.err === "permission denied") {
              this.addName("");
              this.addEmail("");
              this.addStatus(false);
              this.addPermission(false);
              this.$router.push("/");
            } else if (response.data.err === "no data") {
              this.show = false;
              this.showAlert = true;
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
        .post(url + "/api/getYear", {
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
              this.show = true;
              this.showAlert = false;
            }
          } else {
            if (response.data.err === "permission denied") {
              this.addName("");
              this.addEmail("");
              this.addStatus(false);
              this.addPermission(false);
              this.$router.push("/");
            } else if (response.data.err === "no data") {
              this.show = false;
              this.showAlert = true;
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
        .post(url + "/api/getCustom", {
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
              this.show = true;
              this.showAlert = false;
            }
          } else {
            if (response.data.err === "permission denied") {
              this.addName("");
              this.addEmail("");
              this.addStatus(false);
              this.addPermission(false);
              this.$router.push("/");
            } else if (response.data.err === "no data") {
              this.show = false;
              this.showAlert = true;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCSV() {
      let csvContent = "data:text/csv;charset=utf-8,";
      var tmp_csv = [];
      console.log("timelen = " + this.timelabel.length);
      csvContent += "date,uv,wind,temperature,humid" + "\r\n";
      for (var i = 0; i < this.timelabel.length; i++) {
        let x = [];
        x[0] = this.timelabel[i];
        x[1] = this.uv_l[i];
        x[2] = this.wind_l[i];
        x[3] = this.tmp_l[i];
        x[4] = this.humid_l[i];
        tmp_csv.push(x);
        console.log("x=" + x);
      }
      console.log(tmp_csv);
      tmp_csv.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "my_data.csv");
      document.body.appendChild(link); // Required for FF
      link.click();
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