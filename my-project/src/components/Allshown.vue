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
        <b-row id="row1" v-for="i in locations" v-bind:key="i">
          {{i}}
        </b-row>
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
      datas: [],
      selected: null
    };
  },
  methods: {
    getDatas() {
      var d = [
        {
          location: "A",
          data: [
            {
              date: ["26", "07", "2018", "13", "15"],
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ]
        },
        {
          location: "B",
          data: [
            {
              date: ["26", "07", "2018", "13", "20"],
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ]
        },
        {
          location: "C",
          data: [
            {
              date: ["26", "07", "2018", "13", "20"],
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ]
        },
        {
          location: "D",
          data: [
            {
              date: ["26", "07", "2018", "13", "15"],
              uv: 30,
              wind: 122,
              humidity: 30,
              temperature: 30
            }
          ]
        },
        {
          location: "E",
          data: [
            {
              date: ["26", "07", "2018", "13", "20"],
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
  margin-left: 10%;
  margin-right: 10%
}
#row1 {
  border: 6px double lightcoral;
  border-radius: 10px;
  padding: 10px;
}
</style>