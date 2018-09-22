<template>
  <div class="app flex-row align-items-center my-5" style="min-height:500px">
    <div class="container">
      <b-form-group class="text-center" style="margin-left:15%;margin-right:15%">
        <b-input-group>
          <b-form-select v-model="selected" :options="locations">
            <template slot="first">
                <option :value="null" disabled>========== กรุณาเลือกสถานที่ ==========</option>
            </template>
          </b-form-select>

          <b-button v-on:click="toGraph(selected)" variant="info" v-b-tooltip.hover title="ค้นหา"><b-img :src="require('../assets/search.png')" center width="20" height="20"/></b-button>

          <b-dropdown variant="success" no-caret class="ml-1" v-b-tooltip.hover title="ค้นหาธง">
            <template slot="button-content">
              <b-img :src="require('../assets/flag.png')" center width="20" height="20"/>
            </template>
            <b-dropdown-item v-on:click="getFilter(null)">
              <b-row>
                <b-col cols="2">
                  <b-img :src="require('../assets/flag-all.png')" left width="20" height="20"/>
                </b-col>
                <b-col cols="4">ธงทั้งหมด</b-col>
              </b-row>
            </b-dropdown-item>
            <b-dropdown-item v-on:click="getFilter('dark')">
              <b-row>
                <b-col cols="2">
                  <b-img :src="require('../assets/flag-dark.png')" left width="20" height="20"/>
                </b-col>
                <b-col cols="4">ธงสีดำ</b-col>
              </b-row>
            </b-dropdown-item>
            <b-dropdown-item v-on:click="getFilter('danger')">
              <b-row>
                <b-col cols="2">
                  <b-img :src="require('../assets/flag-danger.png')" left width="20" height="20"/>
                </b-col>
                <b-col cols="4">ธงสีแดง</b-col>
              </b-row>
            </b-dropdown-item>
            <b-dropdown-item v-on:click="getFilter('warning')">
              <b-row>
                <b-col cols="2">
                  <b-img :src="require('../assets/flag-warning.png')" left width="20" height="20"/>
                </b-col>
                <b-col cols="4">ธงสีเหลือง</b-col>
              </b-row>
            </b-dropdown-item>
            <b-dropdown-item v-on:click="getFilter('success')">
              <b-row>
                <b-col cols="2">
                  <b-img :src="require('../assets/flag-success.png')" left width="20" height="20"/>
                </b-col>
                <b-col cols="4">ธงสีเขียว</b-col>
              </b-row>
            </b-dropdown-item>
            <b-dropdown-item v-on:click="getFilter('light')">
              <b-row>
                <b-col cols="2">
                  <b-img :src="require('../assets/flag-light.png')" left width="20" height="20"/>
                </b-col>
                <b-col cols="4">ธงสีขาว</b-col>
              </b-row>
            </b-dropdown-item>
            <b-dropdown-item v-if="Permission" v-on:click="getFilter('secondary')">
              <b-row>
                <b-col cols="2">
                  <b-img :src="require('../assets/flag-secondary.png')" left width="20" height="20"/>
                </b-col>
                <b-col cols="4">ตรวจสอบ</b-col>
              </b-row>
            </b-dropdown-item>
          </b-dropdown>

          <b-button v-if="Permission" v-on:click="showModal('modal1')" variant="info" class="ml-4" v-b-tooltip.hover title="เพิ่มสถานที่"><b-img :src="require('../assets/add.png')" center width="20" height="20"/></b-button>
          <b-button v-if="Permission&&mode" v-on:click="mode=false" variant="danger" class="ml-1" v-b-tooltip.hover title="ลบสถานที่"><b-img :src="require('../assets/delete.png')" center width="20" height="20"/></b-button>
          <b-button v-if="Permission&&!mode" v-on:click="mode=true" variant="success" class="ml-1" v-b-tooltip.hover title="ดูข้อมูล"><b-img :src="require('../assets/data.png')" center width="20" height="20"/></b-button>
        </b-input-group>
      </b-form-group>

      <b-alert class="mt-5" variant="danger" dismissible :show="datas.length===0" @dismissed="datas.length!=0">ไม่พบข้อมูล</b-alert>
  
      <b-row class="justify-content-center text-center" v-if="mode">
        <b-col cols="12" sm="6" md="6" lg="4" v-for="i in datas.length" v-bind:key="i">
          <b-button :variant="datas[i-1].outdoor.flag" style="width:100%;" class="p-0 mt-5" v-on:click="toGraph(datas[i-1].location)" v-b-tooltip.hover :title="datas[i-1].location">
            <b-card-body class="clearfix">
              <h4 class="font-weight-bold" v-for="j in datas[i-1].name" v-bind:key="j">{{j}}</h4>
              <hr class="my-4">

              <b-row align-h="center" align-v="center">
                <b-col class="text-center font-weight-bold">ในอาคาร</b-col>
                <b-col class="text-center"></b-col>
                <b-col class="text-center font-weight-bold">นอกอาคาร</b-col>
              </b-row>

              <b-row align-h="center" align-v="center">
                <b-col class="text-center font-weight-bold">{{datas[i-1].indoor.temperature}}</b-col>
                <b-col col class="my-2"><b-img :src="require('../assets/temperature.png')" center width="30" height="30"/></b-col>
                <b-col class="text-center font-weight-bold">{{datas[i-1].outdoor.temperature}}</b-col>
              </b-row>

              <b-row align-h="center" align-v="center">
                <b-col class="text-center font-weight-bold">{{datas[i-1].indoor.humidity}}</b-col>
                <b-col col class="my-2"><b-img :src="require('../assets/humidity.png')" center width="30" height="30"/></b-col>
                <b-col class="text-center font-weight-bold">{{datas[i-1].outdoor.humidity}}</b-col>
              </b-row>

              <b-row align-h="center" align-v="center">
                <b-col class="text-center font-weight-bold">{{datas[i-1].indoor.uv}}</b-col>
                <b-col col class="my-2"><b-img :src="require('../assets/uv.png')" center width="30" height="30"/></b-col>
                <b-col class="text-center font-weight-bold">{{datas[i-1].outdoor.uv}}</b-col>
              </b-row>

              <b-row align-h="center" align-v="center">
                <b-col class="text-center font-weight-bold">{{datas[i-1].indoor.wind}}</b-col>
                <b-col col class="my-2"><b-img :src="require('../assets/wind.png')" center width="30" height="30"/></b-col>
                <b-col class="text-center font-weight-bold">{{datas[i-1].outdoor.wind}}</b-col>
              </b-row>
            </b-card-body>

            <b-card-footer class="text-right py-0">
              <small class="font-italic font-weight-light">
                (ในอาคาร) {{showTime(datas[i-1].indoor.time)}}<br>
                (นอกอาคาร) {{showTime(datas[i-1].outdoor.time)}}
              </small>
            </b-card-footer>
          </b-button>
        </b-col>
      </b-row>

      <b-row class="justify-content-center text-center" v-if="!mode">
        <b-col cols="12" sm="6" md="6" lg="4" v-for="i in datas.length" v-bind:key="i">
          <b-card style="width:100%" class="p-0 mt-5" no-body bg-variant="light">
            <div class="text-right">
              <b-button v-if="Permission" variant="light" v-on:click="showDel(datas[i-1].location)"><b-img :src="require('../assets/cross.png')" center width="20" height="20"/></b-button>
            </div>
            
            <b-card-body class="clearfix pt-0">
              <h4 class="font-weight-bold" v-for="j in datas[i-1].name" v-bind:key="j">{{j}}</h4>
              <hr class="my-4">

              <b-row align-h="center" align-v="center">
                <b-col class="text-center font-weight-bold">ในอาคาร</b-col>
                <b-col class="text-center"></b-col>
                <b-col class="text-center font-weight-bold">นอกอาคาร</b-col>
              </b-row>

              <b-row align-h="center" align-v="center">
                <b-col class="text-center font-weight-bold">{{datas[i-1].indoor.temperature}}</b-col>
                <b-col col class="my-2"><b-img :src="require('../assets/temperature.png')" center width="30" height="30"/></b-col>
                <b-col class="text-center font-weight-bold">{{datas[i-1].outdoor.temperature}}</b-col>
              </b-row>

              <b-row align-h="center" align-v="center">
                <b-col class="text-center font-weight-bold">{{datas[i-1].indoor.humidity}}</b-col>
                <b-col col class="my-2"><b-img :src="require('../assets/humidity.png')" center width="30" height="30"/></b-col>
                <b-col class="text-center font-weight-bold">{{datas[i-1].outdoor.humidity}}</b-col>
              </b-row>

              <b-row align-h="center" align-v="center">
                <b-col class="text-center font-weight-bold">{{datas[i-1].indoor.uv}}</b-col>
                <b-col col class="my-2"><b-img :src="require('../assets/uv.png')" center width="30" height="30"/></b-col>
                <b-col class="text-center font-weight-bold">{{datas[i-1].outdoor.uv}}</b-col>
              </b-row>

              <b-row align-h="center" align-v="center">
                <b-col class="text-center font-weight-bold">{{datas[i-1].indoor.wind}}</b-col>
                <b-col col class="my-2"><b-img :src="require('../assets/wind.png')" center width="30" height="30"/></b-col>
                <b-col class="text-center font-weight-bold">{{datas[i-1].outdoor.wind}}</b-col>
              </b-row>
            </b-card-body>

            <b-card-footer class="text-right py-0">
              <small class="font-italic font-weight-light">
                (ในอาคาร) {{showTime(datas[i-1].indoor.time)}}<br>
                (นอกอาคาร) {{showTime(datas[i-1].outdoor.time)}}
              </small>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>

      <b-modal lazy ref="modal1" size="md" class="text-center" title="เพิ่มสถานที่">
        <b-row align-v="center" class="p-2">
          <b-col sm="3">ชื่อสถานที่ : </b-col >
          <b-col>           
            <b-input @keyup.enter.native="addLocation" v-model="location" size="md" required type="text"></b-input>
          </b-col >
        </b-row>
        <div slot="modal-footer">
          <b-button size="sm" class="px-3" variant="primary" v-on:click="addLocation">เพิ่ม</b-button>
          <b-button size="sm" variant="secondary" v-on:click="hideModal('modal1')">ยกเลิก</b-button>
        </div>
      </b-modal>
      <b-modal lazy ref="modal2" size="sm" class="text-center" body-text-variant="success" hide-header hide-footer>เพิ่ม "{{location}}" เรียบร้อย</b-modal>
      <b-modal lazy ref="modal3" size="sm" class="text-center" body-text-variant="danger" hide-header hide-footer>มี "{{location}}" ในระบบแล้ว</b-modal>

      <b-modal lazy ref="modal4" size="md" class="text-center" hide-header>
        ต้องการลบ "{{location}}" ใช่หรือไม่
        <div slot="modal-footer">
          <b-button size="sm" variant="secondary" v-on:click="hideModal('modal4')">ยกเลิก</b-button>
          <b-button size="sm" class="px-3" variant="danger" v-on:click="delLocation">ลบ</b-button>
        </div>
      </b-modal>
      <b-modal lazy ref="modal5" size="sm" class="text-center" body-text-variant="success" hide-header hide-footer>ลบ "{{location}}" เรียบร้อย</b-modal>
    </div>
  </div>
