import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Catalog from '../views/Home/catalog.vue'
import Detail from '../views/Detail'
import Login from '../views/User/login.vue'
import Reg from '../views/User/reg.vue'
import Forget from '../views/User/forget.vue'
import User from '../views/User/user.vue'
import Hot from '../views/Hot/index.vue'
import Msg from '../views/Msg/index.vue'

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
    component: Detail
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  },
  {
    path: '/hot/:type',
    name: 'hot',
    component: Hot,
    props: true
  },
  {
    path: '/msg/:type',
    name: 'msg',
    component: Msg,
    props: true
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active'
})

export default router
