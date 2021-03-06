const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {

    },
    height:'***',
    weight:'***',
    message: {

    },
    nexturl:"",
    show:1,
    width: ((wx.getSystemInfoSync().windowWidth / 2) - 37)
  },
  showmore() {
    let that = this;
    let token = wx.getStorageSync('token');
    if(that.data.nexturl){
    wx.request({
      url: that.data.nexturl,
      method: 'GET',
      header: {
        "token": token,//自己改
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        let obj = res.data.data.data;
        let nexturl = res.data.data.next_page_url;
        //console.log(nexturl)
        console.log("old", obj)
        let newdata = that.data.message
        Object.keys(obj).forEach((key) => {
          newdata.push(obj[key])
        })
        console.log(newdata)
        that.setData({
          nexturl: nexturl,
          message: newdata
        })
        console.log("new", that.data.message)
      },
      fail(res) {
        console.log(res)
      }
    })
    }
    else {
      wx.showToast({
        title: '没有更多啦',
        icon: 'none',
        duration: 1000
      })
    }
  },
  enterdetail(e) {
    console.log(e)
    wx.setStorageSync('itopenid', e.currentTarget.dataset.dataset.writer)
    wx.setStorageSync('momentid', e.currentTarget.dataset.dataset.id)
    app.globalData.cdetail = e.currentTarget.dataset.dataset;
    wx.navigateTo({
      url: '/pages/circle/detail'
    })
  },
  getuser: function () {
    let that = this;
    let token = wx.getStorageSync('token');
    let openid = wx.getStorageSync('showopenid')
    wx.request({
      method: 'GET',
      url: 'https://ssl.lyzwhh.top/user/othersInfo/'+openid,
      header:
      {
        "token": token
      },
      success(res) {
        console.log(res.data.data)

        that.setData({
          userInfo: {
            nickname: res.data.data.userInfo.nickname,
            avatar_url: res.data.data.userInfo.avatar_url,
            liked: res.data.data.userInfo.liked,
            openid: res.data.data.userInfo.openid,
            signature: res.data.data.userInfo.signature,
          },
          message: res.data.data.moment,
          nexturl: (res.data.data.nexturl == undefined ? '' : res.data.data.nexturl)
        })
        
        if (res.data.data.userInfo.height) {
          that.setData({
            height: res.data.data.userInfo.height,
            weight: res.data.data.userInfo.weight
          })
        }
      },
      fail(res) {
        console.log(res)
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getuser();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getuser();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})