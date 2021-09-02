<template>
  <div>
    <scroll
      :lists="lists"
      :distance="56"
      :on-loadTop="loadTop"
      :on-loadBottom="loadBottom"
    >
      <ul>
        <li v-for="(item, index) in lists" :key="'catalog' + index">
          {{ item }}
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { getList } from '@/api/content'
export default {
  prors: ['catalog'],
  data () {
    return {
      page: 0,
      limit: 10,
      lists: [],
      isEnd: false
    }
  },
  mounted () {
    this._getList()
    console.log('mounted')
  },
  methods: {
    loadTop () {},
    loadBottom () {},
    _getList () {
      getList({
        page: this.page,
        limit: this.limit
      }).then((res) => {
        if (res.code === 200) {
          this.lists = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
