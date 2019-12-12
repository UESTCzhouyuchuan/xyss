// pages/orderForm/orderForm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: null
  },
  searchOrder: function(){
    var db = wx.cloud.database()
    var that = this
    db.collection('places').where({
      _openid: app.globalData.openid
    })
      .orderBy('time','desc')
      .get({
        success(res) {
          console.log("查询成功", res.data)
          that.setData({
            orders: res.data
          })
        },
        fail: err => {
          console.log("查询失败", err.errMsg)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.searchOrder()
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
    wx.startPullDownRefresh({
      
    })
    this.searchOrder()
    wx.stopPullDownRefresh()
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