<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { forbidScroll } from '@/utils/forbidScroll'

export default {
  mounted () {
    window.forbidScroll = forbidScroll
  }
}
</script>

<style lang="scss">
img {
  vertical-align: middle;
  max-width: 100%;
}
pre {
  position: relative;
  margin: 0;
  padding: 0 15px;
  line-height: 35px;
  background: #f2f2f2;
  color: #333;
  font-size: 24px;
  border: none;
  border-left: 5px solid #ddd;
}
</style>
