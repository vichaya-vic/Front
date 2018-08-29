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
        .post("http://pc.devinice.com:1111/setLogin", {
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
