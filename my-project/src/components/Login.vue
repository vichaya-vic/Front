<template>   
    <div class="justify-content-md-center" style="margin:5% 20% 5% 20%">
        <b-card title="กรุณาลงชื่อเข้าใช้" class="text-center">
            <hr class="my-4">
            <b-alert variant="danger" dismissible :show="showAlert" @dismissed="showAlert=false">
                อีเมลล์หรือรหัสผ่านไม่ถูกต้อง
            </b-alert>    
            <b-row align-v="center" class="p-2">
                <b-col sm="3">อีเมลล์ : </b-col >
                <b-col>           
                    <b-input v-model="form.email" size="md" type="email" placeholder="xxxxx@example.com"></b-input>
                </b-col >
            </b-row>

            <b-row align-v="center" class="p-2">
                <b-col sm="3">รหัสผ่าน : </b-col >
                <b-col>           
                    <b-input v-model="form.password" size="md" type="password" placeholder="**********"></b-input>
                </b-col >
            </b-row>
            <b-button v-on:click ="Login" variant="primary">ลงชื่อเข้าใช้</b-button>
        </b-card>   
    </div>
</template>
<script>
import store from "../vuex/store.js";
import Vuex from "vuex";
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
      testemail: "mook@mahidol", //สมมติเป็นข้อมูลdatabase
      testpassword: "mmm", // backend สร้างfunctionเพิ่ม
      testusername: "mook"
    };
  },
  methods: {
    Login() {
      if (
        this.form.email === this.testemail &&
        this.form.password === this.testpassword
      ) {
        this.check = 1;
        this.form.name = this.testusername;
        this.addName();
        this.addChange();
        this.$router.push("/allshown"); //ถ้า username กับ password ผ่านไปหน้ารวม(ของเอิทธ์)
      } else {
        this.showAlert = true;
        this.form.email = "";
        this.form.password = "";
      }
    },
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
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
