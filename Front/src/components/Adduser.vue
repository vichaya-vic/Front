<template>
  <div class="justify-content-md-center" style="margin:5% 20% 5% 20%">
    <b-form @submit="onSubmit">
      <b-card title="เพิ่มบัญชีผู้ใช้" class="text-center">
        <hr class="my-4">

        <b-alert variant="danger" dismissible :show="showAlert" @dismissed="showAlert=false">
          {{textAlert}}
        </b-alert>

        <b-alert variant="success" dismissible :show="showSuccess" @dismissed="showSuccess=false">
          เพิ่มบัญชีผู้ใช้ในระบบแล้ว
        </b-alert>

        <b-row align-v="center" class="p-2">
          <b-col sm="3">ชื่อ : </b-col >
          <b-col>           
            <b-input v-model="form.name" size="md" required type="text"></b-input>
          </b-col >
        </b-row>

        <b-row align-v="center" class="p-2">
          <b-col sm="3">อีเมลล์ : </b-col >
          <b-col>           
            <b-input v-model="form.email" required size="md" type="email"></b-input>
          </b-col >
        </b-row>

        <b-row align-v="center" class="p-2">
          <b-col sm="3">รหัสผ่าน : </b-col >
          <b-col>     
            <b-input v-model="form.PASS" size="md" required type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}"></b-input>
          </b-col >
        </b-row>

        <b-row>
          <b-col sm="3"></b-col>
          <b-col>
            <b-form-text>
              รหัสผ่านต้องมีขนาด 6-12 ตัวอักษร และต้องมีตัวเลข, ตัวพิมพ์ใหญ่และตัวพิมพ์เล็กอย่างน้อยอย่างละ 1ตัว
            </b-form-text>
          </b-col>
        </b-row>
        
        <b-row align-v="center" class="p-2">          
          <b-col sm="3">ยืนยันรหัสผ่าน : </b-col>
          <b-col>           
            <b-input v-model="form.CONPASS" size="md" required type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}"></b-input>
          </b-col >          
        </b-row>

        <b-row>
          <b-col sm="3"></b-col>
          <b-col>
            <b-form-text>
              รหัสผ่านต้องมีขนาด 6-12 ตัวอักษร และต้องมีตัวเลข, ตัวพิมพ์ใหญ่และตัวพิมพ์เล็กอย่างน้อยอย่างละ 1ตัว
            </b-form-text>
          </b-col>
        </b-row>

        <b-row align-h="center" class="pt-3">
          <b-form-group required > 
            <input type="radio" :value="false" v-model="form.isAdmin">
              <label class="p-2">ยูสเซอร์</label>
            <input type="radio" :value ="true" v-model="form.isAdmin">
              <label class="p-2">แอดมิน</label>
          </b-form-group>
        </b-row>
        
        <b-button type="submit" variant="primary">เพิ่มบัญชีผู้ใช้</b-button> 
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
          .post("//localhost:8081/newUser", {
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