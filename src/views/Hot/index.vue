<template>
  <div>
    <ul class="links">
      <li><router-link to="/hot/post">热门帖子</router-link></li>
      <li><router-link to="/hot/comments">热门评论</router-link></li>
      <li><router-link to="/hot/sign">签到排行</router-link></li>
    </ul>
    <div class="content" v-if="localType === 'post'">
      <div class="number">01</div>
      <div class="colums">
        <div class="title">如何零基础自学大前端成为月薪100K的男人</div>
        <div class="num">3.2k 评论</div>
      </div>
      <div>
        <img class="tImage" src="../../assets/456.jpg" />
      </div>
    </div>
    <div
      class="content"
      v-else-if="localType === 'comments' || localType === 'sign'"
    >
      <div class="number">01</div>
      <div>
        <img class="user" src="../../assets/456.jpg" />
      </div>
      <div class="colums">
        <div class="title">如何零基础自学大前端成为月薪100K的男人</div>
        <div class="num" v-if="localType === 'comments'">592 条评论</div>
        <div class="num" v-else>10:00:00</div>
      </div>
    </div>
    <div class="content" v-else>
      <div class="number">03</div>
      <div class="colums">
        <div class="title">如何零基础自学大前端成为月薪100K的男人</div>
        <div class="num">3.2k 评论</div>
      </div>
      <div>
        <img class="tImage" src="../../assets/456.jpg" />
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  name: 'hot',
  props: ['type'],
  data () {
    return {
      localType: '',
      current: 0
    }
  },
  watch: {
    type (newval, oldval) {
      console.log('🚀 ~ file: index.vue ~ line 17 ~ newval', newval)
      this.localType = newval
      this.current = 0
    }
  }
}
</script>

<style lang="scss" scoped>
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

.content {
  padding: 40px 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 140px;
  font-size: 30px;
  border-bottom: 1px solid #eee;
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
