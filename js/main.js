
const app = new Vue({

  el: '#stock-handler',
    
  data: { 
    processing: true,
    todaysDate: new Date(),    
    requestType: 'share-price',
    mobileMenu: false
  }, 
  computed: {

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
      this.mobileMenu = false; 
    },

    mobileToggler() {
      this.mobileMenu = this.mobileMenu ? false : true;
    }

  },
  
  router  
}).$mount('#stock-handler'); 