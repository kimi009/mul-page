const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const glob = require('glob')

let entries = {}
let htmlPlugin = []
glob.sync('./src/pages/*.html').forEach(path => {
  let filename = path.substring(path.lastIndexOf('\/') + 1, path.lastIndexOf('.'))
  entries[filename] = './src/assets/js/' + filename + '.js'
  let htmlConf = {
    filename: filename + '.html',
    template: path,
    chunks: ['vendor', filename]
  }
  htmlPlugin.push(new HtmlWebpackPlugin(htmlConf))
})
module.exports = {
  entry: entries,
  output: {
    filename: 'js/[name].min.js',
    chunkFilename: 'js/[name].min.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      { 
        test: /\.js$/,
        exclude: /node_modules/, 
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 2
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              data: '@import "~@/assets/style/var.scss";'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendor: {
          name: 'vendor'
        }
      }
    }
  },
  plugins: [
    ...htmlPlugin,
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/img/icon.png',
      prefix: 'icons/',
      emitStats: false,
      statsFilename: 'iconstats-[hash].json',
      persistentCache: true,
      inject: true,
      background: '#fff',
      title: 'App',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    })
  ]
  // cdn
  // "https://code.jquery.com/jquery-3.3.1.min.js"
  // "https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"
  // externals: {
  //   'jquery': 'jQuery',
  //   'vue': 'Vue'
  // }
}