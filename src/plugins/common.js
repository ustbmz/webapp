import Vue from 'vue'
// import Header from '@/components/Header'

// Vue.component('my-header', Header)

const componentsContext = require.context('@/components', true, /index.vue$/)
console.log('componentsContext', componentsContext)
componentsContext.keys().forEach((component) => {
  const componentsConfig = componentsContext(component).default
  console.log('componentsConfig', componentsConfig)
  Vue.component(componentsConfig.name, componentsConfig)
})
