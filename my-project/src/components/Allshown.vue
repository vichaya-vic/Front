<template>
  <div>
    <b-form-group id="group1">
      <b-input-group>
          <b-form-select v-model="selected" :options="locations" v-on:input="getDatas">
            <template slot="first">
                <option :value="null" disabled>-- กรุณาเลือกสถานที่ --</option>
            </template>
          </b-form-select>
            <b-button :href="toGraph()" variant="info">ค้นหา</b-button>
      </b-input-group>
    </b-form-group>
    <br>
    <b-form-group id="group2">
      <b-container>
        <!-- <b-row> -->
        <b-card-group columns>
          <b-card id="card1" v-for="i in locations.length" v-bind:key="i" 
          :title="locations[i-1]"
          :footer="'Updated '"
          footer-class="text-right"
          footer-bg-variant="light"
          class="text-center">
            <b-container>
              <b-row align-h="center" no-gutters>
                <b-col col sm="4" md="4" lg="4">ในร่ม</b-col>
                <b-col col sm="4" md="4" lg="4"></b-col>
                <b-col col sm="4" md="4" lg="4">กลางแจ้ง</b-col>
              </b-row>
              <b-row align-h="center" no-gutters>
                <b-col col sm="4" md="4" lg="4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].temperature}}</b-col>
                <b-col col sm="4" md="4" lg="4">อุณหภูมิ</b-col>
                <b-col col sm="4" md="4" lg="4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].temperature}}</b-col>
              </b-row>
              <b-row align-h="center" no-gutters>
                <b-col col sm="4" md="4" lg="4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].humidity}}</b-col>
                <b-col col sm="4" md="4" lg="4">ความชื้น</b-col>
                <b-col col sm="4" md="4" lg="4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].humidity}}</b-col>
              </b-row>
              <b-row align-h="center" no-gutters>
                <b-col col sm="4" md="4" lg="4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].uv}}</b-col>
                <b-col col sm="4" md="4" lg="4">รังสี UV</b-col>
                <b-col col sm="4" md="4" lg="4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].uv}}</b-col>
              </b-row>
              <b-row align-h="center" no-gutters>
                <b-col col sm="4" md="4" lg="4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].indoor[0].wind}}</b-col>
                <b-col col sm="4" md="4" lg="4">แรงลม</b-col>
                <b-col col sm="4" md="4" lg="4">{{datas[datas.findIndex(x=>x.location==locations[i-1])].outdoor[0].wind}}</b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-card-group>
        <!-- </b-row> -->
      </b-container>
    </b-form-group>
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
      datas:[],
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
              time: ["13", "15", "23"],
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ],
          outdoor: [
            {
              time: ["13", "15", "23"],
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
              time: ["13", "20", "23"],
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ],
          outdoor: [
            {
              time: ["13", "15", "23"],
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
              time: ["13", "20", "23"],
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ],
          outdoor: [
            {
              time: ["13", "15", "23"],
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
              time: ["13", "15", "23"],
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ],
          outdoor: [
            {
              time: ["13", "15", "23"],
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
              time: ["13", "20", "23"],
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ],
          outdoor: [
            {
              time: ["13", "15", "23"],
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ]
        }
      ];
      this.datas=d
      this.locations = d.map(function(obj) {
        return obj.location;
      });
    },
    toGraph() {
      if (this.selected != null) {
        return "graph/" + this.selected;
      }
    }
  }
};
</script>

<style>
#group1 {
  margin-top: 50px;
  margin-left: 30%;
  margin-right: 30%;
}
#group2 {
  margin-top: 20px;
}
#card1 {
  margin: 10px 10px 10px 10px;
  background-color: rgb(233, 233, 233);
}
</style>