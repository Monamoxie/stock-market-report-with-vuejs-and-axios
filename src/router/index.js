import Vue from 'vue'
import VueRouter from 'vue-router'
import SharePrice from '../views/SharePrice.vue'
import MutualFunds from '../views/MutualFunds.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: SharePrice
  },
  {
    path: '/mutual-funds',
    name: 'MutualFunds',
    component: MutualFunds
  },

  { 
    path: '*', 
    redirect: '/share-price'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
