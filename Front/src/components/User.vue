<template>
  <div class="app flex-row align-items-center mt-5">
    <div class="container">
      <b-card no-body>
        <b-card-header><b-img :src="require('../assets/users.png')" left width="25" height="25"/><h5>ผู้ใช้ทั้งหมด</h5></b-card-header>
        <b-card-body>
          <b-table stacked="sm" striped fixed class="text-center cell" :items="users" :fields="fields">
            <div slot="name" slot-scope="row" class="cell-overflow">{{row.value}}</div>
            <div slot="type" slot-scope="row" class="cell-overflow">{{row.value}}</div>
            <div slot="status" slot-scope="row" class="cell-overflow">{{row.value}}</div>
            <div slot="actions" slot-scope="row">
              <b-button variant="danger" :disabled="row.item.name==Name&&row.item.email==Email" v-on:click="showModal(row.item)" v-b-tooltip.hover title="ลบบัญชีผู้ใช้นี้">
                <b-img :src="require('../assets/delete.png')" center width="15" height="15"/>
              </b-button>
            </div>
          </b-table>
        </b-card-body>
      </b-card>
    </div>
        
    <b-modal lazy ref="myModalRef" size="md" class="text-center" hide-header>
      ต้องการลบบัญชีผู้ใช้ "{{deleted.name}}" ออกจากระบบใช่หรือไม่
      <div slot="modal-footer">
          <b-btn size="sm" variant="secondary" v-on:click="hideModal">
              ยกเลิก
          </b-btn>
          <b-btn size="sm" variant="primary" v-on:click="delUser(deleted)">
              ตกลง
          </b-btn>
      </div>
    </b-modal>

    <b-modal lazy ref="modal1" size="md" class="text-center" body-text-variant="success" hide-header hide-footer>
      ลบผู้ใช้ "{{deleted.name}}" แล้ว
    </b-modal>
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
      else this.getUsers();
    } else this.$router.push("/login");
  },
  computed: {
    Status() {
      return store.state.status;
    },
    Permission() {
      return store.state.permission;
    },
    Name() {
      return store.state.name;
    },
    Email() {
      return store.state.email;
    }
  },
  data() {
    return {
      users: [],
      deleted: { name: "", email: "", type: "" },
      fields: {
        name: { label: "ชื่อ", sortable: true },
        email: { label: "อีเมลล์", sortable: true },
        type: { label: "ประเภท", sortable: true },
        actions: { label: " ", sortable: false }
      }
    };
  },
  methods: {
    getUsers() {
      //get data form DB//
      axios.defaults.withCredentials = true;
      axios
        .post(url + "/getUsers", {})
        .then(response => {
          console.log(response.data);
          if (response.data.confirm) {
            this.users = response.data.datas.map(function(obj) {
              var new_obj = {};

              if (obj.isAdmin === true) new_obj.type = "แอดมิน";
              else if (obj.isAdmin === false) new_obj.type = "ยูสเซอร์";

              new_obj.name = obj.name;
              new_obj.email = obj.email;

              return new_obj;
            });
          } else {
            this.addName("");
            this.addEmail("");
            this.addStatus(false);
            this.addPermission(false);
            this.$router.push("/");
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    delUser(del) {
      console.log("del");
      axios.defaults.withCredentials = true;
      axios
        .post(url + "/delUser", {
          name: this.deleted.name,
          email: this.deleted.email,
          isAdmin: this.deleted.isAdmin
        })
        .then(response => {
          console.log(response.data);
          if (response.data.confirm) this.$refs.modal1.show();
          else {
            this.addName("");
            this.addEmail("");
            this.addStatus(false);
            this.addPermission(false);
            this.$router.push("/");
          }
          this.getUsers();
        })
        .catch(e => {
          console.error(e);
        });
      this.hideModal();
    },
    showModal(item) {
      this.deleted.name = item.name;
      this.deleted.email = item.email;
      this.deleted.type = item.type;
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
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

<style>
@media all and (max-width: 700px) {
  .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.cell-overflow {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

