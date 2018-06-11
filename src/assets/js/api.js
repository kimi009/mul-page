var api = {
  Login: "/Ticket/Login", //登录
  Register: "/Ticket/Register", //注册
  GetMemberDetail: "/Ticket/GetMemberDetail", //获取用户信息
  LoginOut: "/Ticket/Logout", //退出
  SendSms: "/Sms/SendSms", //发送验证码
  ResetPassword: "/Ticket/ResetPassword", //重置密码
  getVideo: "/Moment/GetMoments", //获取首页视频
  preRequest: "/Ticket/Invoice",
  getProtectionToken: "/ApiProtection/GetProtectionToken",
  getStrategySetting: "/ApiProtection/GetStrategySetting",
  testApiProtection: "/ApiProtection/TestApiProtection"
}
export {
  api
}