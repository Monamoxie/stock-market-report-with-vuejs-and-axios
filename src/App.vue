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
                    <a href="/forex">
                        <li :class="path === '/forex' ? 'active' : ''"> 
                            <i class="fa fa-users"></i> Forex 
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
                        <span> <img src="../src/assets/images/dp.jpg" alt="Avatar" /> </span>  
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
                        :serverResponse="serverResponse"
                        :companiesData="companiesData"
                        :overlayData="overlayData"
                        :showOverlay="showOverlay"
                        :overlayLoader="overlayLoader"

                        @sharePrice="sharePrice"
                        @intraDayData="intraDayData"
                        @closeIntraDayOverlay="closeIntraDayOverlay"
                        @forex="forex"></router-view> 
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
      data: [],
      serverResponse: [],
      overlayData: [],
      showOverlay: false,
      overlayLoader: false,
    }
  },
 

  mounted() {
    this.path = this.$route.path
    this.processing = true
  },
  
  computed: {
    menuOpen() {
        return this.mobileMenu;
    },
    companiesData() {
      console.log(this.data.flat())
      return this.data.flat()
    },

  },
  methods: {

    mobileToggler() {
      this.mobileMenu = this.mobileMenu ? false : true;
    },

    sharePrice() {
      const [_self, stockCompanies] = [this, this.$store.getters.getStockCompanies];
      
      if(stockCompanies.length > 0) {
        stockCompanies.forEach((e, i) => {
            
            let box = stockCompanies[i];
            let symbols = '';
            
            box.forEach((c, p) => {
              symbols +=  ( p === box.length - 1 ) ? box[p] : box[p] + ',';
            });  

            _self.$store.dispatch('sharePrice', {
              symbols
            })
            .then((response) => {   
              _self.data.push(response.data.data); 
            })
            .catch(error => { 
              console.log(error);
              this.serverResponse = [{
              'status': 'error',
              'message': 'An error occured. Request was not processed',
              'errors': error.response.data.errors !== null && error.response.data.errors !== undefined ? Object.values(error.response.data.errors) : []
              }]   
            })
            .finally(() => {
              _self.processing = false
              
          })
          
        }); 
      }
       
    },

    intraDayData(data) {
      this.showOverlay = true
      this.overlayLoader = true
      this.$store.dispatch('intraDayData', {
          symbol: data.symbol
        })
        .then((response) => { 
          console.log(response.data.data)  
          this.overlayData = response.data.data
        })
        .catch(error => { 
          console.log(error)
          this.serverResponse = [{
          'status': 'error',
          'message': 'An error occured. Request was not processed',
          'errors': error.response.data.errors !== null && error.response.data.errors !== undefined ? Object.values(error.response.data.errors) : []
        }]   
      })
      .finally(() => { 
        this.overlayLoader = false
      })
       
    },

    closeIntraDayOverlay() {
      this.showOverlay = false
    },

    forex() {
        const [_self] = [this];
          _self.$store.dispatch('forex')
          .then((response) => {   
            _self.data.push(response.data); 
          })
          .catch(error => { 
            console.log(error);
            this.serverResponse = [{
            'status': 'error',
            'message': 'An error occured. Request was not processed',
            'errors': error.response.data.errors !== null && error.response.data.errors !== undefined ? Object.values(error.response.data.errors) : []
            }]   
          })
          .finally(() => {
            _self.processing = false                
          }) 
        
        
 
         
            
    }

    

  },
}
</script>
