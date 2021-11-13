const isDev = process.env.NODE_ENV === 'development'

export default {
  baseUrl: {
    dev: 'http://localhost:3000',
    pro: 'https://api.ustbmz.com'
  },
  publicPath: [/^\/public/, /^\/login/],
  wsconfig: {
    url: isDev ? '127.0.0.1' : '121.36.201.245',
    prot: isDev ? '12005' : '12005'
  }
}
