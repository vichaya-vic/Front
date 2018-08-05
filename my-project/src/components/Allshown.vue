<template>
    <div>
        <b-container id="allshown1">
            <b-row>
                <b-col>
                    <b-form-select v-model="selected" :options="locations" v-on:input="getDatas">
                        <template slot="first">
                            <option :value="null" disabled>-- กรุณาเลือกสถานที่ --</option>
                        </template>
                    </b-form-select>
                </b-col>

                <b-col>
                    <b-button :href="toGraph()" variant="info">ค้นหา</b-button>
                </b-col>
            </b-row>
        </b-container>

        <br>

        <b-container id="allshown2">
            <b-row v-for="i in Math.floor((locations.length-1)/3)+1" v-bind:key="i">
                <b-col id="allshown3" v-if="j*i<=locations.length" v-for="j in 3" v-bind:key="j" lg="2">
                    {{j}}
                </b-col>
            </b-row>
        </b-container>
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
#allshown1 {
  margin-top: 20px;
  margin-left: 25%;
  margin-right: 25%;
}
#allshown2 {
  margin-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
}
#allshown3 {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border: 6px double lightcoral;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}
</style>

