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
                        <b-dropdown-item v-on:click='showModal'>logout</b-dropdown-item>                        
                    </b-nav-item-dropdown>

                    <b-modal ref="myModalRef" hide-footer title="Warning">
                        <div class="d-block text-center">
                            <h3>จะออกมัย</h3>
                        </div>
                        <b-row>
                            <b-col><b-btn class="mt-3" variant="outline-danger" block v-on:click="logout">Yes</b-btn></b-col>
                            <b-col><b-btn class="mt-3" variant="outline-danger" block v-on:click="hideModal">No</b-btn></b-col>
                        </b-row>
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
        .post("//localhost:8081/logout", {})
        .then(response => {
          console.log(response);
          store.commit("addName", "");
          store.commit("addStatus", false);
          store.commit("addPermission", false)
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
    }
  }
};
</script>
