new Vue({
  el: '#app',
    
  data: { 
    processing: false,
    todays_date: new Date(),
    line_size: 124,
    spin_size: 55,
    spin_speed: 2,
    api_data: [],
  },

  mounted() {
    this.processing = true;
    const _self = this;  
    axios.get('https://api.worldtradingdata.com/api/v1/stock?symbol=AAPL,MSFT,JPM,ADBE,HSBA.L&api_token=' + settings.API_TOKEN)
    .then(function(response) {  
      console.log(response.data.data);
     _self.api_data = response.data.data;   
    })
    .catch(error => {
      console.log(error) 
    })
    .finally(function() {
      _self.processing = false;
    })
  }, 
  
  methods: {
    getCurrYear() {
      return this.curr_date.getFullYear();
    },
        
    getCurrMonth() {
      return this.curr_date.getMonth();
    },

    getCurrDay() {
      return this.curr_date.getDate();
    },  

    
  },

  

    
}); 