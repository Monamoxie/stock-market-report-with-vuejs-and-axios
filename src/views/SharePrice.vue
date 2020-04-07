<template>
  <div class="share-price">

    <div class="data-container" v-if="processing">
      <vue-simple-spinner :speed="spinnerData.spinSpeed" :size="spinnerData.spinSize" :line-size="spinnerData.lineSize"></vue-simple-spinner>
    </div>
       <!-- <div class="data-container" v-else="processing">
          <h3> SHARE PRICE </h3> 
          <div v-if="companies.length < 1" class="alert alert-danger text-center">
              No record found
          </div>
          <div class="" v-else="companies.length > 0">
              <table class="table table-striped table-hover table-condensed ">
                  <thead class="thead-theme">
                      <tr>
                          <th scope="col">Company Name</th> 
                          <th scope="col">Trading as</th>
                          <th scope="col">Current Price</th> 
                          <th scope="col"> Highest Today </th>
                          <th scope="col">Lowest Today </th>
                          <th scope="col"> S/E Market </th>
                          <th scope="col"> # </th>
                      </tr>
                  </thead>
                  <tbody>    
                      <tr v-for="(company, index) in companies">
                          <td>  
                              {{ company.name }}  
                          </td> 
                          <td> {{ company.symbol }}  </td>
                          <td> {{ company.currency }} {{ company.price }}  </td> 
                          <td> {{ company.currency }} {{ company.day_high }} </td>
                          <td> {{ company.currency }} {{ company.day_low }} </td>
                          <td> {{ company.stock_exchange_short }} </td>
                          <td> <button v-on:click="intraDayData(company.symbol)" class="btn btn-sm btn-success "> <i class="fa fa-external-link"></i> </button> </td>
                      </tr>       
                  </tbody>
              </table> 
              <div v-if="overlay">
                  <div class="overlay-banner">
                      <div class="overlay-content">
                          <p class="pull-right"><button v-on:click="overlay = false" class="btn btn-danger">X</button></p>
                          <div class="clearfix"></div>
                          <div v-if="!overlayLoader">
                              <p> Please wait... </p>
                          </div>
                          <div v-if="overlayLoader && overlayData != null ">
                              <div class="overlay-data">
                                  <h4> Trading Name: {{ overlayData.symbol }} </h4>
                                  <ul>
                                      <li>Stock Exchange Market: <span> {{ overlayData.stock_exchange_short }} </span></li> 
                                      <li>Stock Timezone: <span> {{ overlayData.timezone_name }} </span></li>
                                  </ul> 
                                  <div v-for="(data, key) in overlayData.intraday">
                                      <p><b> Date and Time: <span> {{ key }} </span></b> </p>
                                      <p> Opening Price: USD {{ data.open }} </p>
                                      <p> Closing Price: USD {{ data.close }} </p>
                                      <p> Highest Price Reached: USD {{ data.high }} </p>
                                      <p> Lowest Price Reached: USD {{ data.low }} </p>
                                      <p> Volume Traded:  {{ data.volume }} </p>
                                      <hr>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div> 
          </div>    
      </div> -->
  </div>
</template>

<script>


export default {
  name: 'SharePrice',

  data() {
        return { 
          spinnerData: {
            lineSize: 124,
            spinSize: 55,
            spinSpeed: 2,
          },  
            
          overlay: false,
          overlayLoader: false,
          overlayData: null
        } 
  },

  

  props: {
    processing: {
      type: Boolean,
      required: true,
    }
  },

  mounted() {
    this.$emit('loadSharePrice')
  }
  
}
</script>