</template>
<script>
import store from "../vuex/store.js";
import Vuex from "vuex";
import axios from "axios";
global.vuex = Vuex;
var url = require("../config").url;

export default {
  beforeMount() {
    if (!this.Status) this.$router.push("/login");
    else this.getDatas();
  },
  data() {
    return {
      location: "",
      locations: [],
      datas: [],
      selected: null,
      filter: null,
      mode: true
    };
  },
  computed: {
    Status() {
      return store.state.status;
    },
    Permission() {
      return store.state.permission;
    }
  },
  methods: {
    getDatas() {
      axios.defaults.withCredentials = true;
      axios
        .post(url + "/api/getDatas")
        .then(response => {
          if (response.data.confirm) {
            var locations = [];
            var datas = [];
            for (var i = 0; i < response.data.datas.length; i++) {
              locations.push(response.data.datas[i].location);
              if (
                response.data.datas[i].outdoor.flag === this.filter ||
                this.filter === null
              ) {
                if (response.data.datas[i].outdoor.flag === "secondary") {
                  if (this.Permission) {
                    var temp = response.data.datas[i];
                    temp.name = temp.location.split(" ");
                    datas.push(temp);
                  }
                } else {
                  var temp = response.data.datas[i];
                  temp.name = temp.location.split(" ");
                  datas.push(temp);
                }
              }
            }
            this.locations = locations;
            this.datas = datas;
            console.log(this.datas);
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
    getFilter(f) {
      this.filter = f;
      this.getDatas();
    },
    toGraph(s) {
      if (s != null) {
        this.$router.push(
          "/graph/" + this.datas[this.datas.findIndex(x => x.location == s)].key
        );
      }
    },
    showTime(t) {
      if (t === null) return "ไม่พบข้อมูล";
      else return new Date(t).toLocaleString();
    },
    addLocation() {
      if (this.location.replace(/ /g, "").length > 0) {
        //connect to DB//
        axios.defaults.withCredentials = true;
        axios
          .post(url + "/api/newLocation", { location: this.location })
          .then(response => {
            console.log(response.data);
            if (response.data.confirm) {
              this.hideModal("modal1");
              this.showModal("modal2");
              this.getDatas();
            } else {
              if (response.data.err === "permission denied") {
                this.addName("");
                this.addEmail("");
                this.addStatus(false);
                this.addPermission(false);
                this.$router.push("/");
              } else if (response.data.err === "Same Collection!") {
                this.hideModal("modal1");
                this.showModal("modal3");
                this.getDatas();
              }
            }
          })
          .catch(e => {
            console.error(e);
          });
      }
    },
    delLocation() {
      axios.defaults.withCredentials = true;
      axios
        .post(url + "/api/delLocation", { location: this.location })
        .then(response => {
          console.log(response.data);
          if (response.data.confirm) {
            this.hideModal("modal4");
            this.showModal("modal5");
            this.getDatas();
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
        .catch(e => {
          console.error(e);
        });
    },
    showDel(l) {
      this.location = l;
      this.showModal("modal4");
    },
    showModal(m) {
      if (m === "modal1") this.location = "";
      this.$refs[m].show();
    },
    hideModal(m) {
      this.$refs[m].hide();
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
h4 {
  overflow: hidden;
  white-space: nowrap;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  width: 100%;
}
</style>