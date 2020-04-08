<template>
  <div class="share-price">

    <div class="data-container text-center" v-if="processing">
      <div class="lds-ring mt-5">
        <div></div><div></div><div></div><div></div>
      </div>
      <p> Loading...</p>
    </div>

    <div class="data-container" v-else>

       <div v-if="serverResponse.length > 0 && serverResponse[0].status === 'error'" class="alert alert-danger error-container">
            <h5 class="alert-heading text-center">{{ serverResponse[0].message  }}</h5> <hr>
            <div v-if="serverResponse[0].errors.length > 0">
                <p v-for="(error, key) in serverResponse[0].errors" :key="key">
                    {{ error[0] }}
                </p>
            </div>
        </div>

        <div v-else>
            <h3> SHARE PRICE </h3> 
            <div v-if="companiesData.length < 1" class="alert alert-danger text-center">
                No record found
            </div>
            <div class="" v-else>
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
                        <tr v-for="(company, index) in companiesData" :key="index">
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

                <div v-if="showOverlay">
                    <div class="overlay-banner">
                        <div class="overlay-content">
                            <p class="pull-right">
                              <button v-on:click="closeIntraDayOverlay" class="btn btn-danger">X</button>
                            </p>
                            <div class="clearfix"></div>

                            <div v-if="overlayLoader">
                              <div class="lds-ring">
                                <div></div><div></div><div></div><div></div>
                              </div> 
                              <p> Please wait... </p>
                            </div>

                            <div v-else>
                                <div v-if="overlayData != null ">
                                  <div class="overlay-data">
                                    <h4> Trading Name: {{ overlayData.symbol }} </h4>
                                    <div v-for="(data, key) in overlayData" :key="key">
                                        <ul>
                                          <li>Stock Exchange Market: <span> <b>{{ data.stock_exchange_short }}</b> </span></li> 
                                          <li>Stock Timezone: <span> <b>{{ data.timezone_name }}</b> </span></li>
                                        </ul>  
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
                               <div v-else>
                                    <div class="alert alert-danger text-center">
                                        No record found
                                    </div>
                                </div>
                            </div> 

                        </div>
                    </div>
                </div> 
            </div>  
        </div>

        
    </div>
  </div>
</template>

<script>


export default {
  name: 'SharePrice',
 
  props: {
    processing: {
      type: Boolean,
      required: true,
    },
    serverResponse: {
      type: Array,
      required: true,
    },
    companiesData: {
      type: Array,
      required: true
    },
    overlayData: {
      type: Array
    },
    showOverlay: {
      type: Boolean
    },
    overlayLoader: {
      type: Boolean
    }
  },

  methods: {
    intraDayData(symbol) {
      this.$emit('intraDayData', {
        symbol
      })
    },
    closeIntraDayOverlay() {
      this.$emit('closeIntraDayOverlay')
    }
  },

  mounted() {
    this.$emit('sharePrice')
  }
  
}
</script>