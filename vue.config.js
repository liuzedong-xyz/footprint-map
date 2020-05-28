module.exports = {
  // baseUrl: '/',
  devServer: {
    proxy: {
      '/map_api': {
        target: 'http://vps.521plus.com',
        changeOrigin: true,
      }
    }
  }
}