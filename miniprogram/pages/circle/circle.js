// pages/circle/cicle.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    nexturl:'',
    message:{},
    userInfo:{}
  },
  
  enterdetail(e){
    console.log(e)
    wx.setStorageSync('itopenid', e.currentTarget.dataset.dataset.writer)
    wx.setStorageSync('momentid', e.currentTarget.dataset.dataset.id)
    app.globalData.cdetail = e.currentTarget.dataset.dataset;
    wx.navigateTo({
      url: '/pages/circle/detail'
    })
  },
  onPullDownRefresh: function () {

    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.showcircle();

  },
  showme(){
    wx.navigateTo({
      url: '/pages/showme/showcloth'
    })
  },
  showcircle(){
    let that = this;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'https://ssl.lyzwhh.top/moment/moment',
      method: 'GET',
      header: {
        "token": token,//自己改
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        
        let obj = res.data.data.data;
        let nexturl = res.data.data.next_page_url;
        //console.log(nexturl)
        console.log(res)
        that.setData({
          message: obj,
          nexturl:nexturl
        })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  showmore(){
    let that = this;
    let token = wx.getStorageSync('token');
    if(that.data.nexturl){
    wx.request({
      url: that.data.nexturl,
      method: 'GET',
      header: {
        "token":token,//自己改
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        let obj = res.data.data.data;
        let nexturl = res.data.data.next_page_url;
        console.log(obj)
        console.log("old",obj)
        let newdata = that.data.message
        Object.keys(obj).forEach((key) => {
          newdata.push(obj[key])
        })
        console.log(newdata)
        that.setData({
          nexturl: nexturl,
          message:newdata
        })
        console.log("new", that.data.message)
      },
      fail(res) {
        console.log(res)
      }
    })
    } else {
      wx.showToast({
        title: '没有更多啦',
        icon: 'none',
        duration: 1000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.showcircle();
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
    this.showcircle();
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