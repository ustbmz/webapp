import {
  SET_SID,
  SET_TOKEN,
  SET_USER,
  SET_ISLOGIN,
  SET_HIDE,
  SET_MSG
} from '../mutation-types'

import { getCode, login } from '@/api/login'
import { v4 as uuidv4 } from 'uuid'

export default {
  namespaced: true,
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    isHide: false,
    ws: null,
    num: 0
  },
  mutations: {
    [SET_SID] (state, value) {
      state.sid = value
    },
    [SET_TOKEN] (state, value) {
      if (value === '') return
      state.token = value
      localStorage.setItem('token', value)
    },
    // 设置用户的基本信息
    [SET_USER] (state, value) {
      state.userInfo = value
      // 本地存储用户的基本信
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 设置isLogin的状态
    [SET_ISLOGIN] (state, value) {
      state.isLogin = value
    },
    [SET_HIDE] (state, value) {
      state.isHide = value
    },
    [SET_MSG] (state, value) {
      state.num = value.message ? value.message : 0
    }
  },
  getters: {
    user: state => state.userInfo,
    isLogin: state => state.isLogin,
    token: state => state.token,
    sid: state => state.sid,
    isHide: state => state.isHide
  },
  actions: {
    message ({ commit }, msg) {
      commit('setMessage', msg)
    },
    async getCode ({ commit }) {
      let sid = ''
      if (localStorage.getItem('sid')) {
        sid = localStorage.getItem('sid')
      } else {
        sid = uuidv4()
        localStorage.setItem('sid', sid)
      }

      commit('SET_SID', sid)
      const result = await getCode(sid)
      return result
    },
    async login ({ commit, state }, payload) {
      const result = await login({
        ...payload,
        sid: state.sid
      })
      if (result.code === 200 && result.token) {
        const user = result.data
        user.username = payload.username
        commit('SET_TOKEN', result.token)
        commit('SET_USER', user)
        alert(JSON.stringify(user))
        commit('SET_ISLOGIN', true)
      }
      return result
    }
  }

}
