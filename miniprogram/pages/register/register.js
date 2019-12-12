// pages/register/register.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "name": "",
    "phone": "",
    "password": "",
    "repNewPassword": ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  NameBlur: function(e) {
    this.setData({
      "name": e.detail.value
    })
  },
  PhoneBlur: function(e) {
    this.setData({
      "phone": e.detail.value
    })
  },
  PassBlur: function(e) {
    this.setData({
      "password": e.detail.value
    })
  },
  RepNewPass: function (e) {
    this.setData({
      repNewPassword: e.detail.value
    })
  },
  Register: function() {
    var myData = this.data;
    //手机号,密码格式
    var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(16[0-9]{1}))+\d{8})$/;
    var passReg = /^\w{8,}$/;
    var passReg1 = /^.*[a-zA-Z].*[a-zA-Z].*$/;
    //   分开来注释一下：
    //  ^ 匹配一行的开头位置
    //   (?![0 - 9] + $) 预测该位置后面不全是数字
    //    (?![a - zA - Z] + $) 预测该位置后面不全是字母
    //    [0 - 9A - Za - z] { 6, 10 } 由6 - 10位数字或这字母组成
    //    $ 匹配行结尾位置
    console.log(myData)
    //姓名。手机号，密码其中一个为空
    if (myData.name == null || myData.phone == null || myData.password == null || myData.repNewPassword == null ||
      myData.name == "" || myData.phone == "" || myData.password == "" || myData.repNewPassword == "") {
      wx.showToast({
        title: '注册失败，输入电话，姓名和密码,并重复密码',
        icon: 'none'
      })
    } else if (myData.phone.length != 11) {
      wx.showToast({
        title: '请检查输入的手机号长度是否有误',
        icon: 'none'
      })
    } else if (!phoneReg.test(myData.phone)) {
      wx.showToast({
        title: '手机号格式有误',
        icon: 'none'
      })
    } else if (myData.password != myData.repNewPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none'
      })
    }else if (!passReg.test(myData.password)) {
      wx.showToast({
        title: '密码至少8位，由字母数字下划线组成',
        icon: 'none'
      })
    } else if (!passReg1.test(myData.password)) {
      wx.showToast({
        title: '至少包含两个字母',
        icon: 'none'
      })
    } else {
      wx.cloud.callFunction({
        name: 'queryUser',
        data: {
          phone: myData.phone,
          openid: app.globalData.openid
        },
        success: res => {
          console.log('[userList] [查询记录] 成功: ', res.result)
          this.setData({
            "length": res.result
          })
          if (this.data.length != 0) {
            wx.showToast({
              title: '手机号已经注册',
            })
          } else {
            // 1. 获取数据库引用
            const db = wx.cloud.database()
            // 2. 构造查询语句
            // collection 方法获取一个集合的引用
            // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），
            //具体见文档查看支持列表
            // get 方法会触发网络请求，往数据库取数据
            let t =this
            var number=setTimeout(function() {
              db.collection('userList').add({
                data: {
                  name: t.data.name,
                  phone: t.data.phone,
                  password: t.data.password,
                  locateList: [],
                },
                success: res => {
                  wx.showModal({
                    title: '注册成功',
                    content: '返回登陆',
                    success: e => {
                      if (e.confirm) {
                        wx.reLaunch({
                          url: '/pages/login/login',
                        })
                      }
                    }
                  })
                },
                fail: err => {
                  wx.showToast({
                    icon: 'none',
                    title: '新增记录失败'
                  })
                  console.error('[数据库] [新增记录] 失败：', err)
                }
              })
            }, 200)
            this.setData({
              timeoutNum: number
            })
          }
        },
        fail: err => {
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (this.data.timeoutNum!=null){
      clearTimeout(this.data.timeoutNum)
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {
    return {
      title: "快来围观",
      path: "pages/login/login",
      imageUrl: "../../images/girl2.jpg"
    }
  }
})