<template>
  <div
    class="header"
    :style="{ 'z-index': zIndex, 'background-color': bkColor }"
  >
    <div class="head-left" @click="goback()" v-if="hasBack">
      <slot name="h-left">
        <svg-icon icon="arrow-left"></svg-icon>
        <span class="left-text" v-if="backText">{{ backText }}</span>
      </slot>
    </div>
    <div class="head-center">
      <slot name="h-center">
        <span>{{ title }}</span>
      </slot>
    </div>
    <div class="head-right">
      <slot name="h-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-header',
  props: {
    title: {
      type: String,
      default: 'test'
    },
    backText: {
      type: String,
      default: '返回'
    },
    back: {
      type: Function
    },
    bkColor: {
      type: String,
      default: ''
    },
    zIndex: {
      type: String,
      default: ''
    },
    hasBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goback () {
      alert('goback')
      if (this.back) {
        this.back()
        return
      }
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: flex;
  width: 100%;
  left: 0;
  top: 0;
  box-shadow: 0 0 5px rgb(0, 0, 0, 0.1);
  z-index: 100;
  height: $header-height;
  line-height:$header-height;
  font-size: 16px;
}
.head-center{
  width: 60%;
  text-align: center;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.head-left,
.head-right {
  position: absolute;
  top: 0;
  padding: 0 10px;
}

.head-left {
  left: 0;
}
.head-right {
  right: 0;
}
</style>
