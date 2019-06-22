const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    comment: [],
    photoWidth: wx.getSystemInfoSync().windowWidth / 5,
    aa:'',
    pics_url:''
  },
  toit(){
    let openid=wx.getStorageSync('itopenid')
    wx.setStorageSync('showopenid', openid)
    wx.navigateTo({
      url: '/pages/circle/showme'
    })
  },
  deletemy(){
    let itopenid = wx.getStorageSync('itopenid');
    let myopenid = wx.getStorageSync('openid');
    let mid = wx.getStorageSync('momentid');
    let token = wx.getStorageSync('token');
    if (itopenid != myopenid) {
      wx.showToast({
        title: '不能删除别人的圈子',
        icon: 'none',
        duration: 2000
      })
    }
    else{
      wx.request({
        url: 'https://ssl.lyzwhh.top/moment/moment/' + mid,
        method: 'DELETE',
        header: {
          "token": token,//自己改
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          wx.showToast({
            title: '已删除',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/circle/circle'
            })
          }, 1000)
        },
        fail(res) {
          console.log(res)
        }
      })
    }

},
 
  ilike(){
    let itopenid = wx.getStorageSync('itopenid');
    let myopenid = wx.getStorageSync('openid');
    let mid = wx.getStorageSync('momentid');
    let token= wx.getStorageSync('token');
    if(itopenid!=myopenid){
      wx.request({
        url: 'https://ssl.lyzwhh.top/moment/checkIfLiked/' + mid,
        method: 'GET',
        header: {
          "token": token,
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          if(res.data.errcode==0){
            wx.request({
              url: 'https://ssl.lyzwhh.top/moment/like/'+mid,
              method: 'GET',
              header: {
                "token": token,//自己改
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res)
                wx.showToast({
                  title: '已点赞',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/circle/circle'
                  })
                }, 1000)
          
               
              },
              fail(res) {
                console.log(res)
              }
            })
          }else{
            wx.request({
              url: 'https://ssl.lyzwhh.top/moment/like/' + mid,
              method: 'DELETE',
              header: {
                "token": token,//自己改
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res)
                wx.showToast({
                  title: '已取消点赞',
                  icon: 'none',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/circle/circle'
                  })
                }, 1000)
              },
              fail(res) {
                console.log(res)
              }
            })
          }
          
        },
        fail(res) {
          console.log(res)
        }
      })
    }
  },
  ilove(){
    let itopenid = wx.getStorageSync('itopenid');
    let myopenid = wx.getStorageSync('openid');
    let token = wx.getStorageSync('token');
    if (itopenid != myopenid) {
      wx.request({
        url: 'https://ssl.lyzwhh.top/user/checkIfFollowed/' + itopenid,
        method: 'GET',
        header: {
          "token": token,
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          if (res.data.errcode == 0) {
            wx.request({
              url: 'https://ssl.lyzwhh.top/user/follow/' + itopenid,
              method: 'GET',
              header: {
                "token": token,//自己改
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res)
                wx.showToast({
                  title: '已关注',
                  icon: 'success',
                  duration: 2000
                })
              },
              fail(res) {
                console.log(res)
              }
            })
          } else {
            wx.request({
              url: 'https://ssl.lyzwhh.top/user/follow/' + itopenid,
              method: 'DELETE',
              header: {
                "token": token,//自己改
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res)
                wx.showToast({
                  title: '已取消关注',
                  icon: 'none',
                  duration: 2000
                })
              },
              fail(res) {
                console.log(res)
              }
            })
          }

        },
        fail(res) {
          console.log(res)
        }
      })
    }
  },
  deletec(e){
    let that=this;
    let id = e.target.dataset.dataset.id;
    let token = wx.getStorageSync('token');
    let openid=wx.getStorageSync('openid')
    let fromid = e.target.dataset.dataset.from;
    console.log("comment", e.target.dataset.dataset)
    if(fromid==openid){
      wx.showModal({
        title: '要删除这条评论吗',
        content: '确认删除',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: 'https://ssl.lyzwhh.top/moment/comment/' + id,
              method: 'DELETE',
              header:
              {
                "token": token
              },
              success(res) {
                console.log(res)
                
              },
              fail(res) {
                console.log(res)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
   
    }
  },
  // 点击图片进行大图查看
  LookPhoto: function (e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.photurl,
      urls: this.data.item.pics_url
    })
  },

  // 点击评论的人
  TouchZanUser: function (e) {
    console.log(e.currentTarget.dataset)
    wx.setStorageSync('showopenid', e.currentTarget.dataset.openid)
    wx.navigateTo({
      url: '/pages/circle/showme'
    })
  },

  
  seeit(){
    let that = this;
    let momentid=wx.getStorageSync('momentid')
    let token = wx.getStorageSync('token');
    this.setData({
      item:app.globalData.cdetail
    })
  console.log(that.data.item)
    // wx.cloud.getTempFileURL({
    //   fileList: [{
    //     fileID: this.data.item.pics_url,
    //     maxAge: this.data.photoWidth * this.data.photoWidth, // one hour
    //   }],
    //   success: res => {
    //     console.log(res.fileList)
    //     that.setData({
    //       pics_url = res.fileList.tempFileURL
    //     })
    //     console.log(that.data.pics_url)
    //   },
    //   fail: console.error
    // })
    
    wx.request({
      method: 'GET',
      url: 'https://ssl.lyzwhh.top/moment/comment/'+momentid,
      header:
      {
        "token": token
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          comment:res.data.data
        })
        
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  bindcomment(e){
    let c = e.detail.value
    let mid = wx.getStorageSync('momentid');
    //console.log(mid)
    let that = this;
    let token = wx.getStorageSync('token');
    wx.request({
      method: 'POST',
      url: 'https://ssl.lyzwhh.top/moment/comment',
      header:
      {
        "Content-Type": "application/json",
        "token": token
      },
      data:{
        "comment": {
          "content": c,
          "to": mid
        }
      },
      success(res) {
        console.log(res)
        that.seeit();
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
    this.seeit();
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
    this.seeit();
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