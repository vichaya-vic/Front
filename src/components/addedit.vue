<template>
    <div>
<b-form @submit="onSubmit"  >
    <b-form-group inline>
         <label >add/edit</label>
         <b-form-select :options="select" v-model="form2.location" v-on:input="func(form2.location)" ></b-form-select>
         <b-button variant="primary" v-on:click="ClickNew" >New</b-button>
         <div v-if="show==true">
              <label >Location : </label>
        <b-form-input v-model="form2.location" ></b-form-input>
             </div>

    </b-form-group>
        <label >confine : </label>
        <b-form-input v-model="form2.confine" type="number"></b-form-input>
        <b-button type="submit" variant="primary">Submit</b-button>
 </b-form> 
    </div>
</template>

<script>
     export default {
  data () {
    return {
      form2:{
          location:'',
          confine:''
          
      },
      show: false,
    select: ["A","B","C","D"],
    output:[    
        {loca:"A",cost:"1"}, {loca:"B",cost:"10"}, {loca:"C",cost:"100"}, {loca:"D",cost:"1000"}
    ] 
    }
    },
      methods: {
    onSubmit (evt) {
      evt.preventDefault();
      if(this.form2.location!='' && this.form2.confine!=''){//ห้ามซ้ำlocaกับdb,confine=only number 
        alert(JSON.stringify(this.form2));//ถ้าเลือกseleกดsubmitโดยไม่แก้ก้ยังได้


        axios.post('//localhost:8081/addedit',this.form)
      .then(response => {
        console.log(response.data)
      })
      .catch(e=>{
        console.error(e);
      })



      }
      
    },
     ClickNew(evt){  
         this.form2.location='';
         this.form2.confine='';
         this.show = !this.show;
         
    },
    func(a){
       
     for(var i=0;i<this.output.length;i++){
          if(a==this.output[i]['loca']){
            this.form2.confine=this.output[i]['cost'];
            this.form2.location=this.output[i]['loca'];
            }
        } 

    }
    
  }
    
 
}
</script>