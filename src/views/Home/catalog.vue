<template>
  <div>
    <scroll
      :distance="footerHeight"
      :isEnd="isEnd"
      @on-loadTop="loadTop"
      @on-loadBottom="loadBottom"
    >
      <ul>
        <list-item
          v-for="(item, index) in lists"
          :key="'catalog' + index"
          :item="item"
        >
        </list-item>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { getList } from '@/api/content'
import ListItem from '@/components/ListItem'

export default {
  props: ['catalog'],
  data () {
    return {
      page: 0,
      limit: 10,
      lists: [],
      isEnd: false,
      isRepeat: false,
      handle: '',
      footerHeight: 0
    }
  },
  components: {
    ListItem
  },
  mounted () {
    window.vue = this
    this.footerHeight = document.getElementsByClassName('layout-footer')[0].offserHeight
    this._getList()
  },
  watch: {
    catalog (newval, oldval) {
      this.catalog = newval
      this.page = 0
      this.init()
    }
  },
  methods: {
    init () {
      this.page = 0
      if (typeof this.handle === 'function') {
        this.handle()
      }
      this.lists = []
      this.isEnd = false
      this.isRepeat = false
      this._getList()
    },
    loadTop (end) {
      this.handle = end
      this.init()
    },
    loadBottom (end) {
      this.page++
      this.handle = end
      this.init()
    },
    _getList () {
      console.log(
        '🚀 ~ file: catalog.vue ~ line 59 ~ _getList ~ this.isRepeat',
        this.isRepeat
      )
      console.log(
        '🚀 ~ file: catalog.vue ~ line 59 ~ _getList ~ this.isEnd',
        this.isEnd
      )
      if (this.isEnd) return
      if (this.isRepeat) return
      getList({
        catalog: this.catalog,
        page: this.page,
        limit: this.limit,
        sort: 'created'
      })
        .then((res) => {
          if (res.code === 200) {
            if (res.data.length < 20) {
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
        })
        .catch((err) => {
          this.isRepeat = false
          if (err) {
            this.$Toast(err.message)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  margin: 0;
  background-color: #f3f6f8;
}
</style>
