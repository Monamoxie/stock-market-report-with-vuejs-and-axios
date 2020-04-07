import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
    defaultApiUrl: 'https://api.worldtradingdata.com/api/v1/',
    
    intraDayApiUrl: 'https://intraday.worldtradingdata.com/api/v1/',

    apiToken: 'f05ID2ijzPrvuOcZ2hgUWWrXAcJITdrI3R2S7A4kuNTrWdNLzSKfwGfaL9Fz',

    /**
     *  IMPORTANT NOTICE: 
     *  The FREE API key only allows a maximum of 5 company info per request
     *  So sending a request with more than 5 company names will only return data for the first 5, and omit the rest
     *  Peradventure you need data for more than 5, add an array to the method below with a maximum of just 5 companies as elements
    */ 
    /**
     * 
     * Trading names of Publicly traded comapanies
     * 
     * @type Array
     */
    stockCompanies: [
        ['AAPL', 'MSFT', 'CSCO', 'ADBE', 'INTC'],
        ['APA', 'GE', 'F', 'EBAY', 'ORCL'],
        ['YHOO', 'HPQ', 'GM', 'NVDA', 'KO'],
    ],

    /**
     * 
     * Trading names of Mutual fund companiees
     * 
     * @type Array
     */
    mutualFundCompanies: [
          ['JEITX', 'CWGIX', 'FXAIX', 'SGENX', 'OWLSX'],
          ['MDISX', 'OGLBX', 'IVWIX', 'VFIAX', 'BEGRX'],
          ['MGGIX', 'TEMWX', 'JANRX', 'GMGEX', 'PAGLX'],
    ]
    
  },

  getters: {
    
    /**
     * 
     * @param state
     * @return String
     * 
     */
    getDefaultApiUrl(state) {
      return state.defaultApiUrl
    },


    /**
     * 
     * @param state
     * @return String
     * 
     */
    getIntraDayApiUrl(state) {
      return state.intraDayApiUrl
    },

    /**
     * 
     * @param state
     * @return String
     * 
     */
    getApiToken(state) {
      return state.apiToken
    },
    

    /**
     * 
     * @param state
     * @return String
     * 
     */
    getStockCompanies(state) {
      return state.stockCompanies
    },

    /**
     * 
     * @param state
     * @return Array
     * 
     */
    getMutualFundCompanies(state) {
      return state.mutualFundCompanies
    },

  },


  mutations: {

  },
  actions: {
    sharePrice(context, payload) {
      alert(context.getters.getApiToken)
    //   return new Promise((resolve, reject) => {
    //     // axios.get(Settings.apiUrl + 'stock?symbol='+symbols+'&api_token=' + Settings.apiToken, {
    //     //     name: credentials.name,
    //     //     email: credentials.email,
    //     //     password: credentials.password
    //     // })
    //     // .then(response => { 
    //     //     resolve(response)
    //     // })
    //     // .catch(errors => {
    //     //     console.log(errors)
    //     //     reject(errors)
    //     // })
    // })
    }
  },
  modules: {

  }
})
