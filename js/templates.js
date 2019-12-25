/**
 * Share price data component
 */
const sharePrice = Vue.component('share-price', {
    props: ['requestType'],
    data: function () {
        return {
            api_data: [],
            processing: false, 
            line_size: 124,
            spin_size: 55,
            spin_speed: 2, 
            overlay: false,
            overlay_loader: false,
            overlay_data: null
        } 
    },

    mounted: function() { 
        this.processing = true; 
        this.sharePrice();  
    },
    
    computed: {
        companies() {  
          return this.api_data.flat();
        }
    }, 

    methods: {
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
              })
              .catch(error => { 
                console.log(error);
              })
              .finally(function() {
              _self.processing = false;
            })
    
          });  

          
        },
        
        intraDayData(symbol) {
            const _self = this; 
            _self.overlay = true;
            _self.overlay_loader = false; 
            axios.get( Settings.intraDayDataUrl + 'intraday?symbol='+symbol+'&api_token=' + Settings.apiToken + '&interval=60&range=1')
              .then(function(response) {   
                _self.overlay_data = response.data;
                _self.overlay_loader = true;  
                console.log(response.data);  
              })
              .catch(error => { 
                console.log(error);
              }) 
        }
    
    },
      
    template: 
        `
        <div class="data-container" v-if="processing">
            <vue-simple-spinner :speed="spin_speed" :size="spin_size" :line-size="line_size"></vue-simple-spinner>
        </div>
        <div class="data-container" v-else="processing">
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
                            <div v-if="!overlay_loader">
                                <p> Please wait... </p>
                            </div>
                            <div v-if="overlay_loader && overlay_data != null ">
                                <div class="overlay-data">
                                    <h4> Trading Name: {{ overlay_data.symbol }} </h4>
                                    <ul>
                                        <li>Stock Exchange Market: <span> {{ overlay_data.stock_exchange_short }} </span></li> 
                                        <li>Stock Timezone: <span> {{ overlay_data.timezone_name }} </span></li>
                                    </ul> 
                                    <div v-for="(data, key) in overlay_data.intraday">
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
        </div>`,
});




/**
 * Share price data component
 */
const mutualFunds = Vue.component('nutual-funds', {
    data: function () {
        return {
            api_data: [],
            processing: false, 
            line_size: 124,
            spin_size: 55,
            spin_speed: 2, 
        } 
    },

    mounted: function() { 
        this.processing = true; 
        this.mutualFunds();  
    },
    
    computed: {
        companies() {  
          return this.api_data.flat();
        }
    }, 

    methods: {
       
        mutualFunds() {

        const [_self, mutualFundCompanies] = [this, Settings.mutualFundCompanies()];
        
        mutualFundCompanies.forEach(function(e, i) {
            let box = mutualFundCompanies[i];
            let symbols = '';
            box.forEach(function(c, p){
                symbols +=  ( p === box.length - 1 ) ? box[p] : box[p] + ',';
            });  

            axios.get( Settings.apiUrl + 'mutualfund?symbol='+symbols+'&api_token=' + Settings.apiToken + '&sort_by=list_order')
            .then(function(response) {    
                _self.api_data.push(response.data.data);  
                
            }).catch(error => { 
                console.log(error);
            }).finally(function() {
            _self.processing = false;
            })

        }); 
    },
     
      },
      
    template: 
        `
        <div class="data-container" v-if="processing">
            <vue-simple-spinner :speed="spin_speed" :size="spin_size" :line-size="line_size"></vue-simple-spinner>
        </div>
        <div class="data-container" v-else="processing"> 
            <div v-if="companies.length < 1" class="alert alert-danger text-center">
                No record found
            </div>
            <div class="" v-else="companies.length > 0">
                <h3> MUTUAL FUNDS </h3> 
                <table class="table table-striped table-hover table-condensed ">
                    <thead class="thead-theme">
                        <tr>
                            <th scope="col">Company Name</th> 
                            <th scope="col">Trading as</th>
                            <th scope="col">Current Price</th>  
                            <th scope="col"> Income Dividend </th>
                            <th scope="col"> Expense Ratio </th>
                            <th scope="col">Capital gain</th>
                        </tr>
                    </thead>
                    <tbody>    
                        <tr v-for="(company, index) in companies">
                            <td v-bind:title="company.name">  
                                <span v-if="company.name.length < 40"> {{ company.name }}   </span>
                                <span v-else> {{ company.name.substring(0, 40) + "..." }}</span> 
                            </td> 
                            <td> {{ company.symbol }}  </td>
                            <td> {{ company.currency }} {{ company.price }}  </td> 
                            <td> {{ company.income_dividend }}</td>
                            <td> {{ company.expense_ratio }}</td>
                            <td> {{ company.capital_gain }}</td>
                        </tr>       
                    </tbody>
                </table> 
            </div>    
        </div>`,
});
  
  
  