const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    detached() {
      if (this.data.number) {
        console.log("timeout回收", this.data.number)
        clearTimeout(this.data.number)
      }
    }
  },
  data: {
    oldpassword: null,
    newpassword: null,
    repNewPassword: null,
    number: null
  },
  methods: {
    confirmInfo: function(e) {
      var data = this.data
      var passReg = /^\w{8,}$/;
      var passReg1 = /^.*[a-zA-Z].*[a-zA-Z].*$/;
      if (!data.oldpassword) {
        wx.showToast({
          title: '输入原来的密码',
          icon: 'none',
          duration: 1000,
        })
      } else if (!data.newpassword) {
        wx.showToast({
          title: '输入新的的密码',
          icon: 'none',
          duration: 1000,
        })
      } else if (!data.repNewPassword) {
        wx.showToast({
          title: '再次输入新密码',
          icon: 'none',
          duration: 1000,
        })
      } else if (app.globalData.userInfo.password != data.oldpassword) {
        wx.showToast({
          title: '密码错误',
          icon: 'none',
          duration: 1000,

        })
      } else if (data.oldpassword == data.newpassword) {
        wx.showToast({
          title: '新密码不能与原来密码一样',
          icon: 'none',
          duration: 1000,
        })
      } else if (data.newpassword != data.repNewPassword) {
        wx.showToast({
          title: '两次密码不一致',
          icon: 'none',
          duration: 1000,
        })
      } else if (!passReg.test(data.newpassword)) {
        wx.showToast({
          title: '密码至少8位,由字母数字下划线组成',
          icon: 'none',
          duration: 1000,
        })
      } else if (!passReg1.test(data.newpassword)) {
        wx.showToast({
          title: '密码至少包含两位字母',
          icon: 'none',
          duration: 1000,
        })
      } else {
        var userInfo = app.globalData.userInfo
        const db = wx.cloud.database()
        db.collection('userList').doc(userInfo._id).update({
          data: {
            password: data.newpassword
          },
          success(res) {
            userInfo.password = data.newpassword
            wx.setStorageSync('userInfo', userInfo)
            console.log("change Successful")
          },
          fail(err) {
            console.log("Change Fail")
          }
        });
        var t = this;
        var number = setTimeout(function() {
          t.triggerEvent("confirm", {
            bubbles: false
          });
        }, 200);
        this.data.number = number
        wx.showModal({
          title: '成功',
          content: '修改密码成功',
          showCancel: false
        })
      }

    },
    OldPass: function(e) {
      this.setData({
        oldpassword: e.detail.value
      })
      console.log("here")
    },
    NewPass: function(e) {
      this.setData({
        newpassword: e.detail.value
      })
    },
    RepNewPass: function(e) {
      this.setData({
        repNewPassword: e.detail.value
      })
    },

  }
})