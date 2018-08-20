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
          <b-button v-on:click="showModal('modal1')" variant="danger" class="ml-1 px-3">เพิ่ม</b-button>
      </b-input-group>
    </b-form-group>

    <b-form class="row justify-content-md-center  pt-5"> 
      <b-button-toolbar class="col justify-content-md-center pb-5" v-for="i in locations.length" v-bind:key="i">
        <b-button class="p-0" variant="outline-info" v-on:click="toGraph(locations[i-1])">
          <b-card-body :title="locations[i-1]">
            <hr class="my-4">
            <b-row align-h="center">
              <b-col>ในร่ม</b-col>
              <b-col></b-col>
              <b-col>กลางแจ้ง</b-col>
            </b-row>
            <b-row align-h="center">
              <b-col>{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].temperature}}</b-col>
              <b-col>อุณหภูมิ</b-col>
              <b-col>{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].temperature}}</b-col>
            </b-row>
            <b-row align-h="center">
              <b-col>{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].humidity}}</b-col>
              <b-col>ความชื้น</b-col>
              <b-col>{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].humidity}}</b-col>
            </b-row>
            <b-row align-h="center">
              <b-col>{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].uv}}</b-col>
              <b-col>รังสี UV</b-col>
              <b-col>{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].uv}}</b-col>
            </b-row>
            <b-row align-h="center">
              <b-col>{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].wind}}</b-col>
              <b-col>แรงลม</b-col>
              <b-col>{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].wind}}</b-col>
            </b-row>
          </b-card-body>
          <b-card-footer class="text-right bg-light py-0">
            <small class="text-muted font-italic font-weight-light" style="height: 20%">
              ข้อมูลเมื่อ (ในร่ม) {{new Date(datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].time*1000).toLocaleString()}}<br>
              (กลางแจ้ง) {{new Date(datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].time*1000).toLocaleString()}}
            </small>
          </b-card-footer>
        </b-button>
      </b-button-toolbar>
    </b-form>

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
      ไม่สามารถเพิ่ม "{{location}}" ได้
    </b-modal>
  </div>
</template>

<script>
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
      test: true
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
      var d = [
        {
          location: "A",
          indoor: [
            {
              time: 1533978991,
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ],
          outdoor: [
            {
              time: 1533978991,
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ]
        },
        {
          location: "B",
          indoor: [
            {
              time: 1533978991,
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ],
          outdoor: [
            {
              time: 1533978991,
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ]
        },
        {
          location: "C",
          indoor: [
            {
              time: 1533978991,
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ],
          outdoor: [
            {
              time: 1533978991,
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ]
        },
        {
          location: "D",
          indoor: [
            {
              time: 1533978991,
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ],
          outdoor: [
            {
              time: 1533978991,
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ]
        },
        {
          location: "E",
          indoor: [
            {
              time: 1533978991,
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ],
          outdoor: [
            {
              time: 1533978991,
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ]
        }
      ];
      this.datas = d;
      this.locations = d.map(function(obj) {
        return obj.location;
      });
    },
    toGraph(s) {
      if (s != null) {
        this.$router.push("/graph/" + s);
      }
    },
    addLocation(m) {
      if (this.location.replace(/ /g, "").length > 0) {
        console.log(this.location);
        this.hideModal(m);
        if (this.test) this.showModal("modal2");
        else this.showModal("modal3");
      }
    },
    showModal(m) {
      if (m === "modal1") this.location = "";
      this.$refs[m].show();
    },
    hideModal(m) {
      this.$refs[m].hide();
    }
  }
};
</script>