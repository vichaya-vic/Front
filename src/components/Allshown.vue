<template>
  <div style="margin:5%">
    <b-form-group class="justify-content-md-center" style="margin-left:20%;margin-right:20%">
      <b-input-group>
          <b-form-select v-model="selected" :options="locations">
            <template slot="first">
                <option :value="null" disabled>-- กรุณาเลือกสถานที่ --</option>
            </template>
          </b-form-select>
            <b-button v-on:click="toGraph(selected)" variant="info">ค้นหา</b-button>
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
      locations: [],
      datas: [],
      selected: null
    };
  },
  computed: {
    Status() {
      return store.state.status;
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
    }
  }
};
</script>