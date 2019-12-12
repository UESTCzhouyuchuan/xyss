Page({
  data:{
    PageCur: null,
    locateIndex: null
  },
  onLoad: function(option){
    if (option.page!=null){
      this.setData({
        PageCur: option.page,
        locateIndex: option.index
      })
    }else{
      this.setData({
        PageCur: 'shouye'
      })
    }
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
})