<template>
  <div class="app flex-row align-items-center mt-5" style="min-height:500px">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit="onSubmit" class="text-center">
                  <h3>เพิ่มบัญชีผู้ใช้</h3>
                  <hr class="my-4">

                  <b-alert variant="danger" dismissible :show="showAlert" @dismissed="showAlert=false">
                    {{textAlert}}
                  </b-alert>

                  <b-alert variant="success" dismissible :show="showSuccess" @dismissed="showSuccess=false">
                    เพิ่มบัญชีผู้ใช้ในระบบแล้ว
                  </b-alert>

                  <b-input-group class="mb-3">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <b-img :src="require('../assets/user1.png')" left width="20" height="20"/>
                      </div>
                    </div>
                    
                    <b-form-input type="text" class="form-control" placeholder="ชื่อผู้ใช้" v-model="form.name" required/>
                  </b-input-group>
                  
                  <b-input-group class="mb-3">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <b-img :src="require('../assets/email.png')" left width="20" height="20"/>
                      </div>
                    </div>
                    
                    <b-form-input type="email" class="form-control" placeholder="อีเมลล์" v-model="form.email" required/>
                  </b-input-group>
                  
                  <b-input-group>
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <b-img :src="require('../assets/password.png')" left width="20" height="20"/>
                      </div>
                    </div>
                    
                    <b-form-input type="password" class="form-control" placeholder="รหัสผ่าน" v-model="form.CONPASS" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}"/>
                  </b-input-group>

                  <b-form-text class="mb-2">
                    รหัสผ่านต้องมีขนาด 6-12 ตัวอักษร และต้องมีตัวเลข, ตัวพิมพ์ใหญ่และตัวพิมพ์เล็กอย่างน้อยอย่างละ 1ตัว
                  </b-form-text>

                  <b-input-group>
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <b-img :src="require('../assets/password.png')" left width="20" height="20"/>
                      </div>
                    </div>
                    
                    <b-form-input type="password" class="form-control" placeholder="ยืนยันรหัสผ่าน" v-model="form.PASS" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}"/>
                  </b-input-group>
                  
                  <b-form-text class="mb-3">
                    รหัสผ่านต้องมีขนาด 6-12 ตัวอักษร และต้องมีตัวเลข, ตัวพิมพ์ใหญ่และตัวพิมพ์เล็กอย่างน้อยอย่างละ 1ตัว
                  </b-form-text>
                  
                  <b-form-radio-group buttons button-variant="outline-secondary" v-model="form.isAdmin" class="mb-4" style="width:100%">
                    <b-form-radio :value="false" style="width:50%">ผู้ใช้</b-form-radio>
                    <b-form-radio :value="true" style="width:50%">ผู้ดูแล</b-form-radio>
                  </b-form-radio-group>

                  <b-button type="submit" variant="success" style="width:100%">เพิ่มบัญชี</b-button>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
 
<script>
import store from "../vuex/store.js";
import Vuex from "vuex";
import axios from "axios";
global.vuex = Vuex;
var url = require("../config").url;

export default {
  beforeMount() {
    if (this.Status) {
      if (!this.Permission) this.$router.push("/allshown");
    } else this.$router.push("/login");
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        PASS: "",
        CONPASS: "",
        confirm: false,
        isAdmin: false
      },
      showAlert: false,
      showSuccess: false,
      textAlert: ""
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

      if (this.func_check()) {
        axios.defaults.withCredentials = true;
        axios
          .post(url + "/newUser", {
            name: this.form.name,
            email: this.form.email,
            PASS: this.form.PASS,
            CONPASS: this.form.CONPASS,
            isAdmin: this.form.isAdmin
          })
          .then(response => {
            console.log(response.data);
            this.form.confirm = response.data.confirm;
            if (response.data.confirm) {
              this.showAlert = false;
              this.showSuccess = true;
              this.form.name = "";
              this.form.email = "";
              this.form.PASS = "";
              this.form.CONPASS = "";
              this.form.isAdmin = false;
            } else {
              if (response.data.err === "same user") {
                this.showAlert = true;
                this.showSuccess = false;
                this.textAlert = "มีผู้ใช้อีเมลล์นี้แล้ว";
              } else if (response.data.err === "permission denied") {
                this.addName("");
                this.addEmail("");
                this.addStatus(false);
                this.addPermission(false);
                this.$router.push("/");
              }
            }
          })
          .catch(e => {
            console.error(e);
          });
      }
    },
    func_check() {
      if (this.form.name.replace(/ /g, "").length < 1) {
        this.textAlert = "กรุณาใส่ชื่อ";
        this.showAlert = true;
        return false;
      } else if (!(this.form.PASS === this.form.CONPASS)) {
        this.textAlert = "รหัสผ่านไม่ตรงกัน";
        this.showAlert = true;
        return false;
      }
      return true;
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
    }
  }
};
</script>