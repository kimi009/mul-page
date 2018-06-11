import {
  common
} from '@/assets/js/common.js'
import {
  api
} from '@/assets/js/api.js'

const preRequestDeal = function () {
  let preTime = localStorage.getItem(common.PREREQUESTTIME);
  if (preTime) {
    let currDate = new Date(new Date(Date.now()).toLocaleDateString()).getTime(),
      sourceDate = new Date(preTime).getTime();
    if (Math.abs(currDate - sourceDate) > 86400000) {
      sendPreDeal()
    }
  } else {
    sendPreDeal()
  }

  function sendPreDeal() {
    common.DoAjax(common.ApiPath + api.preRequest, {}, function (data) {
      if (data.ResCode == 1000) {
        localStorage.setItem(common.PREREQUESTTIME, new Date(Date.now()).toLocaleDateString())
      } else {
        console.log(`前置请求接口结果：${JSON.stringify(data)}`)
      }
    })
  }
}

export {
  common,
  api,
  preRequestDeal
}