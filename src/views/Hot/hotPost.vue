<template>
  <div>
    <div class="select">
      <ul>
        <li @click="setIndex(0)" :class="{ activeItem: current === 0 }">
          3天内
        </li>
        <li @click="setIndex(1)" :class="{ activeItem: current === 1 }">
          7天内
        </li>
        <li @click="setIndex(2)" :class="{ activeItem: current === 2 }">
          一个月
        </li>
        <li @click="setIndex(3)" :class="{ activeItem: current === 3 }">
          三个月
        </li>
      </ul>
    </div>
    <scroll
      :distance="footerHeight"
      :isEnd="isEnd"
      @on-loadTop="loadTop"
      @on-loadBottom="loadBottom"
    >
      <div class="itemDiv">
        <template>
          <div v-for="(item, index) in lists" :key="'post' + index">
            <div class="content" @click="goPost(item._id)">
              <div class="number" v-if="index < 9">
                {{ '0' + (index + 1) }}
              </div>
              <div class="number" v-else>{{ index + 1 }}</div>
              <div class="colums">
                <div class="title">{{ item.title }}</div>
                <div class="num">{{ item.answer }} 评论</div>
              </div>
              <div>
                <img class="tImage" src="../../assets/images/6.jpg" />
              </div>
            </div>
          </div>
        </template>
        <div class="no-more" v-if="this.isEnd === true">没有更多了</div>
      </div>
    </scroll>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { getHotPost } from '@/api/hot'
export default {
  name: 'hotPost',
  data () {
    return {
      lists: [],
      imgs: [
        '../../assets/images/1.jpg',
        '../../assets/images/2.jpg',
        '../../assets/images/3.jpg',
        '../../assets/images/4.jpg',
        '../../assets/images/5.jpg',
        '../../assets/images/6.jpg',
        '../../assets/images/7.jpg',
        '../../assets/images/8.jpg'
      ],
      current: 0,
      footerHeight: 0,
      isEnd: false,
      page: 0,
      limit: 10
    }
  },
  mounted () {
    this.dispatch()
  },
  watch: {
    type (newval, oldval) {
      this.current = 0
      this.page = 0
      this.lists = []
      this.init()
    }
  },
  methods: {
    initHeight () {
      this.footerHeight =
        document.getElementsByClassName('layout-footer')[0].offserHeight
    },
    init () {
      this.isEnd = false
      this.isRepeat = false
      if (typeof this.handle === 'function') {
        this.handle()
      }
      this.dispatch()
    },
    loadTop (end) {
      this.page = 0
      this.handle = end
      this.lists = []
      this.init()
    },
    loadBottom (end) {
      this.page++
      this.handle = end
      this.init()
    },

    setIndex (index) {
      this.current = index
      this.lists = []
      this.page = 0
      this.dispatch()
    },
    async dispatch () {
      const handle = (res) => {
        // 加入请求锁 防止用户重复点击
        this.isRepeat = false
        this.isEnd = false
        if (res.code === 200) {
          // 判断是否结束
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }

        if (typeof this.handle === 'function') {
          this.handle()
        }
        this.initHeight()
      }
      try {
        const result = await this._getHotPost()
        handle(result)
      } catch (err) {
        this.isRepeat = false
        if (err) {
          this.$Toast(err.message)
        }
      }
    },
    async _getHotPost () {
      const result = getHotPost({
        index: this.current,
        limit: this.limit,
        page: this.page
      })
      return result
    },
    goPost (tid) {
      this.$router.push({ name: 'detail', params: { tid: tid } })
    }
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
