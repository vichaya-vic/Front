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

      <b-row align-h="center" class="pt-3">
        <b-col sm="2" class="pt-1">เลือกวันที่ :</b-col >

        <b-col class="pt-1">
          <Flatpickr :options="DateOptions"  v-model="my_filter.typedate"/>
        </b-col>

        <b-col>
          <b-form-group>
            <b-form-radio-group buttons v-model="my_filter.inBuilding" :options="[{text:'ในอาคาร',value:true},{text:'นอกอาคาร',value:false}]" button-variant="outline-secondary"/>
          </b-form-group>
        </b-col>

        <b-col>
          <b-button  variant="success" v-on:click="Search">ค้นหา</b-button>
        </b-col>
      </b-row>
    </b-form-group> 
    
    <b-tabs v-if="show"> 
      <b-tab title="อุณหภูมิ" active>
        <b-row>
          <b-col>
            <range-slider class="slider pt-3 pl-3" :min=0 :max="timelabel.length-13" step="1" :disabled="false" v-on:input="OnSL" v-model="sliderValue" > </range-slider>
          </b-col>

          <b-col>
            <b-form-group>
              <b-form-radio-group buttons v-model="type_chart" :options="[{text:'กราฟเส้น',value:'line'},{text:'กราฟแท่ง',value:'bar'}]" button-variant="outline-secondary" class="pt-3"/>
            </b-form-group>
          </b-col>
        </b-row>

        <LC :width="1000" :chartData="this.dataa_tmp" :options="this.option" />
      </b-tab>
      
      <b-tab title="ความชื้น">
        <b-row>
          <b-col>
            <range-slider class="slider pt-3 pl-3" :min=0 :max="timelabel.length-13" step="1" :disabled="false" v-on:input="OnSL" v-model="sliderValue" > </range-slider>
          </b-col>

          <b-col>
            <b-form-group>
              <b-form-radio-group buttons v-model="type_chart" :options="[{text:'กราฟเส้น',value:'line'},{text:'กราฟแท่ง',value:'bar'}]" button-variant="outline-secondary" class="pt-3"/>
            </b-form-group>
          </b-col>
        </b-row>
        <LC :width="1000" :chartData="this.dataa_humid" :options="this.option" />
      </b-tab>

      <b-tab title="ดัชนี UV">
        <b-row>
          <b-col>
            <range-slider class="slider pt-3 pl-3" :min=0 :max="timelabel.length-13" step="1" :disabled="false" v-on:input="OnSL" v-model="sliderValue" > </range-slider>
          </b-col>

          <b-col>
            <b-form-group>
              <b-form-radio-group buttons v-model="type_chart" :options="[{text:'กราฟเส้น',value:'line'},{text:'กราฟแท่ง',value:'bar'}]" button-variant="outline-secondary" class="pt-3"/>
            </b-form-group>
          </b-col>
        </b-row>
        <LC :width="1000" :chartData="this.dataa_uv" :options="this.option" />
      </b-tab>

      <b-tab title="แรงลม">
        <b-row>
          <b-col>
            <range-slider class="slider pt-3 pl-3" :min=0 :max="timelabel.length-13" step="1" :disabled="false" v-on:input="OnSL" v-model="sliderValue" > </range-slider>
          </b-col>

          <b-col>
            <b-form-group>
              <b-form-radio-group buttons v-model="type_chart" v-on:input="change_chart" :options="[{text:'กราฟเส้น',value:'line'},{text:'กราฟแท่ง',value:'bar'}]" button-variant="outline-secondary" class="pt-3"/>
            </b-form-group>
          </b-col>
        </b-row>
        <LC :width="1000" :chartData="this.dataa_wind" :options="this.option" />
      </b-tab>
    </b-tabs>
  </div>  
</template>

<script>
import LC from "./LineChart.vue";
import RangeSlider from "vue-range-slider";
import "vue-range-slider/dist/vue-range-slider.css";
import "vue-flatpickr/theme/dark.css";
import axios from "axios";

var call = false;
export default {
  components: { LC, RangeSlider },
  beforeMount() {
    if (!this.Status) this.$router.push("/login");
    else {
      if (this.$route.params.location === undefined)
        this.my_filter.location = null;
      else {
        this.my_filter.location = this.$route.params.location;
        this.getDatas();
        this.show = true;
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
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{ ticks: { min: 0, max: 100 } }]
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
    change_chart() {
      this.OnSL();
    },
    Search() {
      if (this.my_filter.location != null) {
        this.getDatas();
        this.show = true;
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
    getDatas() {
      //setInterval(function(){   }, 3000);
      console.log(this.my_filter.typedate);
      axios.defaults.withCredentials = true;
      axios
        .post("//localhost:8081/api/getGraph", {
          location: this.my_filter.location,
          inBuilding: this.my_filter.inBuilding,
          typedate: this.my_filter.typedate
        })
        .then(response => {
          console.log(response.data);
          if (response.data.confirm) {
            if (response.data.data !== null) {
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
            }
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