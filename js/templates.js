
/**
 * Share price data component
 */
const mutualFunds = Vue.component('nutual-funds', {
    data: function () {
        return {
            apiData: [],
            processing: false, 
            lineSize: 124,
            spinSize: 55,
            spinSpeed: 2, 
        } 
    },

    mounted: function() { 
        this.processing = true; 
        this.mutualFunds();  
    },
    
    computed: {
        companies() {  
          return this.apiData.flat();
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
                _self.apiData.push(response.data.data);  
                
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
            <vue-simple-spinner :speed="spinSpeed" :size="spinSize" :line-size="lineSize"></vue-simple-spinner>
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
  
  
  