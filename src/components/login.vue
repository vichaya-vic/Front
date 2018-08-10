<template>
    
    <div>
        

            <b-row class="justify-content-md-center">
                <b-col sm="2" size="sm">USERNAME : </b-col >
                <b-col sm="5" >           
                    <b-input v-model="form.name" size="sm" ></b-input>
                </b-col >
            </b-row>
            <b-row class="justify-content-md-center">
                <b-col sm="2" size="sm">PASSWORD : </b-col >
                <b-col sm="5" >           
                    <b-input v-model="form.password" size="sm" type="password" ></b-input>
                </b-col >
            </b-row>
            <b-row class="justify-content-md-center">
                <b-button v-on:click ="Login" >Login </b-button>        
            </b-row>

            <b-modal ref="myModalRef" hide-footer title="Warning">
                <div class="d-block text-center">
                    <h3>Wrong username or password</h3>
                </div>
                <b-row>
                    <b-col><b-btn class="mt-3" variant="outline-danger" block @click="hideModal">OK</b-btn></b-col>
                </b-row>
                        
                        
            </b-modal>
            
            
        
    </div>
</template>
<script>
import store from './store.js'
import Vuex from 'vuex'
global.vuex = Vuex

export default {
    store,
    data () {
    
        return {
            form: {
                name:'',
                password:''     
            },
            check:0,
            testname:'mook',  //สมมติเป็นข้อมูลdatabase 
            testpassword:'mmm' // backend สร้างfunctionเพิ่ม
      
    }
  },
  methods: {
        Login(){
        
            if(this.form.name===this.testname && this.form.password===this.testpassword)
            {
                this.check=1
                this.addUsername()
                this.addChange ()
                
                this.$router.push('/test') //ถ้า username กับ password ผ่านไปหน้ารวม(ของเอิทธ์)
            }
            else
            {
                this.$refs.myModalRef.show()
                this.form.name=''
                this.form.password=''
            }
          
          
        },
        showModal () {
            this.$refs.myModalRef.show()
        },
        hideModal () {
            this.$refs.myModalRef.hide()
        },
        addUsername () {
            store.commit('addUser',this.form.name)
        },
        addChange () {
            store.commit('addChange',this.check)
        }
      
  }
}
</script>
