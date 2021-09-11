<template>
  <div id="app">
    <transition :name="direction">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import forbidScroll from '@/utils/forbidScroll'

export default {
  data () {
    return {
      direction: ''
    }
  },
  mounted () {
    // window.forbidScroll = forbidScroll
    const _this = this
    window.addEventListener(
      'onorientationchange' in window ? 'orientation' : 'resize',
      function () {
        if (window.orientation === 90 || window.orientation === -90) {
          _this.$Toast('请在竖屏模式下进去浏览')
        }
      },
      false
    )
  },
  watch: {
    $route (to, from) {
      if (from.name === null) {
        return
      }
      if (to.meta.index < from.meta.index) {
        this.direction = 'slide-right'
      } else {
        if (!to.meta.index) {
          this.direction = ''
          return
        }
        this.direction = 'slide-left'
      }
    }
  }
}
</script>

<style lang="scss">
.slide-right-enter-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 0.5s;
  will-change: transform;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active,
.slide-right-leave-to {
  transform: translateX(100%);
}
.slide-right-enter-to,
.slide-right-leave {
  transform: translateX(0);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active,
.slide-left-leave-to {
  transform: translateX(-100%);
}
.slide-left-enter-to,
.slide-left-leave {
  transform: translateX(0);
}

@media (min-width: $break-super) and (orientation: landscape) {
  html::before {
    background: #333;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999;
    top: 0;
    left: 0;
    content: '';
  }
  body:before {
    background-image: url('./assets/images/orientation.png');
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -140px 0 0 -50px;
    z-index: 9999;
    color: #fff;
    height: 200px;
    width: 100px;
    content: '';
  }
  body:after {
    content: '\4e3a\4e86\66f4\597d\7684\4f53\68c0\ff0c\8bf7\5c06\624b\673a\7ad6\5c4f\6d4f\89c8';
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 30px;
    z-index: 9999;
    color: #fff;
    margin-top: 40px;
    text-align: center;
    font-size: 18px;
  }
}

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

.input-wrap {
  .code {
    height: 80px;
  }
  svg {
    width: 240px;
    height: 70px;
  }
}

ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}

a {
  color: #999;
  text-decoration: none;
}

@for $i from 0 to 5 {
  .pd#{$i} {
    padding: $i * 10 + px;
  }
  .pl#{$i} {
    padding-left: $i * 10 + px;
  }
  .pr#{$i} {
    padding-right: $i * 10 + px;
  }
  .pt#{$i} {
    padding-top: $i * 10 + px;
  }
  .pb#{$i} {
    padding-bottom: $i * 10 + px;
  }
  .mt#{$i} {
    margin-top: $i * 10 + px;
  }
  .mr#{$i} {
    margin-right: $i * 10 + px;
  }
  .ml#{$i} {
    margin-left: $i * 10 + px;
  }
  .mg#{$i} {
    margin: $i * 10 + px;
  }
}
</style>
