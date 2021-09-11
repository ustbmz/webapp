<template>
  <div>
    <ul class="links" ref="links">
      <li><router-link to="/hot/post">热门帖子</router-link></li>
      <li><router-link to="/hot/comments">热门评论</router-link></li>
      <li><router-link to="/hot/sign">签到排行</router-link></li>
    </ul>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  name: 'hot',
  props: ['type'],
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.itemDiv {
  overflow: hidden;
  margin-bottom: 120px;
  .no-more {
    padding: 40px;
    font-size: 26px;
    line-height: 60px;
    text-align: center;
    color: #999;
  }
}
.links {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  height: $header-height;
  line-height: $header-height;
  box-shadow: 0 0 10px rgb(112, 94, 94, 0.1);
}

.active {
  color: $primary-color;
  position: relative;
  &:after {
    position: absolute;
    display: inline-block;
    content: '';
    width: 97px;
    height: 4px;
    background: $primary-color;
    bottom: -30px;
    right: 15px;
  }
}

.select {
  ul {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    padding-top: 20px;
    padding-left: 40px;
    li {
      background: lightgray;
      font-size: 24px;
      border-radius: 12px;
      margin: 5px 20px;
      padding: 15px;
      color: #666;
      &.activeItem {
        color: #fff;
        background: $primary-color;
      }
    }
  }
}

.content {
  padding: 20px 35px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 140px;
  font-size: 30px;
  .number {
    display: flex;
    flex-flow: column;
    justify-content: center;
    font-weight: bold;
    color: #e9c259;
  }
  .colums {
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding: 20px;
    height: 100px;
    .title {
      font-weight: bold;
      padding-bottom: 20px;
    }
    .num {
      font-size: 24px;
      color: #666;
    }
  }
  .user {
    width: 94px;
    height: 94px;
    border-radius: 50%;
    padding: 20px 10px 20px 20px;
  }
  .tImage {
    width: 240px;
    height: 140px;
    border-radius: 10px;
  }
}
</style>
