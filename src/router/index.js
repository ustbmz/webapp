import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Catalog from '../views/Home/catalog.vue'
import Detail from '../views/Detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Home,
    name: 'home',
    // 修复默认路由
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Catalog
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Catalog,
        props: true
      }
    ]
  },
  {
    path: '/detail/:tid',
    name: 'detail',
    // meta: { requiresAuth: true },
    component: Detail
  }
]

const router = new VueRouter({
  routes
})

export default router
