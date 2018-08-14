<template>
  <div>
    <b-badge variant="dark">Date</b-badge>
    <Flatpickr :options="DateOptions"  v-model="my_filter.date"/>
    <b-badge variant="dark">Form(Time)</b-badge>
    <Flatpickr :options=" FtimeOptions"  v-model="my_filter.Ftime"/>
    <b-badge variant="dark">To(Time)</b-badge>
    <Flatpickr :options=" TtimeOptions"  v-model="my_filter.Ttime"/>
    <b-button  variant="success" v-on:click="Search">Search</b-button>
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component';

  
  export default {    
    data () {
      return {
        my_filter:{
            date:'',
            Ftime:'',
            Ttime:''
        },

         DateOptions: {
            mode: "range",
            utc: true,
            defaultDate: '2016-12-27T16:16:22.585Z',
        },   
          FtimeOptions: {
              enableTime: true,
              noCalendar: true,
              time_24hr: true,
              defaultDate: "12:00"
        }, 
        TtimeOptions: {
              enableTime: true,
              noCalendar: true,
              time_24hr: true,
               defaultDate: "12:00"
        }, 
      }
    },
    components: {
      flatPickr
    },
    methods:{
        Search()
        {
            console.log(JSON.stringify(this.my_filter));
            return JSON.stringify(this.my_filter);
        }
    }
  }
</script>