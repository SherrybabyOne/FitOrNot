// pages/enter/enter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    userInfo: {},
    gender:1,
    formId:'',
    avatarUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
    settingflag:false,
  },
  bindsign: function (e) {
    var that = this;
    var sign = e.detail.value
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'https://ssl.lyzwhh.top/user/userInfo',
      method: 'POST',
      header: {
        "token": token
      },
      data: {
        "data":{
          "signature":sign
        }
      },
      success(res) {
        console.log(res)
        wx.switchTab({
          url: '/pages/enter/enter'
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  bindheight: function (e) {
    var that = this;
    var sign = e.detail.value
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'https://ssl.lyzwhh.top/user/userInfo',
      method: 'POST',
      header: {
        "token": token
      },
      data: {
        "data": {
          "height": sign
        }
      },
      success(res) {
        console.log(res)
        wx.switchTab({
          url: '/pages/enter/enter'
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  bindweight: function (e) {
    var that = this;
    var sign = e.detail.value
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'https://ssl.lyzwhh.top/user/userInfo',
      method: 'POST',
      header: {
        "token": token
      },
      data: {
        "data": {
         "weight": sign
        }
      },
      success(res) {
        console.log(res)
        wx.switchTab({
          url: '/pages/enter/enter'
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  switchChange(e){
    console.log(e)
    this.setData({
      show:e.detail.value
    })
    let token = wx.getStorageSync('token')
    let flag =1;
    if(e.detail.value==true)flag=0;
    
      wx.request({
        url: 'https://ssl.lyzwhh.top/user/setConfig/'+flag,
        header: {
          "token": token
        },
        success(res) {
          console.log(flag)
          console.log(res)
        }
      })
    
  },
  submitmy(e) {
    let token = wx.getStorageSync('token');
    //console.log('form发生了submit事件，携带数据为：',     e.detail.value)
    wx.request({
      url: 'https://ssl.lyzwhh.top/user/userInfo',
      method: 'POST',
      data: {
        "signature":e.detail.value.signature,
        "figure":{
          "height": e.detail.value.height,
          "weight": e.detail.value.weight  
        } 
      },
      header: {
        "token":token,//自己改
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
    this.setData({
      item: {
        signature: e.detail.value.signature,
        figure: {
          height: e.detail.value.height,
          weight: e.detail.value.weight  
      }
      }
    })
  },


  settingmy:function(){
    this.setData({
      settingflag:true
    })
  },
  resetflag: function () {
    this.setData({
      settingflag: false
    })
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '搭不搭',
      path: '../enter/enter',
      success: function (res) {
        console.log('成功', res)
      }

  }
  }     
 ,
 getmy(){
   let token = wx.getStorageSync('token')
   let that =this;
   wx.request({
     url: 'https://ssl.lyzwhh.top/user/userInfo',
     header: {
       token: token,
     },
     success(res) {
       
       wx.setStorage({
         key: 'userInfo',
         data: res.data.data,
       })
       that.setData({
         userInfo: wx.getStorageSync('userInfo'),
         gender: wx.getStorageSync('gender')
       })
       wx.request({
         url: 'https://ssl.lyzwhh.top/user/getConfig',
         header: {
           "token": token
         },
         success(res) {
           console.log("flag", res.data.data)
           let show = res.data.data.hide_figure;
           that.setData({
             show: (show == '1' ? false: true)//=1 hide
           })
         }
       })
     }
     ,
     fail(res) {
       console.log(res)
     }
   })
   
 }
 ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getmy();
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
    this.getmy();
    
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