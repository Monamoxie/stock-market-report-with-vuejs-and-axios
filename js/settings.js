var settings = {

    API_URL: 'https://api.worldtradingdata.com/api/v1/',

    API_TOKEN: 'f05ID2ijzPrvuOcZ2hgUWWrXAcJITdrI3R2S7A4kuNTrWdNLzSKfwGfaL9Fz',

    /** 
     * FREE API key only permits a max of 5 company info per request
     *  A group of 5 companies are sent per request to retrieve data
     * To get more than 5 returns per requst, group companies into arrays with max of 5 elements
    */ 
   LISTOFCOMPANIES() {
        return [
            ['AAPL', 'MSFT', 'CSCO', 'ADBE', 'INTC'],
            ['APA', 'GE', 'F', 'EBAY', 'ORCL'],
            ['YHOO', 'HPQ', 'GM', 'NVDA', 'KO'],
        ];
    }
        
}