import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './utils/filtter'

import 'normalize.css/normalize.css'

import '@/plugins/mint-ui'
import '@/plugins/common'
import '@/assets/styles/theme.scss'

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
