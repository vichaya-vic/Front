<template>
    <div>
      <b-form @submit="onSubmit"  >
        <b-form inline>
      <label >Name : </label>
      <b-form-input v-model="form.name"  placeholder="Name" />
    </b-form>
    <b-form inline>
      <label >email : </label>
      <b-form-input type="email" v-model="form.email"   placeholder="email" />
    </b-form>
    <b-form >
        <label >Password : </label>
      <input id="pass" v-model="form.password" type="password"  placeholder="6-12 characters , at lease  one Big letters and number." 
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  />

    </b-form>
    <b-form >
        <label >Confirm Password : </label>
      <input v-model="form.confirm" type="password"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Confirm Password" />
    </b-form>
    

      <b-form-group  required >
    <input type="radio" value ="admin" v-model="form.state">
      <label for="admin">Admin</label>

    <input type="radio" id="two" value="user" v-model="form.state">
      <label for="user">User</label>
</b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>

    </div>
</template>

<script>
import axios from 'axios'
    export default {
  data () {
    return {
     selected: 'first',
      form:{
          name:'',
          email:'',
          password: '',
          confirm: '',
          state:''
      },
      show: true,
     
    }
    },
      methods: {
    onSubmit (evt) {
      evt.preventDefault();
     
     console.log("OK")
      // if(this.func_check()===true){
      //    alert(JSON.stringify(this.form));
      //       axios.post('//localhost:8081/add',this.form)
      //   .then(response => {
      //     console.log(response.data)
      //   })
      //   .catch(e=>{
      //     console.error(e);
      //   })
      // }  
    },
    func_check(){ 
      if(!(this.form.password.length >=6 && this.form.password.length<=12)){//symbol ,ชื่อห้ามซ้ำกับdb
        alert("Pls enter name in 6-12 characters.");
        return false;
      } 
      if(!(this.form.password === this.form.confirm)){
        alert("Confirm password is not correct.");
        return false;
      }
      if(this.form.password.includes( " ")===true){
        alert("Have space in password.");
        return false;
      }
      return true;
    }

  }
    
}
</script>