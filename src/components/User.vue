<template>
    <div style="margin:5%">
        <b-table stacked='md' bordered class="text-center" style="word-break: break-all" :items="users" :fields="fields">
            <template slot="name" slot-scope="row">{{row.value}}</template>
            <template slot="type" slot-scope="row">{{row.value}}</template>
            <template slot="status" slot-scope="row">{{row.value}}</template>
            <template slot="actions" slot-scope="row">
                <b-button variant="danger" v-on:click="showModal(row.item)">
                    ลบบัญชีผู้ใช้
                </b-button>
            </template>
        </b-table>
        <b-modal ref="myModalRef" size="sm" class="text-center" hide-header>
            ต้องการลบบัญชีผู้ใช้ "{{deleted.name}}" ออกจากระบบใช่หรือไม่
            <div slot="modal-footer" class="justify-content-md-center">
                <b-btn size="sm" variant="seccondary" v-on:click="hideModal">
                    ยกเลิก
                </b-btn>
                <b-btn size="sm" variant="primary" v-on:click="delUser(deleted)">
                    ตกลง
                </b-btn>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
  beforeMount() {
    if (this.Status) {
      if (!this.Permission) this.$router.push("/allshown");
      else this.getUsers();
    } else this.$router.push("/login");
  },
  data() {
    return {
      users: [],
      deleted: { name: "", email: "", type: "" },
      fields: {
        name: { label: "ชื่อ", sortable: true },
        email: { label: "อีเมลล์", sortable: true },
        type: { label: "ประเภท", sortable: true },
        status: { label: "สถานะ", sortable: true },
        actions: { label: " ", sortable: false }
      }
    };
  },
  methods: {
    getUsers() {
      var data = [
        {
          name: "วิชญ วิเชษฐวิชัย",
          email: "abcd@gmail.com",
          isAdmin: true,
          status: "online"
        },
        {
          name: "วชิรวิท สมาน",
          email: "armzaza@outlook.com",
          isAdmin: false,
          status: "offline"
        },
        {
          name: "พงศธร มานุโสภิษ",
          email: "pongsaton@gmail.com",
          isAdmin: false,
          status: "offline"
        },
        {
          name: "d",
          email: "a@a",
          isAdmin: false,
          status: "online"
        },
        {
          name: "e",
          email: "a@a",
          isAdmin: false,
          status: "offline"
        }
      ];

      this.users = data.map(function(obj) {
        var new_obj = {};
        if (obj.status === "online") {
          new_obj._rowVariant = "success";
          new_obj.status = "ออนไลน์";
        }
        else if (obj.status === "offline") {
          new_obj._rowVariant = "danger";
          new_obj.status = "ออฟไลน์";
        }

        if (obj.isAdmin === true) new_obj.type = "แอดมิน";
        else if (obj.isAdmin === false) new_obj.type = "ยูสเซอร์";

        new_obj.name = obj.name;
        new_obj.email = obj.email;

        return new_obj;
      });
    },
    delUser(del) {
      console.log(del);
      this.deleted = { name: "", email: "", type: "" };
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

