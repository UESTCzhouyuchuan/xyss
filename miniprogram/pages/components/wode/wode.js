// pages/components/wode/wode.js
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userInfo: null,
    hideChange: true
  },
  attached: function() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  methods: {
    UnLogin: function(e) {
      wx.showModal({
        title: '提示',
        content: '是否退出登陆',
        success: e => {
          if (e.confirm){
            wx.setStorageSync('login', false)
            wx.clearStorageSync('userInfo')
            wx.reLaunch({
              url: '/pages/login/login',
            })
          }
        }
      })
    },
    show: function(e) {
      this.setData({
        hideChange: false
      })
    },
    hide: function(e){
      this.setData({
        hideChange: true
      })
    }
  }
})