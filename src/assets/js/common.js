const uuidv5 = require('uuid/v5');
const common = {
  // 本地环境
  // ApiPath: "http://mypsb.cn/api/dev",
  // LocalPath: "http://10.0.0.77:8092",
  // PsbPath: "http://10.0.0.77:8091",
  // 正式环境
  // ApiPath: "http://mypsb.cn/api",
  // LocalPath: "http://mypsb.cn/",
  // PsbPath: "http://mypsb.cn/Web/dist/index.html",
  // 测试环境
  // ApiPath: "http://mypsb.cn/api/test",
  // LocalPath: "http://mypsb.cn/api/test/WebSite",
  // PsbPath: "http://mypsb.cn/api/test/Web/dist/index.html",
  // 开发环境
  ApiPath: "http://mypsb.cn/api/dev",
  LocalPath: "http://mypsb.cn/api/dev/WebSite",
  PsbPath: "http://mypsb.cn/api/dev/Web/dist/index.html",

  // 视频地址   video1 生活中的票税宝  video2  工作中的票税宝
  video1: "",
  video2: "",
  image1: "",
  image2: "",
  postdata: {
    "Platform": "PC",
    "DeviceId": "Netscape",
    "Latlng": "",
    "Token": ""
  },
  DoAjax: function (url, reqData, callback, type) {
    return $.ajax({
      url: url,
      type: type ? type : 'POST',
      data: JSON.stringify(reqData),
      contentType: "application/json;",
      beforeSend: function () {
        var uuid = localStorage.getItem('UUIDPSB')
        if (!uuid) {
          var newUuid = uuidv5('mypsb', uuidv5.DNS);
          localStorage.setItem('UUIDPSB', newUuid)
        }
        var temp = JSON.parse(this.data);
        temp.DeviceId = uuid;
        this.data = JSON.stringify(temp)
      },
      complete: function () {
        // console.log("DoAjax--complete");
      },
      success: function (result) {
        if (typeof (callback) == "function") {
          callback(result);
        }
        // if (result.ResCode !== 1000) {
        //   jToast().showToastWithClose(result.Msg);
        // }
      },
      error: function (result) {
        console.log("请求失败， 请检查您的网络！", 'error');
      }
    });
  },
  GetQueryString: function (key) {
    var href = window.location.href;
    var queryStr = href.substr(href.indexOf('?') + 1);
    var arr = queryStr.split("&");
    var len = arr.length;
    if (len > 0) {
      for (var i = 0; i < len; i++) {
        var item = arr[i];
        var itemArr = item.split("=");
        if ($.trim(itemArr[0]) == key) {
          if (itemArr.length > 1) {
            return $.trim(itemArr[1]);
          } else return "";
        }
      }
    }
    return null;
  },
  PREREQUESTTIME: 'PREREQUESTTIME'//前置接口请求的事件
}
export {
  common
}