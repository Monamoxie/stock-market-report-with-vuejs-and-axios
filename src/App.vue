<template>
  <div id="app">
    <div class="wrapper" id="stock-handler">

        <div class="left-wrapper pull-left" :class="[ mobileMenu ? 'mobile-menu ' : '' ]">
            <div class="side-navigation">
                <div class="logo-wrapper">
                   <h2> Stock Xchanger </h2> 
                </div>
                <ul class="side-url-links"> 
                    <a href="/">
                        <li :class="path === '/' ? 'active' : ''"> 
                            <i class="fa fa-bar-chart"></i> Share Price 
                        </li>
                    </a>
                    <a href="/mutual-funds">
                        <li :class="path === '/mutual-funds' ? 'active' : ''"> 
                            <i class="fa fa-users"></i> Mutual Funds 
                        </li>
                    </a> 
                    <a href="https://www.worldtradingdata.com/documentation#introduction" target="_blank">
                        <li> <i class="fa fa-cube"></i> Documentation </li> 
                    </a>
                    <a href="https://github.com/Monamoxie/stock-market-report-with-vuejs-and-axios" target="_blank">
                        <li> <i class="fa fa-suitcase"></i> Github Repo</li>  
                    </a>
                    
                </ul> 
            </div>
        </div>

        <div class="right-wrapper pull-right">
            <div class="top-navigation">
                <span v-if="!menuOpen" class="mobile-toggable" v-on:click="mobileToggler"> <i class="fa fa-bars"></i> </span>
                <span v-else class="mobile-toggable" v-on:click="mobileToggler"> <i class="fa fa-bars"></i> </span>

                <ul class="top-url-links">  
                    <li class="avatar-wrap"> 
                        <span> <img src="images/dp.jpg" alt="Avatar" /> </span>  
                    </li> 
                    <div class="clearfix"></div>
                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="main-content"> 
 
                <div class="data-wrapper" id="app">
                    <div class="data-header"> 
                        <label class=""> Today </label> 
                        <span class="month-of-year" > {{ todaysDate }} </span> 
                    </div>  
                        <router-view 
                        :processing="processing"
                        @sharePrice="sharePrice" 
                        @loadMutualFunds="loadMutualFunds"></router-view> 
                </div>  

            </div>
        </div>
        <div class="clearfix"></div>
 
    </div>
     
  </div>
</template>

<style>
@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
@import url('assets/css/style.css');
</style>
<script>


export default {

  name: 'App',

  data() {
    return {
      mobileMenu: false,
      processing: true,
      todaysDate: new Date(),
      path: '/',
      apiData: [],
    }
  },
 

  mounted() {
    this.path = this.$route.path
    this.processing = true
  },
  
  computed: {
    menuOpen() {
        return this.mobileMenu;
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
 
    mobileToggler() {
      this.mobileMenu = this.mobileMenu ? false : true;
    },

    sharePrice() {
      const [_self, stockCompanies] = [this, this.$store.getters.getStockCompanies];
      
      if(stockCompanies.length > 0) {
        stockCompanies.forEach(function(e, i) {
            
            let box = stockCompanies[i];
            let symbols = '';
            
            box.forEach(function(c, p){
              symbols +=  ( p === box.length - 1 ) ? box[p] : box[p] + ',';
            });  

            _self.$store.dispatch('sharePrice', {
              symbols
            })

            axios.get( )
            .then(function(response) {   
              _self.apiData.push(response.data.data);     
            })
            .catch(error => { 
              console.log(error);
            })
            .finally(function() {
            _self.processing = false;
          })
        }); 
      }
       
    },
    loadMutualFunds() {
        alert('nutual funds');
    }

    

  },
}
</script>
