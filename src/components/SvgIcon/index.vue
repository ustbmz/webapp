<!--
 * @Author: Mew
 * @Date: 2021-08-25 23:07:20
 * @LastEditTime: 2021-08-25 23:13:15
 * @Description:
 * @FilePath: \webapp\src\components\SvgIcon\index.vue
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use xlink:href="symbolName"></use>
  </svg>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    class: {
      type: String,
      default: ''
    }
  },
  computed: {
    svgClass () {
      if (this.class) {
        return 'svg-icon' + this.class
      } else {
        return 'svg-icon'
      }
    },
    symbolName () {
      return `icon+${this.icon}`
    }
  }
}
</script>

<style>
</style>
