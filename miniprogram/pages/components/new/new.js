const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  properties:{
    locateIndex: null
  },
  data: {
    CustomBar: app.globalData.CustomBar,
    AreaTabCur: 0, //选择区域modal中的scroll
    TabCur: 1, //顶部的TabCur
    scrollLeft: 0,
    userInfo: app.globalData.userInfo,
    locateList: null,

    hidden: {
      school: false,
      error: true, //控制modal
      area: true
    },
    choosePlaceIndex: null,
    schoolIndex: null,
    areaIndex: null,
    buildingIndex: null,
    areaNavPicker: ['请选择'], //区域modal的导航栏
    pickerSchool: ['清水河', '沙河'], //校区
    pickerArea: [
      ['学知苑', '硕丰苑', '博翰苑,留学生楼', '主楼,图书馆', '教学楼,科研楼,经管楼', '综合楼,核磁共振,5#科研楼,校医院', '活动中心,成电会堂,商业街,食堂,校园超市', '创新中心,研究院大楼,机器人基地,苗圃', '体育场馆', '其他区域'],
      ['宿舍楼', '教学,科研楼', '食堂,超市,体育场,校医院,保卫处', '室外及其他区域']
    ], //左边清水河,右边沙河
    pickerBuilding: [
      [
        ['本科1栋', '本科2栋', '本科3栋', '本科4栋', '本科5栋', '本科6栋', '本科7栋', '本科8栋', '本科9栋', '本科10栋', '本科11栋', '本科12栋', '本科13栋', '本科14栋', '本科15栋', '本科16栋', '本科17栋', '本科18栋', '本科19栋', '本科20栋', '本科21栋', '本科22栋', '本科23栋', '本科24栋', '本科25栋', '本科26栋'], //学知苑
        ['硕士1栋', '硕士2栋', '硕士3栋', '硕士4栋', '硕士5栋', '硕士6栋', '硕士7栋', '硕士8栋', '硕士9栋', '硕士10栋', '硕士11栋', '硕士12栋', '硕士13栋', '硕士14栋', '硕士15栋', '硕士16栋', '硕士17栋', '硕士18栋', '硕士19栋', '硕士20栋', '硕士21栋', '硕士22栋', '硕士23栋（本科23栋）'], //硕丰苑
        ['博士1栋一单元', '博士1栋二单元', '博士1栋三单元', '博士2栋一单元', '博士2栋二单元', '博士2栋三单元', '博士3栋一单元', '博士3栋二单元', '博士3栋三单元', '博士4栋一单元', '博士4栋二单元', '博士4栋三单元', '博士5栋一单元', '博士5栋二单元', '博士5栋三单元', '博士6栋一单元', '博士6栋二单元', '博士6栋三单元', '博士7栋', '博士8栋', '博士9栋', '留学生1栋', '留学生2栋'], //博翰苑,留学生楼
        [
          '主楼A1区', '主楼A2区', '主楼A3区', '主楼B1区', '主楼B2区', '主楼B3区', '主楼C1区', '主楼C2区', '图书馆主楼', '图书馆附楼', '图书馆报告厅'
        ] ,//主楼,图书馆
        [
          '品学楼A区', '品学楼B区', '品学楼C区', '立人楼A区', '立人楼B区', '科研楼A区（基础实验大楼）', '科研楼B区', '科研楼C区', '经管楼A区', '经管楼B区', '经管楼C区'
        ],//教学楼,科研楼,经管楼
        [
          '综合楼','5#科研楼','核磁共振','校医院'
        ],//综合楼,核磁共振,5#科研楼,校医院
        [
          '活动中心','成电会堂','商业街','一食堂','二食堂','三食堂','教工食堂','校园超市'
        ],//活动中心,成电会堂,商业街,食堂,校园超市
        [
          '创新中心','研究院大楼','机器人基地','苗圃'
        ],//创新中心,研究院大楼,机器人基地,苗圃
        [
          '风雨棚','体育馆','游泳馆'
        ],//体育场馆
        [
          '室外','其他区域'
        ],//室外及其他区域
      ],
      [
        ['12栋', '13栋', '14栋', '15栋', '16栋', '17栋', '18栋', '欣苑1栋', '欣苑2栋', '欣苑3栋', '欣苑4栋', '欣苑4栋(留学生)', '欣苑5栋(男)', '欣苑5栋(女)', '欣苑6栋', '欣苑7栋教改楼'], //宿舍楼,沙河
        ['一教', '二教', '三教', '四教', '逸夫楼', '通信楼', '微固楼', '光电楼', '物电楼', '计算机楼', '211大楼', '主楼东', '主楼中', '主楼西', '图书馆', '图书馆(老)', '成教院', '信软楼'], //教学,科研楼
        [
          '风华餐厅', '万友餐厅', '阳关餐厅', '桂苑餐厅', '校园超市(一分店)', '校园超市(二分店)', '校园超市(三分店)', '保卫处', '活动中心', '体育场', '校医院'
        ], //食堂,超市,体育场,校医院,保卫处
        [
          '室外', '其他区域'
        ]
      ]

    ],
    areaList: [,], //存放区域,以及对应楼栋
    multiArray: [
      [1, 2, 3, 4, 5, 6, 7],
      [0, 1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 6, 7, 8, 9]
    ],
    multiIndex: [0, 0, 0],
  },
  lifetimes: {
    attached: function () {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      if (app.globalData.userInfo.locateList) {
        this.setData({
          locateList: app.globalData.userInfo.locateList
        })
      }
      if (this.data.locateList == null || this.data.locateList.length == 0) {
        this.setData({
          TabCur: 0
        })
      }
    },
    detached: function () {
      if (this.data.timeNum)
        clearTimeout(this.data.timeNum)
    },
  },
  methods: {
    //使用旧地址选择
    RadioLocate(e) {
      let index = e.currentTarget.dataset.index
      if (index != this.data.choosePlaceIndex) {
        this.data.choosePlaceIndex = index
      }
    },
    PrefixInteger(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
    Submit(e) {
      let data = this.data
      let room, building, area, school;
      console.log("TabCur", data.TabCur)
      if (data.TabCur == 1) {
        if (data.choosePlaceIndex != null) {
          let place = data.locateList[data.choosePlaceIndex]
          console.log(place)
          room = place.room
          building = place.building
          area = place.area
          school = place.school
        } else {
          wx.showToast({
            title: '请选择地址',
            icon: 'none'
          })
          return;
        }
      } else
        if (data.schoolIndex != null && data.areaIndex != null && data.buildingIndex != null) {


          room = "" + data.multiArray[0][data.multiIndex[0]] + data.multiArray[1][data.multiIndex[1]] + data.multiArray[2][data.multiIndex[2]]
          school = data.pickerSchool[data.schoolIndex]
          area = data.pickerArea[data.schoolIndex][data.areaIndex]
          building = data.pickerBuilding[data.schoolIndex][data.areaIndex][data.buildingIndex]
        } else {
          wx.showToast({
            title: '新建地址不完整',
            icon: 'none',
          })
          return
        }
      console.log(school, area, building)

      let user = {
        name: data.userInfo.name,
        phone: data.userInfo.phone
      }
      let date = new Date()
      let month = date.getMonth()
      let weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let orderNum = "" + date.getFullYear() + this.PrefixInteger(date.getMonth() + 1, 2) + this.PrefixInteger(date.getDate(), 2) + this.PrefixInteger(date.getHours(), 2) + this.PrefixInteger(date.getMinutes(), 2) + this.PrefixInteger(date.getSeconds(), 2) + data.schoolIndex + this.PrefixInteger(data.areaIndex, 2) + this.PrefixInteger(data.buildingIndex, 2)
      let time = date.getFullYear() + "-" + this.PrefixInteger(date.getMonth() + 1, 2) + "-" + this.PrefixInteger(date.getDate(), 2) + " " + weekday[date.getDay()] + " " + this.PrefixInteger(date.getHours(), 2) + ":" + this.PrefixInteger(date.getMinutes(), 2);
      let db = wx.cloud.database()
      db.collection('places').add({
        data: {
          orderNum: orderNum,
          time: time,
          place: {
            school: school,
            area: area,
            building: building,
            room: room
          },
          user: user
        },
        success: res => {
          wx.showModal({
            title: '提示',
            content: '你的请求已收到\n' + "送水地点是：" + school + "->" + area + "->" + building + "->房间" + room + ". 相关信息请到我的记录中查看",
            showCancel: false
          })
          let locate = {
            school: school,
            area: area,
            building: building,
            room: room
          }
          let locateList = app.globalData.userInfo.locateList
          let has = false
          if (locateList != null) {
            for (var i = 0; i < locateList.length; i++) {
              if (locateList[i].area == locate.area &&
                locateList[i].building == locate.building &&
                locateList[i].room == locate.room
              ) {
                console.log("Alreadly have")
                has = true;
              }
            }
          }
          const _ = db.command
          has || (
            db.collection('userList').doc(data.userInfo._id).update({
              data: {
                locateList: _.unshift(locate)
              },
              success: res => {
                if (!locateList) {
                  locateList = [locate,]
                } else {
                  locateList.unshift(locate)
                }
                app.globalData.userInfo.locateList = locateList
                data.userInfo.locateList = locateList
                wx.setStorageSync('userInfo', data.userInfo)
                console.log("添加成功", data.userInfo)
              },
              fail: err => {
                console.log("添加失败", err)
              }
            })
          )
          has = false
        },
        fail: err => {
          wx.showModal({
            title: '提示',
            content: '失败,请检查网络连接',
            showCancel: false
          })
        }
      })
      var t = this
      this.setData({
        timeNum: setTimeout(function () {
          t.setData({
            schoolIndex: null,
            areaIndex: null,
            buildingIndex: null,
            areaNavPicker: ['请选择'],
            multiIndex: [0, 0, 0],
          })
        }, 100)
      })
    },
    MultiChange(e) {
      console.log('picker发送选择改变,携带值为', e.detail.value)
      this.setData({
        multiIndex: e.detail.value
      })
    },
    MultiColumnChange(e) {
      let data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value
      this.setData(data)
    },
    tabSelectArea(e) {
      this.setData({
        AreaTabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
      console.log("scrollLeft", this.data.scrollLeft)
    },
    showSchoolModal(e) {
      this.setData({
        'hidden.school': false
      })
    },
    hideSchoolModal(e) { //选择校区
      this.setData({
        'hidden.school': true,
      })
      if (e.currentTarget.dataset.index != null) {
        if (e.currentTarget.dataset.index != this.schoolIndex) {
          this.setData({
            schoolIndex: e.currentTarget.dataset.index,
            buildingIndex: null,
            areaIndex: null,
            AreaTabCur: 0,
            areaNavPicker: ['请选择'],
            areaList: [this.data.pickerArea[e.currentTarget.dataset.index]],
            'hidden.area': false
          })
        }

        console.log("schoolIndex", e.currentTarget.dataset.index)
      }
    },

    showAreaModal(e) {
      if (this.data.schoolIndex == null) {
        this.setData({
          'hidden.error': false
        })
      } else {
        if (this.data.buildingIndex != null) {
          this.setData({
            AreaTabCur: e.currentTarget.dataset.id
          })
        }
        this.setData({
          'hidden.area': false,
        })
      }
    },
    setArea(e) {
      var picker = this.data.pickerArea[this.data.schoolIndex]
      var building = this.data.pickerBuilding[this.data.schoolIndex][e.currentTarget.dataset.index]
      this.data.areaNavPicker.splice(0, 2),
        this.setData({
          areaIndex: e.currentTarget.dataset.index,
          areaNavPicker: this.data.areaNavPicker.concat([picker[e.currentTarget.dataset.index], "请选择"]),
          areaList: [this.data.pickerArea[this.data.schoolIndex], building],
        })
      if (this.data.buildingIndex == null) { //未设置楼栋,自动跳转
        this.setData({
          AreaTabCur: 1
        })
      }
      //console.log("scrollLeft",this.data.scrollLeft)
      console.log("areaIndex", e.currentTarget.dataset.index)
    },
    hideAreaModal(e) {
      if (e.currentTarget.dataset.index != null && e.currentTarget.dataset.index != this.data.buildingIndex) {
        var building = this.data.areaList[1][e.currentTarget.dataset.index]
        this.data.areaNavPicker.pop()
        this.setData({
          buildingIndex: e.currentTarget.dataset.index,
          areaNavPicker: this.data.areaNavPicker.concat(building),
        })
        console.log("buildingIndex", e.currentTarget.dataset.index)
      }
      this.setData({
        'hidden.area': true
      })
    },
    hideErrorModal(e) {
      this.setData({
        'hidden.error': true
      })
    },
    show(e) {

    },
    switchTabArea: function (e) {
      this.setData({
        AreaTabCur: e.detail.current
      });
    },
    //顶部TabCur
    switchTab: function (e) {
      this.setData({
        TabCur: e.detail.current
      })
    },
    tabSelect: function (e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id
      })
    }
  }
})