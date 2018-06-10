import '@/assets/css/common.css'
import '@/assets/css/personal/about-us.css'
import {
  common,
  api
} from '../meta.js'
require('../commonLoad.js')

window.loadComplete = function () {
  $(function () {
    //判断是否已经登录
    common.postdata.Token = localStorage.getItem("token");
    var url = common.ApiPath + api.GetMemberDetail;
    if (common.postdata.Token) {
      common.DoAjax(url, common.postdata, function (data) {
        console.log(data);
        if (data.ResCode === 1000) {
          $(".laymid>.user>span:eq(1)").text(data.Data.NickName);
          $(".laymid>.user").show();
          $(".login-mid").remove();
          $(".login-top").remove();
          $(".enter").css("display", "inline-block");
        }
      })
    }
  })
}

// 退出
window.logout = function logout() {
  localStorage.setItem("token", "");
  var url = common.ApiPath + api.LoginOut;
  common.DoAjax(url, common.postdata, function (data) {
    console.log(data);
    if (data.ResCode === 1000) {
      location.reload();
    } else {
      jToast().showToastWithClose(data.Msg);
    }
  })
}
// 进入我的票税宝
window.enterPsb = function enterPsb() {
  window.location.href = common.PsbPath + "#/?token=" + localStorage.getItem("token");
}