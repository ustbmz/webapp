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
import Edit from '../views/User/edit.vue'

import HotPost from '../views/Hot/hotPost.vue'
import HotComments from '../views/Hot/hotComments.vue'
import HotSign from '../views/Hot/hotSign.vue'

// 路由守卫
import store from '@/store'
import moment from 'dayjs'
import { SET_ISLOGIN, SET_USER, SET_TOKEN } from '@/store/mutation-types'
import { MessageBox } from 'mint-ui'

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
    component: Detail,
    meta: { index: 1 }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: { index: 0 }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { index: 1 }
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    meta: { index: 1 }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget,
    meta: { requiresAuth: true, index: 2 }
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit,
    meta: { requiresAuth: true, index: 1 }

  },
  {
    path: '/hot',
    name: 'hot',
    component: Hot,
    redirect: '/hot/post',
    children: [
      {
        path: 'post',
        name: 'post',
        component: HotPost
      },
      {
        path: 'comments',
        name: 'comments',
        component: HotComments
      },
      {
        path: 'sign',
        name: 'sign',
        component: HotSign
      }
    ]

  },
  {
    path: '/msg/:type',
    name: 'msg',
    component: Msg,
    meta: { requiresAuth: true },
    props: true
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== 'undefined' && token !== null) {
    // const payload = jwt.decode(token)
    const payload = JSON.parse(atob(token.split('.')[1]))
    // console.log('token isnot timeout : ', moment().isBefore(moment(payload.exp * 1000)))
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('user/' + SET_USER, userInfo)
      store.commit('user/' + SET_ISLOGIN, true)
      store.commit('user/' + SET_TOKEN, token)
      // if (!store.state.ws) {
      //   store.commit(INIT_WEBSOCKET, {})
      // }
    } else {
      localStorage.clear()
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const islogin = store.state.user.isLogin
    if (islogin) {
      next()
    } else {
      MessageBox.confirm('请先进行登录，是否跳转至登录界面').then(({ value, action }) => {
        console.log(action)
        next('login')
      }).catch((cancel) => {
        console.log(cancel)
      })
    }
  } else {
    next()
  }
})

export default router
