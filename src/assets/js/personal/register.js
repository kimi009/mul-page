import '@/assets/css/common.css'
import '@/assets/css/white-common.css'
import '@/assets/css/personal/register.css'
require('@/assets/plugins/toast/toast.js')
import {
  common,
  api
} from '../meta.js'
require('../commonLoad.js')

var countdown = 60;
// 点击发送验证码
window.sendSms = function (ele) {
  var url = common.ApiPath + api.SendSms;
  var postdata = {
    FlagType: 1, //区分来源（0-验证码登陆,1-注册,2-找回密码,3-手机或邮箱验证）  
    Account: $("#phone").val()
  }
  postdata = $.extend(common.postdata, postdata);
  common.DoAjax(url, postdata, function (data) {
    console.log(data);
    if (data.ResCode === 1000) {
      register.showSecond(ele);
    } else {
      $(".commonTip>p").text(data.Msg);
      $(".commonTip").fadeIn();
    }
  })
};
// 显示倒计时
window.showSecond = function (ele) {
  if (register.countdown === 0) {
    $(ele).text("重新获取验证码");
    register.countdown = 60;
    $(ele).css("pointer-events", "auto");
  } else {
    $(ele).text("重新获取验证码" + "(" + register.countdown + ")");
    $(ele).css("pointer-events", "none");
    register.countdown--;
    setTimeout(function () {
      register.showSecond(ele)
    }, 1000);
  }
};
window.register = function () {
  if ($("#psw").val() === $("#cpsw").val()) {
    var url = common.ApiPath + api.Register;
    var postdata = {
      AppId: 100000, //应用ID（100000-票税宝、100001-方欣科技、100002-金财）  
      MobilePhone: $("#phone").val(),
      Password: $("#cpsw").val(),
      ValidCode: $("#ValidCode").val()
    }
    postdata.Platform = common.postdata.Platform;
    common.DoAjax(url, postdata, function (data) {
      console.log(data);
      if (data.ResCode === 1000) {
        jToast().showToastWithClose("注册成功");
        setTimeout(function () {
          window.location.href = common.LocalPath + "/assets/page/personal/personal-index.html"
        }, 2000);
      } else {
        $(".commonTip>p").text(data.Msg);
        $(".commonTip").fadeIn();
      }
    })
  } else {

  }

};
window.openSmsBtn = function (ele) {
  if ($(ele).val()) {
    $("#smsBtn").css("pointer-events", "auto");
  } else {
    $("#smsBtn").css("pointer-events", "none");
  }
};
window.checkPhone = function (ele) {
  if ($(ele).val().length === 11) {
    $(ele).next().fadeIn();
    $(ele).next().next().hide();
  } else {
    $(ele).next().next().fadeIn();
    $(ele).next().hide();
  }
};
window.checkPsw = function (ele) {
  if ($(ele).val().length >= 6 && $(ele).val().length <= 30) {
    $(ele).next().fadeIn();
    $(ele).next().next().hide();
  } else {
    $(ele).next().next().fadeIn();
    $(ele).next().hide();
  }
};
window.checkCpsw = function (ele) {
  if ($("#psw").val().length >= 6 && $("#psw").val().length <= 30) {
    if ($(ele).val().length >= 6 && $(ele).val().length <= 30 && $(ele).val() === $("#psw").val()) {
      $(ele).next().fadeIn();
      $(ele).next().next().hide();
    } else {
      $(ele).next().next().fadeIn();
      $(ele).next().hide();
    }
  }
};
window.checkSms = function (ele) {
  if ($(ele).val().length < 6) {
    $(ele).next().next().fadeIn();
  } else {
    $(ele).next().next().fadeOut();
  }
};
window.checkCanRegiter = function () {
  if ($("#phone").val() && $("#ValidCode").val() && $("#psw").val() && $("#cpsw").val()) {
    $(".wrap>.content>.register>.content>a").css({
      "pointer-events": "auto",
      "background-color": "#3b8bfd"
    });
  } else {
    $(".wrap>.content>.register>.content>a").css({
      "pointer-events": "none",
      "background-color": "#d9d9d9"
    });
  }
}