import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Catalog from '../views/Home/catalog.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/:catalog',
        component: Catalog
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
