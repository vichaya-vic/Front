<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand v-if="!Status">NameProgram</b-navbar-brand>
            <b-navbar-brand v-if="Status" v-on:click="toPage('')">NameProgram</b-navbar-brand>
            <b-collapse v-if="Status" is-nav id="nav_collapse">                
               <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown :text="Name" right>
                        <b-dropdown-item v-on:click="toPage('allshown')">หน้าแรก</b-dropdown-item>
                        <b-dropdown-item v-on:click="toPage('graph')">กราฟ</b-dropdown-item>
                        <div v-if="Permission">
                            <b-dropdown-item v-on:click="toPage('user')">ดูบัญชีผู้ใช้ทั้งหมด</b-dropdown-item>
                            <b-dropdown-item v-on:click="toPage('adduser')">เพิ่มบัญชีผู้ใช้ใหม่</b-dropdown-item>
                        </div>
                        <b-dropdown-item v-on:click='showModal'>ออกจากระบบ</b-dropdown-item>                        
                    </b-nav-item-dropdown>

                    <b-modal ref="myModalRef" hide-header>ต้องการออกจากระบบใช่หรือไม่
                      <div slot="modal-footer">
                        <b-btn size="sm" variant="secondary" v-on:click="hideModal">ยกเลิก</b-btn>
                        <b-btn size="sm" variant="primary" v-on:click="logout">ตกลง</b-btn>
                      </div>
                    </b-modal>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import store from "../vuex/store.js";
import Vuex from "vuex";
import axios from "axios";
global.vuex = Vuex;

export default {
  store,
  computed: {
    Name() {
      return store.state.name;
    },
    Status() {
      return store.state.status;
    },
    Permission() {
      return store.state.permission;
    }
  },
  methods: {
    logout() {
      axios.defaults.withCredentials = true;
      axios
        .post("pc.devinice.com:1111/setLogout", {})
        .then(response => {
          console.log(response);
          this.addName("");
          this.addEmail("");
          this.addStatus(false);
          this.addPermission(false);
          this.$router.push("/"); //ไปหน้าlogin
        })
        .catch(e => {
          console.error(e);
        });
    },
    toPage(s) {
      this.$router.push("/" + s);
    },
    showModal() {
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
