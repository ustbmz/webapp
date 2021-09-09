<template>
  <div>
    <ul class="links">
      <li><router-link to="/msg/reply">回复</router-link></li>
      <li><router-link to="/msg/hands">点赞</router-link></li>
    </ul>

    <div class="wrapper">
      <div class="content">
        <div>
          <img class="user" src="../../assets/456.jpg" />
        </div>
        <div class="colums">
          <div class="title">用户昵称</div>
          <div class="num" v-if="localType==='reply'">1分钟前 回复了你</div>
          <div class="num" v-else>1分钟前 赞了你</div>
        </div>
        <div class="reply" v-if="localType==='reply'"><svg-icon icon="editor"></svg-icon>回复</div>
      </div>
      <div class="post">
        <div class="post-title">帖子标题</div>
        <div class="desc">
          帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="content">
        <div>
          <img class="user" src="../../assets/456.jpg" />
        </div>
        <div class="colums">
          <div class="title">用户昵称</div>
          <div class="num" v-if="localType==='reply'">1分钟前 回复了你</div>
          <div class="num" v-else>1分钟前 赞了你</div>
        </div>
        <div class="reply" v-if="localType==='reply'"><svg-icon icon="editor"></svg-icon>回复</div>
      </div>
      <div class="post">
        <div class="post-title">帖子标题</div>
        <div class="desc">
          帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="content">
        <div>
          <img class="user" src="../../assets/456.jpg" />
        </div>
        <div class="colums">
          <div class="title">用户昵称</div>
          <div class="num" v-if="localType==='reply'">1分钟前 回复了你</div>
          <div class="num" v-else>1分钟前 赞了你</div>
        </div>
        <div class="reply" v-if="localType==='reply'"><svg-icon icon="editor"></svg-icon>回复</div>
      </div>
      <div class="post">
        <div class="post-title">帖子标题</div>
        <div class="desc">
          帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容帖子内容
        </div>
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
    width: 52px;
    height: 4px;
    background: $primary-color;
    bottom: -30px;
    right: 6px;
  }
}

.wrapper {
  padding: 20px 25px;
}

.content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 100px;
  font-size: 30px;
  .colums {
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding: 20px;
    height: 100px;
    .title {
      font-weight: bold;
      padding-bottom: 10px;
    }
    .num {
      font-size: 24px;
      color: #666;
    }
  }
  .reply {
    padding: 35px;
    color: #999;
    font-size: 26px;
    svg {
      margin-right: 10px;
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

.post {
  margin: 25px 15px;
  background: #f3f3f3;
  padding: 15px 20px;
  border-radius: 12px;
  .post-title {
    font-size: 26px;
    font-weight: bold;
    padding-bottom: 20px;
  }
  .desc {
    font-size: 20px;
    line-height: 30px;
    color: #666;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
