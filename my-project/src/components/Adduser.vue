<template>
  <div class="justify-content-md-center" style="margin:5% 20% 5% 20%">
    <b-form @submit="onSubmit">
      <b-card title="เพิ่มบัญชีผู้ใช้" class="text-center">
        <hr class="my-4">
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
            <b-input v-model="form.password" size="md" required type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}"></b-input>
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
          <b-col sm="3">ยืนยันรหัสผ่าน : </b-col >
          <b-col>           
            <b-input v-model="form.confirm" size="md" required type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}"></b-input>
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
            <input type="radio" id="two" value=false v-model="form.state">
              <label class="p-2" for="user">ยูสเซอร์</label>
            <input type="radio" value =true v-model="form.state">
              <label class="p-2" for="admin">แอดมิน</label>
          </b-form-group>
        </b-row>
        
        <b-button type="submit" variant="primary">เพิ่มบัญชีผู้ใช้</b-button> 
      </b-card>
    </b-form>
  </div>
</template>
 
<script>
import axios from "axios";
export default {
  data() {
    return {
      selected: "first",
      form: {
        name: "",
        email: "",
        password: "",
        confirm: "",
        state: false
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      // console.log("OK")
      if (this.func_check() === true) {
        alert(JSON.stringify(this.form));
        /* axios
          .post("//localhost:8081/add", this.form)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.error(e);
          }); */
      }
    },
    func_check() {
      if (
        !(this.form.password.length >= 6 && this.form.password.length <= 12)
      ) {
        //symbol ,ชื่อห้ามซ้ำกับdb
        alert("Pls enter name in 6-12 characters.");
        return false;
      }
      if (!(this.form.password === this.form.confirm)) {
        alert("Confirm password is not correct.");
        return false;
      }
      if (this.form.password.includes(" ") === true) {
        alert("Have space in password.");
        return false;
      }
      return true;
    }
  }
};
</script>