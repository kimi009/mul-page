### Webpack 打包常见的问题

* 静态的html文件无法读取src路径 请安装html-loader
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


* 普通的css文件内无法加载url路径 
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

>* 随机生成uid
    function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};