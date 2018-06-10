import '@/assets/css/common.css'
import '@/assets/css/personal/person-index.css'
require('@/assets/js/jquery.easing.1.3.js')
require('@/assets/plugins/toast/toast.js')
require('jquery-scrollify')
require('../commonLoad.js')
import {
  common,
  api
} from '@/assets/js/meta.js'

window.onScrollPage = function onScrollPage(page, obj) {
  $(obj).siblings().removeClass("active");
  $(obj).addClass("active");
  var windowHeight = $(window).height() * page;
  $('body,html').animate({
    scrollTop: windowHeight
  }, 500);
  if (page === 0) {
    $(".login-top").hide();
  } else {
    $(".login-top").css("display", "inline-block");
  }
}
//登录
window.login = function login() {
  if ($("#account").val() === "") {
    $(".modal-login .content>.tip").text("请输入账号").fadeIn();
  } else if ($("#psw").val() === "") {
    $(".modal-login .content>.tip").text("请输入密码").fadeIn();
  } else {
    var url = common.ApiPath + api.Login;
    var postdata = {
      "UserName": $("#account").val(),
      "Password": $("#psw").val(),
    }
    postdata = $.extend(common.postdata, postdata);
    console.log(postdata);
    if ($("#psw").val().length < 6 || $("#psw").val().length > 30) {
      $(".modal-login .content>.tip").text("请输入6-30位非汉字密码").fadeIn();
    } else {
      common.DoAjax(url, postdata, function (data) {
        console.log(data);
        if (data.ResCode === 1000) {
          localStorage.setItem("token", data.Token);
          window.location.href = common.PsbPath + "#/?token=" + data.Token;
        } else {
          $(".modal-login .content>.tip").text(data.Msg).fadeIn();
        }
      })
    }
  }
}
// 显示x号
window.showClose = function showClose(ele) {
  if ($(ele).val()) {
    $(ele).next().fadeIn();
  } else {
    $(ele).next().fadeOut();
  }
}
// 进入我的票税宝
window.enterPsb = function enterPsb() {
  window.location.href = common.PsbPath + "#/?token=" + localStorage.getItem("token");
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
window.loadComplete = function () {
  $('.am-page').css({
    'height': $(window).height()
  });
  $.scrollify({
    section: '.am-page',
    scrollSpeed: 1000,
    offset: 0,
    scrollbars: true,
    before: function (obj) {
      if (obj === 0) {
        $("#onepage-pagination-0").addClass("active").siblings().removeClass("active");
        $(".login-top").hide();
      }
      if (obj === 1) {
        $("#onepage-pagination-1").addClass("active").siblings().removeClass("active");
        $(".login-top").css("display", "inline-block");
      }
      if (obj === 2) {
        $("#onepage-pagination-2").addClass("active").siblings().removeClass("active");
        $(".login-top").css("display", "inline-block");
      }
      if (obj === 3) {
        $("#onepage-pagination-3").addClass("active").siblings().removeClass("active");
        $(".login-top").css("display", "inline-block");
      }
      if (obj === 4) {
        $("#onepage-pagination-4").addClass("active").siblings().removeClass("active");
        $(".login-top").css("display", "inline-block");
      }
    },
    after: function (obj) {}
  });
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