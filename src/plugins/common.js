import Vue from 'vue'
// import Header from '@/components/Header'

// Vue.component('my-header', Header)

const componentsContext = require.context('@/components', true, /.vue$/)
console.log('componentsContext', componentsContext)
componentsContext.keys().forEach((component) => {
  const componentConfig = componentsContext(component).default
  console.log('componentsConfig', componentConfig)
  Vue.component(componentConfig.name, componentConfig)
})
