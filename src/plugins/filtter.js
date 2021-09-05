import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import escapeHtml from '@/utils/escapeHtml'
require('dayjs/locale/zh-cn')
dayjs.extend(relativeTime)

const moment = (date) => {
  return dayjs(date).locale('zh-cn').fromNow()
}

const trasnCatalog = (val) => {
  switch (val) {
    case 'ask':
      return '提问'
    case 'share':
      return '分享'
    case 'discuss':
      return '讨论'
    case 'logs':
      return '动态'
    case 'advise':
      return '建议'
    case 'notice':
      return '公告'
  }
}

const escapehtml = (content) => {
  if (content === '') {
    return ''
  } else {
    return escapeHtml(content)
  }
}

export default {
  moment, trasnCatalog, escapehtml
}
