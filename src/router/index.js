import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Catalog from '../views/Home/catalog.vue'
import Detail from '../views/Detail'
import Login from '../views/User/login.vue'
import Reg from '../views/User/reg.vue'
import Forget from '../views/User/forget.vue'
import User from '../views/User/user.vue'

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
  },
  {
    path: '/user',
    name: 'user',
    // meta: { requiresAuth: true },
    component: User
  },
  {
    path: '/login',
    name: 'login',
    // meta: { requiresAuth: true },
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    // meta: { requiresAuth: true },
    component: Reg
  },
  {
    path: '/forget',
    name: 'forget',
    // meta: { requiresAuth: true },
    component: Forget
  }
]

const router = new VueRouter({
  routes
})

export default router
