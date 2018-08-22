<template>
    <div style="margin:5%">
        <b-table stacked='md' bordered class="text-center" style="word-break: break-all" :items="users" :fields="fields">
            <template slot="name" slot-scope="row">{{row.value}}</template>
            <template slot="type" slot-scope="row">{{row.value}}</template>
            <template slot="status" slot-scope="row">{{row.value}}</template>
            <template slot="actions" slot-scope="row">
                <b-button variant="danger" v-if="row.item.name!==Name&&row.item.email!==Email" v-on:click="showModal(row.item)">
                    ลบบัญชีผู้ใช้
                </b-button>
            </template>
        </b-table>
        
        <b-modal lazy ref="myModalRef" size="sm" class="text-center" hide-header>
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

        <b-modal lazy ref="modal1" size="sm" class="text-center" body-text-variant="success" hide-header hide-footer>
            ลบผู้ใช้ "{{deleted.name}}" แล้ว
        </b-modal>

        <b-modal lazy ref="modal2" size="sm" class="text-center" body-text-variant="danger" hide-header hide-footer>
            {{err}}
        </b-modal>
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
      err: "",
      deleted: { name: "", email: "", type: "" },
      fields: {
        name: { label: "ชื่อ", sortable: true },
        email: { label: "อีเมลล์", sortable: true },
        type: { label: "ประเภท", sortable: true },
        //status: { label: "สถานะ", sortable: true },
        actions: { label: " ", sortable: false }
      }
    };
  },
  methods: {
    getUsers() {
      //get data form DB//
      axios.defaults.withCredentials = true;
      axios
        .post("//localhost:8081/showuser", {})
        .then(response => {
          console.log(response.data);
          this.users = response.data.map(function(obj) {
            var new_obj = {};
            /* if (obj.status === "online") {
              new_obj._rowVariant = "success";
              new_obj.status = "ออนไลน์";
            } else if (obj.status === "offline") {
              new_obj._rowVariant = "danger";
              new_obj.status = "ออฟไลน์";
            } */

            if (obj.isAdmin === true) new_obj.type = "แอดมิน";
            else if (obj.isAdmin === false) new_obj.type = "ยูสเซอร์";

            new_obj.name = obj.name;
            new_obj.email = obj.email;

            return new_obj;
          });
        })
        .catch(e => {
          console.error(e);
        });
    },
    delUser(del) {
      //connect to DB//
      console.log("del");
      axios.defaults.withCredentials = true;
      axios
        .post("//localhost:8081/disableuser", {
          name: this.deleted.name,
          email: this.deleted.email,
          isAdmin: this.deleted.isAdmin
        })
        .then(response => {
          console.log(response.data);
          if(response.data.status===true) this.$refs.modal1.show();
          else {
            this.err=response.data.err;
            this.$refs.modal2.show();
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
    }
  }
};
</script>

