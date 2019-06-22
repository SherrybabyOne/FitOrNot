var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['黑色', '白色', '红色', '蓝色', '绿色', '紫色', '粉色', '黄色', '灰色', '褐色'],
    btnone: '#ffffff',
    btntwo: '#ffffff',
    btnthree: '#ffffff',
    btnfour: '#ffffff',
    btnfive: '#ffffff',
    thiscloth:{},
    mycloth: [{
      id: 1,
      name: '配饰',
      checked: true
    }, {
      id: 2,
      name: '上衣'
    }, {
      id: 3,
      name: '下衣'
    }, {
      id: 4,
      name: '鞋袜',
    }]
  },
  deletec(e){
    let that = this;
    let token = wx.getStorageSync('token');
    let id=this.data.thiscloth.id
    wx.request({
      url: 'https://ssl.lyzwhh.top/clothes/clothes/'+id,
      method: 'DELETE',
      header: {
        "token": token
      },
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
    wx.switchTab({
      url: '/pages/define/showcloth'
    })
  },
  changeup(e){
    //console.log(e)
    let bid=e.currentTarget.id;
    if(bid=="1"){
      this.setData({
        btnone: '#99CC33',
        btntwo: '#ffffff',
        btnthree: '#ffffff',
        btnfour: '#ffffff'
      })
    }else if (bid == "2") {
      this.setData({
        btntwo: '#99CC33',
        btnone: '#ffffff',
        btnthree: '#ffffff',
        btnfour: '#ffffff'
      })
    } else if (bid == "3") {
      this.setData({
        btnthree: '#99CC33',
        btntwo: '#ffffff',
        btnone: '#ffffff',
        btnfour: '#ffffff'
      })
    } else if (bid == "4") {
        this.setData({
          btnfour: '#99CC33',
          btntwo: '#ffffff',
          btnthree: '#ffffff',
          btnone: '#ffffff'
        })
    }
    var that = this;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'https://ssl.lyzwhh.top/clothes/clothes',
      method: 'PUT',
      header: {
        "token": token
      },
      data:{
        "clothes":{
          "1": {
            "id": this.data.thiscloth.id,
            "category": bid
          }
        }
      },
      success(res) {
        console.log(res)
        wx.switchTab({
          url: '/pages/define/showcloth'
        })
      },
      fail(res){
        console.log(res)
      }
    })
    
  },
  bindPickerChange(e) {
    let index = e.detail.value;
    let that = this;
    let token = wx.getStorageSync('token');
   // console.log("a",index)
    wx.request({
      url: 'https://ssl.lyzwhh.top/clothes/clothes',
      method: 'PUT',
      header: {
        "token": token
      },
      data: {
        "clothes": {
          "1": {
            "id": that.data.thiscloth.id,
            "color": index
          }
        }
      },
      success(res) {
        console.log(res)
        wx.switchTab({
          url: '/pages/define/showcloth'
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  bindconfirm: function (e) {
    var that = this;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'https://ssl.lyzwhh.top/clothes/clothes',
      method: 'PUT',
      header: {
        "token": token
      },
      data: {
        "clothes": {
          "1": {
            "id": that.data.thiscloth.id,
            "price": e.detail.value
          }
        }
      },
      success(res) {
        console.log(res)
        wx.switchTab({
          url: '/pages/define/showcloth'
        })
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
    console.log(thisclo)
    let that = this
    that.setData({
      thiscloth: thisclo
    })
    console.log(this.data.thiscloth)
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