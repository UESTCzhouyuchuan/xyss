var app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data:{
    hide: true,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  lifetimes:{
    attached(){
      let t = this
      if (this.data.hide)
      this.setData({
        timeNum: setTimeout(function(){
          t.setData({
            hide: false
          })
        },500)
      })
    },
    detached(){
      clearTimeout(this.data.timeNum)
    }
  }
})