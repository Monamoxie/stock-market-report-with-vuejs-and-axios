import Vue from 'vue'
import VueRouter from 'vue-router'
import SharePrice from '../views/SharePrice.vue'
import Forex from '../views/Forex.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: SharePrice
  },
  {
    path: '/forex',
    name: 'forex',
    component: Forex
  },

  { 
    path: '*', 
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
