### Webpack 打包常见的问题

1.静态的html文件无法读取src路径 请安装html-loader
```
{
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {

          }
        }
      },
```


2.普通的css文件内无法加载url路径 
```
{
        test:/\.css$/,
        loaders:[
          'style-loader',
          'css-loader',
          'resolve-url-loader'
        ]
      }
```