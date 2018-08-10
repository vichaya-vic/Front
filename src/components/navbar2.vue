<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="info">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand href="#">NameProgram</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">
                
               <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown :text="username" right>
                        <b-dropdown-item href="/test">หน้ารวม</b-dropdown-item>
                        <b-dropdown-item href="/">หน้าดูกราฟ</b-dropdown-item>
                        <div v-if="authority===true">
                            <b-dropdown-item href="#">add user</b-dropdown-item>
                            <b-dropdown-item href="#">add/edit</b-dropdown-item>
                        </div>
                        <b-dropdown-item href="#" v-on:click='showModal'>logout</b-dropdown-item>
                        
                    </b-nav-item-dropdown>

                    <b-modal ref="myModalRef" hide-footer title="Warning">
                        <div class="d-block text-center">
                            <h3>จะออกมัย</h3>
                        </div>
                        <b-row>
                            <b-col><b-btn class="mt-3" variant="outline-danger" block @click="logout">Yes</b-btn></b-col>
                            <b-col><b-btn class="mt-3" variant="outline-danger" block @click="hideModal">No</b-btn></b-col>
                        </b-row>
                        
                        
                    </b-modal>
                  
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
        

    </div>
</template>
<script>
import store from './store.js'
import Vuex from 'vuex'
global.vuex = Vuex

export default {

  data () {
    return {
    
      authority:false //เอาไว้checkสิทธิ์ว่าเป็นadmin หรือ user
      
    }
  },
  store,
  computed: {
    
    username(){
        return store.state.username
    }
    
  },
  methods: {
    logout(){
        this.addUsername()
        this.addChange ()
        this.$router.push('/') //ไปหน้าlogin
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    addUsername () {
    
      store.commit('addUser','')
    },
    addChange () {
    
      store.commit('addChange',0)
    }
  }
}
</script>

