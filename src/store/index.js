import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

///axios.defaults.withCredentials = false

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
        ['APA', 'GE', 'F', 'ADBE', 'ORCL'],
        //['MSFT', 'HPQ', 'GM', 'NVDA', 'KO'],
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
 
  actions: {
    sharePrice(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(context.getters.getDefaultApiUrl + 'stock?symbol='+payload.symbols+'&api_token=' + context.getters.getApiToken, 
        { useCredentails: true })
        .then(response => { 
            resolve(response)
        })
        .catch(errors => { 
          reject(errors)
        })
      })
    },

    intraDayData(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(context.getters.getIntraDayApiUrl + 'stock?symbol='+payload.symbol+'&api_token=' + context.getters.getApiToken +  '&interval=60&range=1')
        .then(response => { 
            resolve(response)
        })
        .catch(errors => { 
          reject(errors)
        })
      })
    },

    forex(context) {
      return new Promise((resolve, reject) => {
        // symbol='+payload.symbols+'&api_token=' + context.getters.getApiToken +  '&sort_by=list_order
        axios.get(context.getters.getDefaultApiUrl + 'forex?base=USD&api_token=' + context.getters.getApiToken)
        .then(response => { 
            resolve(response)
        })
        .catch(errors => { 
          reject(errors)
        })
      })
    },

  }, 
})
