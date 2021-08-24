import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Cell } from 'mint-ui'

Vue.component(Cell.name, Cell)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
