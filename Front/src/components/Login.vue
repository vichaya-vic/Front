<template> 
  <div class="app flex-row align-items-center mt-5" style="min-height:500px">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit="onSubmit" class="text-center">
                  <h3>กรุณาลงชื่อเข้าสู่ระบบ</h3>
                  <hr class="my-4">
                  <b-alert variant="danger" dismissible :show="showAlert" @dismissed="showAlert=false">อีเมลล์หรือรหัสผ่านไม่ถูกต้อง</b-alert>
                  
                  <b-input-group class="mb-3">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <b-img :src="require('../assets/email.png')" left width="20" height="20"/>
                      </div>
                    </div>
                    
                    <b-form-input type="email" class="form-control" placeholder="อีเมลล์" v-model="form.email" required/>
                  </b-input-group>
                  
                  <b-input-group class="mb-3">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <b-img :src="require('../assets/password.png')" left width="20" height="20"/>
                      </div>
                    </div>
                    
                    <b-form-input type="password" class="form-control" placeholder="รหัสผ่าน" v-model="form.password" required/>
                  </b-input-group>
                  
                  <b-button type="submit" variant="primary">ลงชื่อเข้าใช้</b-button>
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
var url = require("../config").url

export default {
  store,
  beforeMount() {
    if (this.Status) this.$router.push("/allshown");
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        isAdmin: false,
        confirm: false
      },
      showAlert: false
    };
  },
  computed: {
    Status() {
      return store.state.status;
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios.defaults.withCredentials = true; //set cookie for back end

      axios
        .post(url+"/setLogin", {
          email: this.form.email,
          PASS: this.form.password
        })
        .then(response => {
          if (response.data.confirm) {
            this.form.name = response.data.name;
            this.form.isAdmin = response.data.isAdmin;
            this.form.confirm = response.data.confirm;
            this.addName(this.form.name);
            this.addEmail(this.form.email);
            this.addStatus(this.form.confirm);
            this.addPermission(this.form.isAdmin);
            this.$router.push("/allshown");
          } else {
            this.showAlert = true;
            this.form.email = "";
            this.form.password = "";
          }
          console.log(response);
        })
        .catch(e => {
          console.error(e);
        });
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
