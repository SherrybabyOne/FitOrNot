const app = getApp();
Page({
  data: {
    
  },
  loginCheck() {
    wx.checkSession({
      success() {
        
      },
      fail() {
        wx.login({
          success(response) {
            if (response.code) {
              //发起网络请求
              wx.request({
                url: 'https://ssl.lyzwhh.top/user/code2session',
                method: 'POST',
                data: {
                  code: response.code
                },
                success(res) {
                  console.log(res)
                  if (res.statusCode === 200) {
                    wx.setStorage({
                      key: "openid",
                      data: res.data.data.openid
                    });
                    wx.setStorage({
                      key: "token",
                      data: res.data.data.token
                    });
                    

                  } else {
                    console.log('后端出错')
                  }
                }
              })
            } else {
              console.log('登录失败！' + response.errMsg)
            }
          }
        })
      }
    })
  },
  //检查用户信息授权设置
  // checkUserInfoPermission: function (callback = () => { }) {
  //   wx.getSetting({
  //     success: function (res) {
  //       if (!res, aythSetting['scope.userInfo']) {
  //         wx.openSetting({
  //           success: function (authSetting) {
  //             console.log(authSetting)
  //           }
  //         });
  //       }
  //     },
  //     fail: function (error) {
  //       console.log(error);
  //     }
  //   })
  // },
  
//   bindGetUserInfo: function (e) {
//     var that = this;
//     wx.showModal({
//       title: '授权登陆',
//       content: '将获得用户的公开信息（如昵称头像）',
//       showCancel: true,
//       confirmText: '确定',
//       success: function (res) {
//         if (res.confirm) {
//           //用户按了允许授权按钮

//            wx.getUserInfo({
//             success: function (infoRes) {
//               console.log(infoRes)
//               wx.setStorageSync('name',infoRes.userInfo.nickName); 
//               wx.setStorageSync('avatarUrl', infoRes.userInfo.avatarUrl); 
//               console.log("define user",wx.getStorageSync('avatarUrl'))
//               that.doLogin();
//             },
//             fail: function (error) {
//               wx.hideLoading();
//               that.checkUserInfoPermission();
//             }
//           });

//           //插入登录的用户的相关信息到数据库
          
//           //授权成功后，跳转进入小程序首页
//           wx.switchTab({
//             url: '/pages/enter/enter'
//           })
//         } else {
//           //用户按了拒绝按钮
//           wx.showModal({
//             title: '警告',
//             content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
//             showCancel: false,
//             confirmText: '返回授权',
//             success: function (res) {
//               if (res.confirm) {
//                 console.log('用户点击了“返回授权”')
//               }
//             }
//           })
//         }
//       }
//       })
//   }
// ,
  bindGetUserInfo: function() {
        wx.showModal({
      title: '授权登陆',
      content: '将获得用户的公开信息（如昵称头像）',
      showCancel: true,
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
    
    let gender = e.detail.userInfo.gender;
    let iuserInfo = e.detail.userInfo;
    wx.setStorage({
      key: "gender",
      data: gender
    })
    wx.setStorage({
      key: "userInfo",
      data: iuserInfo
    })
    let token = wx.getStorageSync('token')
    let nickname = wx.getStorageSync('userInfo').nickName
    let avatarUrl = wx.getStorageSync('userInfo').avatarUrl
    if(nickname){
    wx.request({
      url: 'https://ssl.lyzwhh.top/user/setName',
      method: 'POST',
      header: {
        "token": token
      },
      data: {
        "data": {
          "nickname": nickname,
          "avatar_url": avatarUrl,
        }
      },
      success(res) {
        console.log(res)
        console.log(nickname, avatarUrl)

      }
    })}
    if(wx.getStorageSync('userInfo'))
    wx.switchTab({
      url: '/pages/enter/enter'
    })
  },
  onLoad: function() {
   this.loginCheck()
  },
  onShow:function(){
    this.loginCheck()
  }
})