var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    thiscloth:{},
    flag:0,
    picurl:[]
  },
  bindFormSubmit(e) {
    let that =this;
    console.log(e.detail.value.textarea)
    let obj = this.data.thiscloth.clothes

    if(obj){
    for (var i in obj) {
      that.data.picurl.push(obj[i].url);
      
    }}
    else {
      that.data.picurl.push (this.data.thiscloth.pic_url)
    }
    console.log(that.data.picurl)
    
    let token = wx.getStorageSync('token');
    var content=e.detail.value.textarea
    wx.request({
      url: 'https://ssl.lyzwhh.top/moment/moment',
      method: 'POST',
      header: {      
        "token": token
      },
      data:{
        "pics_url":that.data.picurl,
        "content":content
      },
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000
    })
    wx.switchTab({
      url: '/pages/circle/circle'
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let thisclo = getApp().globalData.thisclo
    let flag = app.globalData.flag
    console.log(thisclo)
    let that = this
    that.setData({
      thiscloth: thisclo,
      flag:flag
    })
    console.log(this.data.thiscloth)
    console.log(this.data.flag)
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