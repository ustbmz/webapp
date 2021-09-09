import axios from '@/utils/request'
import qs from 'qs'
// 热门评论
const getHotComments = (data) => {
  return axios.get('/public/hotComments?' + qs.stringify(data))
}

// 热门帖子
const getHotPost = (data) => {
  return axios.get('/public/hotPost?' + qs.stringify(data))
}

// 签到记录
const getHotSign = (data) => {
  return axios.get('/public/hotSign?' + qs.stringify(data))
}

export {
  getHotComments,
  getHotPost,
  getHotSign
}
