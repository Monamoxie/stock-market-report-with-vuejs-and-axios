const app = new Vue({
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
    const list_of_companies = settings.LISTOFCOMPANIES();

    list_of_companies.forEach(function(e, i) {
        let box = list_of_companies[i];
        let symbols = '';
        box.forEach(function(c, p){
          symbols +=  ( p === box.length - 1 ) ? box[p] : box[p] + ',';
        }); 
        axios.get( settings.API_URL + 'stock?symbol='+symbols+'&api_token=' + settings.API_TOKEN)
        .then(function(response) {   
          _self.api_data.push(response.data.data);  
           
        }).catch(error => {
        console.log(error) 
        }).finally(function() {
        _self.processing = false;
      })
    });  
  },

  computed: {
    companies() {
      console.log(this.api_data.flat());
      return this.api_data.flat();
    }
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