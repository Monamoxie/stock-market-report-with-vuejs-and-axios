var Settings = {

    /**
     * 
     * The default URL for the World Trading Data API
     * 
     * @string
     */
    apiUrl: 'https://api.worldtradingdata.com/api/v1/',

    /**
     * 
     * URL for the Intra Day Data
     * #@string
     */
    intraDayDataUrl: 'https://intraday.worldtradingdata.com/api/v1/',
    

    /**
     * 
     * Secret API token for all your requests
     * 
     * @string
     */
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
     * @array
     */
    stockCompanies() {
        return [
            ['AAPL', 'MSFT', 'CSCO', 'ADBE', 'INTC'],
            ['APA', 'GE', 'F', 'EBAY', 'ORCL'],
            ['YHOO', 'HPQ', 'GM', 'NVDA', 'KO'],
        ];
    },

    /**
     * 
     * Trading names of Mutual fund companiees
     * 
     * @array
     */
    mutualFundCompanies() {
        return [
            ['JEITX', 'CWGIX', 'FXAIX', 'SGENX', 'OWLSX'],
            ['MDISX', 'OGLBX', 'IVWIX', 'VFIAX', 'BEGRX'],
            ['MGGIX', 'TEMWX', 'JANRX', 'GMGEX', 'PAGLX'],
        ];
    }


        
};