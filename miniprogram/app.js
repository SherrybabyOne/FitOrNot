//app.js
App({
  
  globalData: {
    userInfo: null,
    myup: [],
    mylow: [],
    sock: [],
    jewel: [],
    thisclo:{},
    cdetail:{},
    clothes:{},
    openid: '',
    token: ''
  },
  loginCheck(){
    const that = this;
    wx.checkSession({
      success () {
      try {
        const openid = wx.getStorageSync('openid')
        const token = wx.getStorageSync('token')
        const gender = wx.getStorageSync('gender')
        if (openid && token &&gender) {
          that.globalData.openid = openid;
          that.globalData.token = token;
          wx.switchTab({
            url: '/pages/enter/enter'
          })
        }
        
      } catch (e) {
      // Do something when catch error
      }
      
      }, 
      fail () {
        wx.login({
          success (response) {
            if (response.code) {
              //发起网络请求
              wx.request({
                url: 'https://ssl.lyzwhh.top/user/code2session',
                method: 'POST',
                data: {
                  code: response.code
                },
                success(res){
                  if(res.statusCode===200){
                    wx.setStorage({
                      key: "openid",
                      data: res.data.data.openid
                    });
                    that.globalData.openid = res.data.data.openid;
                    that.globalData.token = res.data.data.token;
                    wx.setStorage({
                      key: "token",
                      data: res.data.data.token
                    });
                    wx.switchTab({
                      url: '/pages/login/login'
                    })
                  }else{
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

  onLaunch(){
    wx.cloud.init();
    this.loginCheck()
  }
})

  

