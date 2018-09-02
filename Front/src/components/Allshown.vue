<template>
  <div style="margin:5%">
    <b-form-group class="justify-content-md-center" style="margin-left:15%;margin-right:15%">
      <b-input-group>
          <b-form-select v-model="selected" :options="locations">
            <template slot="first">
                <option :value="null" disabled>-- กรุณาเลือกสถานที่ --</option>
            </template>
          </b-form-select>
          <b-button v-on:click="toGraph(selected)" variant="info">ค้นหา</b-button>
          <b-button v-if="Permission" v-on:click="showModal('modal1')" variant="danger" class="ml-1 px-3">เพิ่ม</b-button>
          <b-button v-if="Permission" v-on:click="gendata" variant="danger" class="ml-1 px-3">จำลอง</b-button>
      </b-input-group>
    </b-form-group>

    <b-container class="justify-content-md-center">
      <b-row>
        <b-col col sm="12" md="5" lg="4" v-for="i in locations.length" v-bind:key="i">
          <b-button style="width:100%" size="md" class="p-0 mt-5" variant="outline-info" v-on:click="toGraph(locations[i-1])">
            <b-card-body>
              <b-col>
                <h4>{{locations[i-1]}}</h4>
              </b-col>
              <hr class="my-4">
                <b-row>
                  <b-col sm="4" md="4" lg="4" col cols="3">
                    <h5><b-badge :variant="datas[datas.findIndex(x=>x.location==locations[i-1])].indoor.flag">สีธง</b-badge></h5>
                  </b-col>

                  <b-col sm="4" md="4" lg="4" col cols="5"></b-col>

                  <b-col sm="4" md="4" lg="4" col cols="3">
                    <h5><b-badge :variant="datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor.flag">สีธง</b-badge></h5>
                  </b-col>
                </b-row>
              <b-row align-h="center">
                <b-col sm="4" md="4" lg="4" col cols="3" class="text-center">ในอาคาร</b-col>
                <b-col sm="4" md="4" lg="4" col cols="5" class="text-center"></b-col>
                <b-col sm="4" md="4" lg="4" col cols="3" class="text-center">นอกอาคาร</b-col>
              </b-row>
              <b-row align-h="center">
                <b-col sm="4" md="4" lg="4" col cols="3" class="text-center">{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor.temperature}}</b-col>
                <b-col sm="4" md="4" lg="4" col cols="5" class="text-center">อุณหภูมิ °C</b-col>
                <b-col sm="4" md="4" lg="4" col cols="3" class="text-center">{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor.temperature}}</b-col>
              </b-row>
              <b-row align-h="center">
                <b-col sm="4" md="4" lg="4" col cols="3" class="text-center">{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor.humidity}}</b-col>
                <b-col sm="4" md="4" lg="4" col cols="5" class="text-center">ความชื้น %</b-col>
                <b-col sm="4" md="4" lg="4" col cols="3" class="text-center">{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor.humidity}}</b-col>
              </b-row>
              <b-row align-h="center">
                <b-col sm="4" md="4" lg="4" col cols="3" class="text-center">{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor.uv}}</b-col>
                <b-col sm="4" md="4" lg="4" col cols="5" class="text-center">ดัชนี UV</b-col>
                <b-col sm="4" md="4" lg="4" col cols="3" class="text-center">{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor.uv}}</b-col>
              </b-row>
              <b-row align-h="center">
                <b-col sm="4" md="4" lg="4" col cols="3" class="text-center">{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor.wind}}</b-col>
                <b-col sm="4" md="4" lg="4" col cols="5" class="text-center">แรงลม กม./ชม.</b-col>
                <b-col sm="4" md="4" lg="4" col cols="3" class="text-center">{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor.wind}}</b-col>
              </b-row>
            </b-card-body>
            <b-card-footer class="text-right bg-light py-0">
              <small class="text-muted font-italic font-weight-light" style="height: 20%">
                ข้อมูลเมื่อ (ในร่ม) {{showTime(datas[datas.findIndex(x=>x.location==locations[i-1])].indoor.time)}}<br>
                (กลางแจ้ง) {{showTime(datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor.time)}}
              </small>
            </b-card-footer>
          </b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-modal lazy ref="modal1" size="md" class="text-center" title="เพิ่มสถานที่">
      <b-row align-v="center" class="p-2">
        <b-col sm="3">ชื่อสถานที่ : </b-col >
        <b-col>           
          <b-input v-model="location" size="md" required type="text"></b-input>
        </b-col >
      </b-row>
      <div slot="modal-footer">
        <b-btn size="sm" class="px-3" variant="primary" v-on:click="addLocation('modal1')">
          เพิ่ม
        </b-btn>
        <b-btn size="sm" variant="secondary" v-on:click="hideModal('modal1')">
          ยกเลิก
        </b-btn>
      </div>
    </b-modal>

    <b-modal lazy ref="modal2" size="sm" class="text-center" body-text-variant="success" hide-header hide-footer>
      เพิ่ม "{{location}}" เรียบร้อย
    </b-modal>

    <b-modal lazy ref="modal3" size="sm" class="text-center" body-text-variant="danger" hide-header hide-footer>
      มี "{{location}}" ในระบบแล้ว
    </b-modal>
  </div>
</template>

<script>
import store from "../vuex/store.js";
import Vuex from "vuex";
import axios from "axios";
global.vuex = Vuex;

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
      confirm: false
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
        .post("http://pc.devinice.com:1111/api/getDatas")
        .then(response => {
          if (response.data.confirm) {
            this.datas = response.data.datas;
            this.locations = response.data.datas.map(function(obj) {
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
    toGraph(s) {
      if (s != null) {
        this.$router.push("/graph/" + s);
      }
    },
    showTime(t) {
      if (t === null) return "ไม่พบข้อมูล";
      else return new Date(t).toLocaleString();
    },
    addLocation(m) {
      if (this.location.replace(/ /g, "").length > 0) {
        //connect to DB//
        axios.defaults.withCredentials = true;
        axios
          .post("http://pc.devinice.com:1111/api/newLocation", { location: this.location })
          .then(response => {
            console.log(response.data);
            if (response.data.confirm) {
              this.hideModal(m);
              this.showModal("modal2");
              this.getDatas();
            } else {
              if (response.data.confirm === "permission denied") {
                this.addName("");
                this.addEmail("");
                this.addStatus(false);
                this.addPermission(false);
                this.$router.push("/");
              } else if (response.data.confirm === "Same Collection!") {
                this.hideModal(m);
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
    },
    gendata() {
      for (var i = 1; i <= 31; i++) {
        axios
          .post("//pc.devinice.com:1111/api/test", {
            location: "หน่วยฝึกทหารใหม่ที่ 1 พัน.บร.กบร.กช.(ค่ายภาณุรังษี)",
            inBuilding: true,
            date: "2018/08/" + i,
            data: {
              uv: 1,
              wind: 1,
              humidity: 1,
              temperature: 1
            }
          })
          .then(response => {});
      }
    },
  }
};
</script>

<style>
h4 {
    overflow:hidden;
    white-space:nowrap;
    -ms-text-overflow:ellipsis;
    text-overflow:ellipsis;
    width:100%;
}
</style>