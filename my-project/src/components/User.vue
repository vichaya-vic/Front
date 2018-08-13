<template>
    <div class="m-5">
        <b-table class="text-center" :items="users" :fields="fields">
            <template slot="name" slot-scope="row">{{row.value}}</template>
            <template slot="type" slot-scope="row">{{row.value}}</template>
            <template slot="status" slot-scope="row">{{row.value}}</template>
            <template slot="actions" slot-scope="row">
                <b-button variant="danger" v-on:click="showModal(row.item.name)">
                    delete
                </b-button>
            </template>
        </b-table>
        <b-modal ref="myModalRef" size="sm" class="text-center" hide-header>
            ต้องการลบ "{{deleted}}" ใช่หรือไม่
            <div slot="modal-footer" class="justify-content-md-center">
                <b-btn size="sm" class="float-left" variant="seccondary" @click="show=false">
                    ยกเลิก
                </b-btn>
                <b-btn size="sm" class="float-right" variant="primary" @click="show=false">
                    ตกลง
                </b-btn>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
  beforeMount() {
    this.getUsers();
  },
  data() {
    return {
      users: [],
      deleted: "",
      fields: ["name", "email", "type", "status", "actions"]
    };
  },
  methods: {
    getUsers() {
      var data = [
        {
          name: "a",
          email: "a@a",
          type: "admin",
          status: "online"
        },
        {
          name: "b",
          email: "a@a",
          type: "user",
          status: "offline"
        },
        {
          name: "c",
          email: "a@a",
          type: "user",
          status: "offline"
        },
        {
          name: "d",
          email: "a@a",
          type: "user",
          status: "online"
        },
        {
          name: "e",
          email: "a@a",
          type: "user",
          status: "offline"
        }
      ];

      this.users = data.map(function(obj) {
        if (obj.status === "online") obj._rowVariant = "success";
        else if (obj.status === "offline") obj._rowVariant = "danger";
        return obj;
      });
    },
    delUser() {},
    showModal(name) {
      this.deleted = name;
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    }
  }
};
</script>

