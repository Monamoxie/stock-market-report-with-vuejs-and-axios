const app = new Vue({
  el: '#stock-handler',
    
  data: { 
    processing: false,
    todays_date: new Date(),
    line_size: 124,
    spin_size: 55,
    spin_speed: 2,
    api_data: [],
    requestType: null
  },

  mounted() {
    this.processing = true;
    this.requestType = 'sharePrice';
    this.sharePrice();
  },

  computed: {
    companies() { 
      return this.api_data.flat();
    }
  }, 

  
  methods: {

    getCurrYear() {
      return this.currDate.getFullYear();
    },
        
    getCurrMonth() {
      return this.currDate.getMonth();
    },

    getCurrDay() {
      return this.currDate.getDate();
    },  
 
    prepRequest(entities) {
      this.processing = true;
      this.requestType = entities[0]; 
      eval("this."+this.requestType).call();
    },

    sharePrice() {

      const [_self, stockCompanies] = [this, Settings.stockCompanies()];
      
      stockCompanies.forEach(function(e, i) {
          let box = stockCompanies[i];
          let symbols = '';
          box.forEach(function(c, p){
            symbols +=  ( p === box.length - 1 ) ? box[p] : box[p] + ',';
          });  

          axios.get( Settings.apiUrl + 'stock?symbol='+symbols+'&api_token=' + Settings.apiToken)
          .then(function(response) {   
            _self.api_data.push(response.data.data);  
             
          }).catch(error => { 
            console.log(error);
          }).finally(function() {
          _self.processing = false;
        })

      });  
    },

    mutualFunds() {

      const [_self, mutualFundCompanies] = [this, Settings.mutualFundCompanies()];
     
      mutualFundCompanies.forEach(function(e, i) {
          let box = mutualFundCompanies[i];
          let symbols = '';
          box.forEach(function(c, p){
            symbols +=  ( p === box.length - 1 ) ? box[p] : box[p] + ',';
          });  

          axios.get( Settings.apiUrl + 'mutualfund?symbol='+symbols+'&api_token=' + Settings.apiToken)
          .then(function(response) {   
            console.log(response.data.data); 
            _self.api_data.push(response.data.data);  
             
          }).catch(error => { 
            console.log(error);
          }).finally(function() {
          _self.processing = false;
        })

      }); 
    }
 
    
  },

  

    
}); 