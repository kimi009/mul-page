const common = {
  // 本地环境
  // ApiPath: "http://psb.mobi/api/dev",
  // LocalPath: "http://10.0.0.77:8092",
  // PsbPath: "http://10.0.0.77:8091",
  // 正式环境
  ApiPath: "http://psb.mobi/api",
  LocalPath: "http://mypsb.cn/",
  PsbPath: "http://mypsb.cn/Web/dist/index.html",
  // 测试环境
  // ApiPath: "http://psb.mobi/api/test",
  // LocalPath: "http://psb.mobi/api/test/WebSite",
  // PsbPath: "http://psb.mobi/api/test/Web/dist/index.html",
  // 开发环境
  // ApiPath: "http://psb.mobi/api/dev",
  // LocalPath: "http://psb.mobi/api/dev/WebSite",
  // PsbPath: "http://psb.mobi/api/dev/Web/dist/index.html",

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
  DoAjax: function (url, data, callback, type) {
    $.ajax({
      url: url,
      type: type ? type : 'POST',
      data: JSON.stringify(data),
      contentType: "application/json;",
      beforeSend: function () {},
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
  }
}
export {
  common
}