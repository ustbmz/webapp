<template>
  <div>
    <my-header :title="page.title || '页面详情'" :hasBack="true"></my-header>
    <div class="wrapper">
      <div class="detail-head">{{ page.title }}</div>
      <div class="detail-info">
        <div class="detail-info-head">
          <div class="avatar">
            <img :src="page.user ? page.user.pic : '/public/img/user.jpeg'" />
          </div>
          <div class="cont">
            <div class="name">{{ page.user ? page.user.name : '' }}</div>
            <div class="tiem">{{ page.created | moment }}</div>
          </div>
        </div>
        <div class="detail-info-body" v-richtext="page.content"></div>
      </div>
      <div class="comments">
        <div class="title">评论</div>
        <ul
          class="comments-list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <li
            class="item"
            v-for="(item, index) in comments"
            :key="'comment' + index"
          >
            <div class="user">
              <div class="detail-info-head">
                <div class="avatar">
                  <img
                    :src="item.cuid ? item.cuid.pic : '/public/img/user.jpeg'"
                  />
                </div>
                <div class="cont">
                  <div class="name">{{ item.cuid ? item.cuid.name : '' }}</div>
                  <div class="tiem">{{ item.created | moment }}.评论了帖子</div>
                </div>
                <div class="hands">
                  <svg-icon icon="zan"></svg-icon>
                  <span>{{ item.hands }}</span>
                </div>
              </div>
              <div class="detail-body" v-richtext="item.content"></div>
            </div>
          </li>
        </ul>
        <div class="info" v-if="comments.length === 0">
          暂无评论，快来抢沙发👉
        </div>
      </div>
    </div>

    <div class="detail-bottom">
      <span class="bottom-input-wrap">
        <svg-icon icon="advice"></svg-icon>
        <input type="text" class="input" placeholder="写评论" />
      </span>
      <ul class="bottom-right">
        <li :class="{ row: !showText }">
          <svg-icon icon="bianji"></svg-icon>
          <p><span>评论</span>{{ page.answer }}</p>
        </li>
        <li :class="{ row: !showText }">
          <svg-icon icon="shoucang"></svg-icon>
          <p>
            <span>{{ page.isFav ? '收藏' : '取消收藏' }}</span>
          </p>
        </li>
        <li :class="{ row: !showText }">
          <svg-icon icon="zan"></svg-icon>
          <p><span>赞</span>{{ page.fav }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getPostDetail } from '@/api/content'
import { getComments } from '@/api/comments'
export default {
  name: 'detail',
  data () {
    return {
      page: {},
      comments: [],
      showText: true,
      loading: false
    }
  },
  mounted () {
    this._getPostDetail()
    this._getComments()
  },
  computed: {
    tid () {
      return this.$route.params.tid
    }
  },
  methods: {
    loadMore () {
      this.loading = true
      console.log('loadMore')
      setTimeout(() => {
        this.loading = false
      }, 2500)
    },
    _getPostDetail () {
      getPostDetail(this.tid).then((res) => {
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    _getComments () {
      getComments(this.tid).then((res) => {
        if (res.code === 200) {
          this.comments = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
ul,
p {
  margin: 0;
  padding: 0;
}
.wrapper {
  background-color: #f6f6f6;
}
.detail-head {
  font-size: 36px;
  color: #333;
  padding: 0 30px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  margin: 0 0 20px 0;
  line-height: $header-height;
  background-color: #fff;
  z-index: 200;
  position: relative;
}
.detail-info {
  background-color: #fff;
  padding: 20px 30px 60px 30px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  margin: 0 0 20px 0;
  .detail-info-head {
    background-color: #fff;
    display: flex;
    align-items: center;
    font-size: 25px;
    padding-bottom: 20px;
    .avatar {
      margin-right: 20px;
      img {
        width: 72px;
        height: 72px;
        border-radius: 100%;
      }
    }
    .cont {
      flex: 1;
      .name {
        font-size: 26px;
        color: #333;
        margin-bottom: 10px;
      }
      .time {
        color: #999;
        font-size: 22px;
      }
    }
  }
  .detail-info-body {
    color: #666;
    word-break: break-all;
    word-wrap: break-word;
    line-height: 55px;
    font-size: 30px;
    overflow-x: hidden;
    img {
      max-width: 100%;
    }
  }
  .detail-info-foot {
    color: #ccc;
    font-size: 26px;
  }
}
.detail-bottom {
  height: $header-height;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  border-top: 1px solid #f6f6f6;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);

  .bottom-input-wrap {
    background-color: #f3f3f3;
    flex: 1;
    display: flex;
    align-items: center;
    border-radius: 50px;
    width: 200px;
    color: #ccc;
    font-size: 28px;
    height: 64px;
    margin: 0 20px;
    .svg-icon {
      font-size: 30px;
      margin: 0 10px 0 16px;
    }
    .input {
      border: 0;
      background-color: transparent;
      outline: 0;
      flex: 1;
      padding-right: 20px;
    }
  }
  .bottom-right {
    display: flex;
    margin-right: 20px;
    font-size: 26px;
    li {
      flex: 1;
      padding: 0 10px;
      text-align: center;
      white-space: nowrap;
      color: #999;
      &.row {
        flex-flow: row nowrap;
        display: flex;
        align-items: center;
        p {
          margin-left: 8px;
        }
        .svg-icon,
        .svg-fav {
          margin-bottom: 0;
        }
      }
      .svg-icon {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .svg-fav {
        font-size: 32px;
        margin-bottom: 8px;
      }
      &.selected {
        color: $primary-color;
      }
    }
  }
}

.comments {
  background-color: #fff;
  .title {
    padding: 20px 30px 0 30px;
  }
  .info {
    font-size: 26px;
    color: #999;
    text-align: center;
  }
  .comments-list {
    margin: 0 0 20px 0;
    padding: 20px 30px 0 30px;
    .item {
      padding: 10px 0 28px 0;
    }
    .hands {
      padding-right: 10px;
      color: #999;
    }

    svg {
      font-size: 30px;
      margin-right: 10px;
    }
    .detail-info-head {
      background-color: #fff;
      display: flex;
      align-items: center;
      font-size: 25px;
      padding-bottom: 20px;
      justify-content: space-around;
      .avatar {
        margin-right: 20px;
        img {
          width: 72px;
          height: 72px;
          border-radius: 100%;
        }
      }
      .cont {
        flex: 1;
        .name {
          font-size: 26px;
          color: #333;
          margin-bottom: 10px;
        }
        .time {
          color: #999;
          font-size: 22px;
        }
      }
    }
    .detail-info-body {
      padding-bottom: 46px;
      color: #666;
      word-break: break-all;
      word-wrap: break-word;
      line-height: 55px;
      font-size: 30px;
      overflow-x: hidden;
      img {
        max-width: 100%;
      }
    }
    .detail-info-foot {
      color: #ccc;
      font-size: 26px;
    }
  }
}
</style>
