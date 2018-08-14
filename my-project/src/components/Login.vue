<template>   
    <div class="justify-content-md-center" style="margin:5% 20% 5% 20%">
      <b-form @submit="onSubmit">
        <b-card title="กรุณาลงชื่อเข้าใช้" class="text-center">
          <hr class="my-4">
          <b-alert variant="danger" dismissible :show="showAlert" @dismissed="showAlert=false">
            อีเมลล์หรือรหัสผ่านไม่ถูกต้อง
          </b-alert>    
          <b-row align-v="center" class="p-2">
            <b-col sm="3">อีเมลล์ : </b-col >
            <b-col>           
              <b-input v-model="form.email" required size="md" type="email" placeholder="xxxxx@example.com"></b-input>
            </b-col >
          </b-row>

          <b-row align-v="center" class="p-2">
            <b-col sm="3">รหัสผ่าน : </b-col >
            <b-col>           
              <b-input v-model="form.password" required size="md" type="password" placeholder="**********"></b-input>
            </b-col >
          </b-row>
          <b-button type="submit" variant="primary">ลงชื่อเข้าใช้</b-button>
        </b-card>
      </b-form>   
    </div>
</template>
<script>
import store from "../vuex/store.js";
import Vuex from "vuex";
import axios from "axios";
global.vuex = Vuex;

export default {
  store,
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      showAlert: false,
      check: 0,
      testusername:"earth",
      testemail:"e@e",
      testpassword:"eee"
    };
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      if (
        this.form.email === this.testemail &&
        this.form.password === this.testpassword
      ) {
        this.check = 1;
        this.form.name = this.testusername;
        this.addName();
        this.addChange();
        this.$router.push("/allshown");
      } else {
        this.showAlert = true;
        this.form.email = "";
        this.form.password = "";
      }
    },
    addName() {
      store.commit("addName", this.form.name);
    },
    addChange() {
      store.commit("addChange", this.check);
    }
  }
};
</script>
