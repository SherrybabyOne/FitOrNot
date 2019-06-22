var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
    data: {
      current: 'tab1',
      tab1:true,
      tab2:false,
      tab3:false,
      tab4:false,
      tab5: false,
      up: [],
      low: [],
      s: [],
      p: [],
      suit:{
       
      },
      width: (wx.getSystemInfoSync().windowWidth-30)/4
    },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getcloth();
  },
    handleChange ({ detail }) {
      var index = detail.key
      console.log(index)
      this.setData({
        current: detail.key
      });
      if (index == 1) {
        this.setData({
          tab1: true,
          tab2: false,
          tab3: false,
          tab4: false,
          tab5: false
        })
      } else if (index == 2) {
        this.setData({
          tab1: false,
          tab2: true,
          tab3: false,
          tab4: false,
          tab5: false
        })
      } else if (index == 3) {
        this.setData({
          tab1: false,
          tab2: false,
          tab3: true,
          tab4: false,
          tab5: false
        })
      } else if (index == 4) {
        this.setData({
          tab1: false,
          tab2: false,
          tab3: false,
          tab4: true,
          tab5: false
        })
      } else if (index == 5) {
        this.setData({
          tab1: false,
          tab2: false,
          tab3: false,
          tab4: false,
          tab5: true
        })
      }
  },


ondefine:function(e){
  console.log(e)
  wx.setStorage({
    key: 'suit',
    data: e.currentTarget.dataset.id
  })
  
  app.globalData.thisclo = e.currentTarget.dataset.dataset
  app.globalData.flag = e.currentTarget.dataset.id
  console.log(app.globalData.thisclo)
  wx.navigateTo({
    url: '/pages/showme/define'
  })
},
  getcloth: function () {
    let that = this;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'https://ssl.lyzwhh.top/clothes/clothes',
      method: 'GET',
      header: {
        "token": token,
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let obj = res.data.data
        let a; let b; let c; let d;
        if (obj) {
          for (var i in obj) {
            if (i == 'a') a = obj[i];
            else if (i == 'b') b = obj[i];
            else if (i == 'c') c = obj[i];
            else if (i == 'd') d = obj[i];
            console.log(a, b, c, d)
          }
          that.setData({
            up: a,
            low: b,
            s: c,
            p: d
          })
        }
        console.log("c", that.data.s)
        console.log("d", that.data.p)
        wx.request({
          url: 'https://ssl.lyzwhh.top/clothes/suit',
          method: 'GET',
          header: {
            "token": token,//token
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data.data);
            if (res.data.data) {
              that.setData({
                suit: res.data.data
              })
            }
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          },
          fail(res) {
            console.log(res)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getcloth()
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
    this.getcloth();
    
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