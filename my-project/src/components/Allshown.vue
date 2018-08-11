<template>
  <div>
    <b-form-group id="group1" class="justify-content-md-center">
      <b-input-group>
          <b-form-select v-model="selected" :options="locations" v-on:input="getDatas">
            <template slot="first">
                <option :value="null" disabled>-- กรุณาเลือกสถานที่ --</option>
            </template>
          </b-form-select>
            <b-button :href="toGraph(selected)" variant="info">ค้นหา</b-button>
      </b-input-group>
    </b-form-group>
    <br>
    <b-form id="group2" class="row">
          <b-button id="button1" class="col-md-3" variant="outline-info" v-for="i in locations.length" v-bind:key="i" :href="toGraph(locations[i-1])">
            <b-card-body :title="locations[i-1]">
              <b-row align-h="center">
                <b-col class="col-md-4">ในร่ม</b-col>
                <b-col class="col-md-4"></b-col>
                <b-col class="col-md-4">กลางแจ้ง</b-col>
              </b-row>
              <b-row align-h="center">
                <b-col class="col-md-4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].temperature}}</b-col>
                <b-col class="col-md-4">อุณหภูมิ</b-col>
                <b-col class="col-md-4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].temperature}}</b-col>
              </b-row>
              <b-row align-h="center">
                <b-col class="col-md-4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].humidity}}</b-col>
                <b-col class="col-md-4">ความชื้น</b-col>
                <b-col class="col-md-4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].humidity}}</b-col>
              </b-row>
              <b-row align-h="center">
                <b-col class="col-md-4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].uv}}</b-col>
                <b-col class="col-md-4">รังสี UV</b-col>
                <b-col class="col-md-4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].uv}}</b-col>
              </b-row>
              <b-row align-h="center">
                <b-col class="col-md-4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].wind}}</b-col>
                <b-col class="col-md-4">แรงลม</b-col>
                <b-col class="col-md-4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].wind}}</b-col>
              </b-row>
            </b-card-body>
            <b-card-footer id="footer1" footer-class="text-right" footer-bg-variant="light">
              ข้อมูลเมื่อ (ในร่ม) {{new Date(datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].time*1000).toLocaleString()}}
              <br>
              (กลางแจ้ง) {{new Date(datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].time*1000).toLocaleString()}}
            </b-card-footer>
          </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.getDatas();
  },
  data() {
    return {
      locations: [],
      datas: [],
      selected: null
    };
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
      if (s!=null) {
        return "graph/" + s;
      }
    }
  }
};
</script>

<style>
#group1 {
  margin-top: 50px;
  margin-left:20%;
  margin-right:20%;
}
#group2 {
  margin: 20px;
}
#button1 {
  margin: 10px 4% 10px 4%;
  padding: 0px;
}
#footer1{
  font-size: 10px;
}
</style>