const routes = [
    { path: '/share-price', component: sharePrice },
  
    { path: '/mutual-funds', component: mutualFunds },

    { path: '*', redirect: '/share-price' }
  ]
  
  
const router = new VueRouter({routes})