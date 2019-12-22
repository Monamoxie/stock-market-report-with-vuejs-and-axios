
const app = new Vue({

  el: '#stock-handler',
    
  data: { 
    processing: true,
    todays_date: new Date(),    
    requestType: 'share-price'
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
      this.requestType = entities[0];  
    },

  },
  
  router  
}).$mount('#stock-handler'); 