<template>
    <div>
      <b-form @submit="onSubmit"  >
        <b-form inline>
      <label >Name : </label>
      <b-input v-model="form.name" placeholder="Name" />
    </b-form>
    <b-form inline>
        <label >Password : </label>
      <b-input v-model="form.password" type="password" placeholder="Password" />
    </b-form>
    <b-form inline>
        <label >Confirm Password : </label>
      <b-input v-model="form.confirm" type="password" placeholder="Confirm Password" />
    </b-form>

      <b-form-group>
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
    export default {
  data () {
    return {
     selected: 'first',
      form:{
          name:'',
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
     
      if(this.form.name.length >=6 && this.form.name.length<=12){//symbol ,ชื่อห้ามซ้ำกับdb
        if(this.form.password === this.form.confirm){
          alert(JSON.stringify(this.form));
        }
      }
    }
  }
    
 
}
</script>