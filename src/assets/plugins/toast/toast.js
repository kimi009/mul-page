/**
 * Created by qph on 2017/4/26.
 */
var jToast = function () {
    return new Toast();
}
function Toast() {
    this.elements = [];
}
/**
 * 消息提示窗
 * @param msg 消息内容
 * @param body 父文档
 * @param status 提示状态 默认成功、error、warning
 */
Toast.prototype.tip = function (msg, status) {
    var htmlContent = '<div class="toast_tips ' + status + '"><span class="inner">' + msg + '</span></div>';
    $("body").append(htmlContent);

    $('.toast_tips').fadeIn();
    setTimeout(function () {
        $('.toast_tips').fadeOut(function () {
            $('.toast_tips').empty();
            $('.toast_tips').remove();
        });
    }, 2000);
};

Toast.prototype.showToastWithClose = function (msg) {
    var htmlContent = '<div class="bg-alpha" style="display:none">'
        +'<div class="mask-toast">'
        +'<div class="main-close">'
        +'<div class="close" onclick="closeToast()">'
        +'<div class="line-1"></div>'
        +'<div class="line-2"></div>'
        +'</div>'
        +'</div>'
        +'<p class="toast-tip">'+msg+'</p>'
        +'</div>'
        +'</div>';
    $("body").append(htmlContent);
    $(".bg-alpha").fadeIn();
    $(".mask-toast").css("margin-right",-parseFloat($(".mask-toast").innerWidth())/2);
    $(".mask-toast").css("margin-top",-parseFloat($(".mask-toast").innerHeight())/2);
    setTimeout(function () {
        $('.bg-alpha').fadeOut(function () {
            $('.bg-alpha').empty();
            $('.bg-alpha').remove();
        });
    }, 2500)
};

function closeToast() {
    $('.bg-alpha').fadeOut(function () {
        $('.bg-alpha').empty();
        $('.bg-alpha').remove();
    });
}

Toast.prototype.showToastAutoClose = function (msg) {
    var htmlContent = '<div class="bg-alpha" style="display:none">'
        +'<div class="mask-toast">'
        +'<p class="toast-tip">'+msg+'</p>'
        +'</div>'
        +'</div>';
    $("body").append(htmlContent);
    $(".bg-alpha").fadeIn();
    $(".mask-toast").css("margin-right",-parseFloat($(".mask-toast").innerWidth())/2);
    $(".mask-toast").css("margin-top",-parseFloat($(".mask-toast").innerHeight())/2);
    setTimeout(function () {
        $('.bg-alpha').fadeOut(function () {
            $('.bg-alpha').empty();
            $('.bg-alpha').remove();
        });
    }, 2000)
};

Toast.prototype.showLoading = function () {
    var htmlContent = '<div class="jtoast-loading"><div class="loadEffect">'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'<span></span>'
        +'</div></div>'
    $("body").append(htmlContent);
}



Toast.prototype.hideLoading = function () {
    $("body .jtoast-loading").fadeOut();
}

