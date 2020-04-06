<template>
  <div id="app">
    <div class="wrapper" id="stock-handler">

        <div class="left-wrapper pull-left" :class="[ mobileMenu ? 'mobile-menu ' : '' ]">
            <div class="side-navigation">
                <div class="logo-wrapper">
                   <h2> Stock Xchanger </h2> 
                </div>
                <ul class="side-url-links"> 
                    <router-link to="/share-price">
                        <li v-on:click="prepRequest(['share-price'])" v-bind:class="requestType === 'share-price' ? 'active' : ''"> 
                            <i class="fa fa-bar-chart"></i> Share Price 
                        </li>
                    </router-link>
                    <router-link to="/mutual-funds">
                        <li v-on:click="prepRequest(['mutual-funds'])" v-bind:class="requestType === 'mutual-funds' ? 'active' : '' "> 
                            <i class="fa fa-users"></i> Mutual Funds 
                        </li>
                    </router-link> 
                    <a href="https://www.worldtradingdata.com/documentation#introduction" target="_blank">
                        <li v-on:click="prepRequest(['docs'])"> <i class="fa fa-cube"></i> Documentation </li> 
                    </a>
                    <a href="https://github.com/Monamoxie/stock-market-report-with-vuejs-and-axios" target="_blank">
                        <li v-on:click="prepRequest(['repo'])"> <i class="fa fa-suitcase"></i> Github Repo</li>  
                    </a>
                    
                </ul> 
            </div>
        </div>

        <div class="right-wrapper pull-right">
            <div class="top-navigation">
                <span class="mobile-toggable" v-on:click="mobileToggler"> <i class="fa fa-bars"></i> </span>
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
                        <router-view></router-view> 
                </div>  

            </div>
        </div>
        <div class="clearfix"></div>
 
    </div>
    <router-view/>
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
    }
  }
}
</script>
