const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const fs = require('fs')

let entries = {}
let htmlPlugin = []
let sourcePath = './src/assets/page/'
// fs.readdir(sourcePath, (err, data) => {
//   if (err) {
//     throw err;
//   }
//   (function getFiles(i) {
//     if (i == data.length) {
//       return false;
//     }

//     fs.stat(path.resolve(sourcePath, data[i]), function (err, stats) {
//       if (stats.isDirectory()) {

//       } else {
//         console.log(path.resolve(sourcePath, data[i]))
//       }
//       getFiles(i + 1)
//     })
//   })(0)
// })
function addHtmlWebpackPlugin(sourcePathName, entryIsUseSourcePath = false) {
  let sourcePath = sourcePathName ? `./src/assets/page/${sourcePathName}/*.html` : `./src/pages/*.html`,
    entryFileName = sourcePathName ? `./src/assets/js/${sourcePathName}` : `./src/assets/js`;
  glob.sync(sourcePath).forEach(pth => {
    let filename = pth.substring(pth.lastIndexOf('\/') + 1, pth.lastIndexOf('.'))
    entries[filename] = `${entryFileName}/${entryIsUseSourcePath ? sourcePathName : filename}.js`
    let htmlConf = {
      filename: filename + '.html',
      template: pth,
      chunks: ['vendor', filename]
    }
    htmlPlugin.push(new HtmlWebpackPlugin(htmlConf))
  })
}
addHtmlWebpackPlugin();
addHtmlWebpackPlugin('collect');
addHtmlWebpackPlugin('personal');
addHtmlWebpackPlugin('product', true);
addHtmlWebpackPlugin('partner')

// glob.sync('./src/assets/page/personal/*.html').forEach(pth => {
//   let filename = pth.substring(pth.lastIndexOf('\/') + 1, pth.lastIndexOf('.'))
//   entries[filename] = './src/assets/js/personal/' + filename + '.js'
//   let htmlConf = {
//     filename: filename + '.html',
//     template: pth,
//     chunks: ['vendor', filename]
//   }
//   htmlPlugin.push(new HtmlWebpackPlugin(htmlConf))
// })
// glob.sync('./src/assets/page/product/*.html').forEach(pth => {
//   let filename = pth.substring(pth.lastIndexOf('\/') + 1, pth.lastIndexOf('.'))
//   entries[filename] = './src/assets/js/productCommon.js'
//   let htmlConf = {
//     filename: filename + '.html',
//     template: pth,
//     chunks: ['vendor', filename]
//   }
//   htmlPlugin.push(new HtmlWebpackPlugin(htmlConf))
// })
// glob.sync('./src/pages/*.html').forEach(pth => {
//   let filename = pth.substring(pth.lastIndexOf('\/') + 1, pth.lastIndexOf('.'))
//   entries[filename] = './src/assets/js/' + filename + '.js'
//   let htmlConf = {
//     filename: filename + '.html',
//     template: pth,
//     chunks: ['vendor', filename]
//   }
//   htmlPlugin.push(new HtmlWebpackPlugin(htmlConf))
// })
module.exports = {
  entry: entries,
  output: {
    filename: 'js/[name].min.js',
    chunkFilename: 'js/[name].min.js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {

          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'resolve-url-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [{
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
          'resolve-url-loader',
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
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'img/[name][hash].[ext]',
            publicPath: './'
          }
        }],
        exclude: /node_modules/
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
  plugins: [
    ...htmlPlugin,
    new webpack.ProvidePlugin({ //加载jq
      $: 'jquery',
      'window.$': 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/images/index/4.png',
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
    // new CopyWebpackPlugin([{
    //   from: path.resolve(__dirname, '../static'),
    //   to: path.resolve(__dirname, '../dist/static')
    // }])
  ]
}