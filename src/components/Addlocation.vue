<template>
    <div class="justify-content-md-center" style="margin:5% 20% 5% 20%">
        <b-form-group class="justify-content-md-center text-center" style="margin-left:20%;margin-right:20%">
            <label style="font-size:30px">เพิ่ม/แก้ไขสถานที่</label>
            <b-input-group class="py-4">
                <b-form-select v-model="selected" :options="locations">
                    <template slot="first">
                        <option :value="null" disabled>-- กรุณาเลือกสถานที่ --</option>
                    </template>
                </b-form-select>
                <b-button v-on:click="editLocation(selected)" variant="primary" class="mr-2">แก้ไข</b-button>
                <b-button v-on:click="newLocation" variant="danger" class="px-3">เพิ่ม</b-button>
            </b-input-group>
        </b-form-group>
        
        <b-alert variant="success" dismissible :show="form.confirm" @dismissed="form.confirm">
          บันทึก "{{form.location}}" เรียบร้อย
        </b-alert>
        
        <b-form @submit="onSubmit" v-if="add===true">
            <b-card title="เพิ่มสถานที่ใหม่" class="text-center">
                <hr class="my-4">

                <b-row align-v="center" class="p-2">
                    <b-col sm="3">ชื่อสถานที่ : </b-col >
                    <b-col>           
                        <b-input v-model="form.location" size="md" required type="text"></b-input>
                    </b-col >
                </b-row>

                <b-row align-v="center" class="p-2">
                    <b-col sm="3">เกณฑ์ : </b-col >
                    <b-col>           
                        <b-input v-model="form.confine" size="md" required type="text"></b-input>
                    </b-col >
                </b-row>

                <b-button type="submit" variant="primary">บันทึก</b-button>
            </b-card>
        </b-form>

        <b-form @submit="onSubmit" v-if="add===false">
            <b-card title="แก้ไขสถานที่" class="text-center">
                <hr class="my-4">

                <b-row align-v="center" class="p-2">
                    <b-col sm="3">ชื่อสถานที่ : </b-col >
                    <b-col>           
                        <b-input v-model="form.location" size="md" required type="text"></b-input>
                    </b-col >
                </b-row>

                <b-row align-v="center" class="p-2">
                    <b-col sm="3">เกณฑ์ : </b-col >
                    <b-col>           
                        <b-input v-model="form.confine" size="md" required type="text"></b-input>
                    </b-col >
                </b-row>

                <b-button type="submit" variant="primary">บันทึก</b-button>
            </b-card>
        </b-form>  
    </div>
</template>

<script>
export default {
  beforeMount() {
    if (this.Status) {
      if (!this.Permission) this.$router.push("/allshown");
    } else this.$router.push("/login");
  },
  data() {
    return {
      form: {
        location: "",
        oldlocation: "",
        confine: ""
      },
      add: null,
      selected: null,
      locations: ["A", "B", "C", "D"],
      output: [
        { loca: "A", cost: "1" },
        { loca: "B", cost: "10" },
        { loca: "C", cost: "100" },
        { loca: "D", cost: "1000" }
      ]
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
    onSubmit(evt) {
      evt.preventDefault();
      this.add = null;
      /*       if (this.form.location != "" && this.form.confine != "") {
        //ห้ามซ้ำlocaกับdb,confine=only number
        alert(JSON.stringify(this.form)); //ถ้าเลือกseleกดsubmitโดยไม่แก้ก้ยังได้

        axios
          .post("//localhost:8081/addedit", this.form)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.error(e);
          });
      } */
    },
    newLocation() {
      this.add = true;
      this.form.location = "";
      this.form.confine = "";
    },
    editLocation(s) {
      if (s != null) this.add = false;
      this.form.oldlocation = this.selected;
      this.form.location = this.selected;
      //this.form.confine = this.getConfine;
    }
  }
};
</script>