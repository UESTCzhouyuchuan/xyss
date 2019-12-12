// pages/login/login.js
const app=getApp();
Page({
  data:{
    tryCount:0,
    login: null,
  },
  onLoad: function(){
    this.setData({
      login: wx.getStorageSync('login')
    })
    console.log("login",this.data.login)
    if (this.data.login && wx.getStorageSync('userInfo') && wx.getStorageSync('openid')){
      app.globalData.userInfo = wx.getStorageSync('userInfo')
      console.log("login userInfo:",app.globalData.userInfo)
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  },
  ConfirmLogin: function(){
    var data = this.data
    if (data.phone == null || data.phone==""){
      wx.showToast({
        title: '输入手机号',
        icon: 'none'
      })
    }
    else if(data.password == null || data.password == ""){
      wx.showToast({
        title: '输入密码',
        icon: 'none'
      })
    }
    else{
      const db = wx.cloud.database()
      db.collection('userList').where({
        phone: data.phone
      }).get({
          success: res =>{
            console.log('[数据库] [查询记录] 成功: ', res,data.phone)
            if (res.data.length == 0){
              wx.showToast({
                icon: 'none',
                title: '无该用户，请先注册'
              })
            }
            else{
              console.log(res.data[0].password,data.password)
              if (res.data[0].password != data.password){
                wx.showToast({
                  icon: 'none',
                  title: '密码错误'
                })
                //error time plus one
                this.setData({
                  tryCount: this.data.tryCount+1
                })
                console.log("tryCount",this.data.tryCount)
              }// login successful
              else{
                wx.setStorageSync('login', true)
                wx.setStorageSync('userInfo', res.data[0])
                app.globalData.userInfo=res.data[0]
                wx.showToast({
                  icon: 'loading',
                  title: '登陆成功',
                  duration: 1000
                })
                wx.redirectTo({
                  url: '/pages/index/index',
                })
              }
            }
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '后台查询失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })
    }
  },
  PhoneBlur: function(e){
    if (e.detail.value){
      this.setData({
        "phone": e.detail.value
      })
    }
  },
  PassBlur: function (e){
    if (e.detail.value) {
      this.setData({
        "password": e.detail.value
      })
    }
  },
  Register: function(e){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  onShareAppMessage(res) {
    return {
      title: "快来围观",
      path: "pages/login/login",
      imageUrl: "../../images/girl2.jpg"
    }
  }

})