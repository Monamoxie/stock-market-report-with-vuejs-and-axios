<template>
  <div class="mutual-funds">

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
            <h3> FOREX </h3> 
            <div v-if="companiesData.length < 1" class="alert alert-danger text-center">
                No record found
            </div>
            <div class="" v-else>
                <div v-for="(forexData, index) in companiesData" :key="index">
                    <h5 class="text-center text-default"> Base Currency: <b>1 {{ forexData.base }}</b> </h5> 
                    <table class="table table-striped table-hover table-condensed text-center table-forex">
                        <thead class="thead-theme">
                            <tr>
                                <th scope="col">Currency</th> 
                                <th scope="col">Exchange Rate</th> 
                            </tr>
                        </thead>
                        <tbody>    
                            <tr v-for="(currency, key) in forexData.data" :key="key">
                              <td> {{ key }}</td>
                              <td> {{ currency }}</td> 
                            </tr>       
                        </tbody>
                    </table> 
                </div> 
            </div>  
        </div>

        
    </div>
  </div>
</template>

<script>
 
export default {
  name: 'Forex',

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
    }
  },
  
  mounted() { 
    this.$emit('forex')
  }
  
}
</script>