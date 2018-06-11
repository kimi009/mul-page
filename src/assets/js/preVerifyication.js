import {
  common,
  api
} from './meta.js'

/**
 * 接口前置请求
 */
export const preRequest = () => {
  var url = common.ApiPath + api.preRequest;
  common.DoAjax(url,{},function(data){
    console.log(data)
  })
}
/**
 * 获取加密策略
 */
export const GetStrategySetting = () => {
  var url = common.ApiPath + api.getStrategySetting;
  postdata = $.extend(common.postdata, postdata);
  common.DoAjax(url, )
}