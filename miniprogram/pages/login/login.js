const app = getApp();
Page({
  data: {
    userInfo: {},
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
  bindGetUserInfo: function(e) {
    wx.setStorage({
      key:"userInfo",
      data:e.detail.userInfo
    })
    let gender = wx.getStorageSync('userInfo').gender;
    wx.setStorage({
      key: "gender",
      data: gender
    })
    console.log(gender);
    console.log(wx.getStorageSync('userInfo'))
    //getmy
    let token = wx.getStorageSync('token')
    
    let nickname = wx.getStorageSync('userInfo').nickName
    let avatarUrl = wx.getStorageSync('userInfo').avatarUrl
      let that = this;
      console.log(token,nickname, avatarUrl)
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
        success(res)  {
          console.log("this!!!", res.data.errcode)
          //console.log(nickname, avatarUrl)
          if(res.data.errcode=='0'){
          wx.switchTab({
            url: '/pages/enter/enter'
          })}
          else{
            console.log(token)
            
            wx.showToast({
              title: '请清空缓存并重新启动小程序',
              icon: 'none',
              duration: 2000
            })
            console.log("finish")
            }
        },
        fail(res){
          console.log(res)
        }
      })
   
  }
})