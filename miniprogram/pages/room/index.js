const app = getApp();
Page({
  data: {
    suit: {
      1: {
        id: '',
        url: 'http://prl9w3brg.bkt.clouddn.com/a1.png',
        x: 60,
        y: 10
      },
      2: {
        id: '',
        url: 'http://prl9w3brg.bkt.clouddn.com/a2.png',
        x: 67,
        y: 100
      },
      3: {
        id: '',
        url: 'http://prl9w3brg.bkt.clouddn.com/a3.png',
        x: 58,
        y: 200
      },
      4: {
        id: '',
        url: 'http://prl9w3brg.bkt.clouddn.com/a4.png',
        x: 60,
        y: 355
      }
    },
    current: '1',
    tab1:true,
    tab2:false,
    tab3:false,
    tab4:false,
    clothesImg: [],
    current_scroll: 0
  },
  onChange(e){
    const that = this;
    const type = e.currentTarget.dataset.type;
    that.setData({
      ...that.data.suit,
      [type]: {
        ...that.data.suit[type],
        x: e.detail.x,
        y: e.detail.y
      }
    })
  },
  handleTap(){
    const type = e.currentTarget.dataset.type;
  },
  handleChange ({ detail }) {
    this.setData({
        current: detail.key,
        current_scroll: 0
    });
    if (detail.key == 1) {
      this.setData({
        tab1: true,
        tab2: false,
        tab3: false,
        tab4: false
      })
    } else if (detail.key == 2) {
      this.setData({
        tab1: false,
        tab2: true,
        tab3: false,
        tab4: false
      })
    } else if (detail.key == 3) {
      this.setData({
        tab1: false,
        tab2: false,
        tab3: true,
        tab4: false
      })
    } else if (detail.key == 4) {
      this.setData({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: true
      })
    }
  },
  onPicture(){
    const that = this;
    const timestamp=new Date().getTime();
    let token = wx.getStorageSync('token');
    let openid = wx.getStorageSync('openid');
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album',],
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: `${openid}/${that.data.current}/${timestamp}`,
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            //请求数据
            wx.request({
              url: 'https://ssl.lyzwhh.top/clothes/clothes',
              header: {
                "token": token
              },
              method: 'POST',
              data: {
                clothes: {
                  "1": {
                    pic_url: res.fileID,
                    category: that.data.current
                  }
                }
              }
            })
            //重新拉取衣服列表
            that.getClothes();
          },
        })
      },
    })
  },
  onCamera(){
    const that = this;
    const timestamp=new Date().getTime();
    let token = wx.getStorageSync('token');
    let openid = wx.getStorageSync('openid');
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera',],
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: `${openid}/${that.data.current}/${timestamp}`,
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            wx.request({
              url: 'https://ssl.lyzwhh.top/clothes/clothes',
              header: {
                "token": token
              },
              method: 'POST',
              data: {
                clothes: {
                  "1": {
                    pic_url: res.fileID,
                    category: that.data.current
                  }
                }
              }
            })
            that.getClothes();
          },
        })
      },
    })
  },
  handleShare(){
    console.log('aaa')
  },
  handleSuitSave(){
    let token =wx.getStorageSync('token')
    const that = this;
    if(!that.data.suit[1].id||!that.data.suit[2].id||!that.data.suit[3].id||!that.data.suit[4].id){
      wx.showToast({
        title: '请每件装饰都上传！',
        icon: 'none'
      })      
      return ;
    }
    wx.request({
      url: 'https://ssl.lyzwhh.top/clothes/suit',
      method: 'POST',
      header: {
        "token": token
      },
      data: {
        suit: that.data.suit
      },
      success(){
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
        console.log('上传搭配成功')
      }
    })
  },
  handleSelect(e){
    this.setData({
      current_scroll: e.detail.current
    })
  },
  handleSelector(e){
    console.log(app.globalData.clothes,e.currentTarget.dataset.type,this.data.current_scroll,'aaaa')
    const that = this;
    //衣服种类type
    const type = e.currentTarget.dataset.type;
    //获取衣服的index
    const current_scroll = that.data.current_scroll;
    //获取衣服id
    const id = app.globalData.clothes[type-1][current_scroll].id;
    //获取衣服的url链接
    const url = app.globalData.clothes[type-1][current_scroll].pic_url;
    //点击更新data中的suit
    console.log(type,current_scroll)
    that.setData({
      suit: {
        ...that.data.suit,
        [type]: {
          ...that.data.suit[type],
          id,
          url
        }
      }
    })
  },
  //获取衣服和衣服列表
  getClothes(){
    const that = this;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'https://ssl.lyzwhh.top/clothes/clothes2',
      method: 'GET',
      header: {
        "token": token
      },
      success (res) {
        if(res.statusCode === 200){
          let clothes = res.data.data;
          console.log(res)
          app.globalData.clothes = clothes ;
          const clothesImg = []
          if(clothes){
          clothes.map((item,index)=>{
            clothesImg[index] = []
            item.map(v=>{
              clothesImg[index].push(v.pic_url)
            })
          })
          that.setData({
            clothesImg
          })}
          console.log(app.globalData.clothes,'bbbb')
        }
      }
    })
  },
  getSuit(){
    let token = wx.getStorageSync('token');
    const that = this;
    wx.request({
      url: 'https://ssl.lyzwhh.top/clothes/suit',
      method: 'GET',
      header: {
        "token": token
      },
      success(res){
        if(res.statusCode===200){
          console.log(res.data)
        }
      }
  })
},

  onLoad(){
    this.getClothes();
    this.getSuit();
  }
})