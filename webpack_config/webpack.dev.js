const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: '8080',
    contentBase: './dist',
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        pathRewrite: {'^/api': '/api/v1'},
        changeOrigin: true,
        cookieDomainRewrite: 'localhost'
      }
    }
  }
})