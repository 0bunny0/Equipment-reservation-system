// pages/shiyanshi/shiyanshi.js
const db = wx.cloud.database()
const app = getApp()
var util = require('../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    daystart:'',
    dayend:'',
    date:'',
    indate: '',
    outdate: '',
     onename : "123",
    shiyanshi:'',
    getstorage: [],
    info: [],
    disabled: false,//设置是否能点击 false可以 true不能点击
    placeholder: '请选择预约时间',
    placeholder1: '请选择归还时间',
    createdid: "",
    tiaokuanchecked:false
  },

  onSubmitevent: function (e){
    var date = this.data.date
    var indate = this.data.indate
    var outdate = this.data.outdate
    var info = e.detail.value
    var newshiyanshi=this.data.shiyanshi
    this.setData({
      shiyanshi: newshiyanshi.replace("请选择", '')
    })
    if (this.data.shiyanshi === "") {
      wx.showToast({
        title: '请输入所借实验室',
      })
    }
    if (e.detail.value.teacher == "") {
      wx.showToast({
        title: '请输入指导老师',
      })
    }

    if (e.detail.value.members == "") {
      wx.showToast({
        title: '请输入小组成员',
      })
    }
    if (e.detail.value.banji == "") {
      wx.showToast({
        title: '请输入所属班级',
      })
    }
    if (indate == date) {
      wx.showToast({
        title: '请输入归还时间',
      })
    }
    if (outdate == date) {
      wx.showToast({
        title: '请输入预约时间',
      })
    }
    if (outdate > indate) {
      wx.showToast({
        title: '预约时间有冲突',
      })
    }
    if (this.data.tiaokuanchecked === false) {
      wx.showToast({
        title: '请同意借用条例',
      })
    }
    this.judge()
    if (this.data.shiyanshi && e.detail.value.teacher && e.detail.value.members && e.detail.value.banji && outdate != date && indate != date && outdate < indate&&this.judge()&& this.data.tiaokuanchecked===true) {
      db.collection('shiyanshi').add({
        data: {
          value:0,
          banji: e.detail.value.banji,
          date: this.data.date,
          indate: this.data.indate,
          outdate: this.data.outdate,
          members: e.detail.value.members,
          teacher: e.detail.value.teacher,
          shiyanshi: this.data.shiyanshi,
          createTime: db.serverDate()
        },
        success: res=> {
          console.log(res)
          this.setData({
            createdid: res._id,
            info
          })
          console.log(info)
          this.setStorage()
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            mask:'true',
            duration: 2000//持续的时间
          })
          setTimeout(function () {
            //要延时执行的代码
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      })
    }
  },
  setStorage: function () {
    var that = this
    var getstorage = that.data.getstorage
    var shiyanshi = that.data.shiyanshi
    var info = that.data.info
    var indate = that.data.indate
    var outdate = that.data.outdate
    var id = that.data.createdid
    var value = 0
    var date = that.data.date
    info.date = date
    info.value = value
    info._id = id
    info.indate = indate
    info.outdate = outdate
    info.shiyanshi= shiyanshi
    getstorage.push(info)
    wx.setStorageSync('shiyanshi', getstorage)
  },


  bindPickerChangeone: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChangetwo: function (e) {
    console.log(e.detail.value)
    this.setData({
      anotherindex: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var TIME = util.formatTime(new Date());
    const that = this;
    var outdate = that.data.outdate
    var indate = that.data.indate
    var date=that.data.date
    that.setData({
      date:TIME,
      indate: TIME,
      outdate: TIME,
    });
    this.shebeigetStorage()
  },
  onShow() {
    var { tiaokuanchecked } = wx.getStorageSync("tiaokuan")
    this.setData({
      tiaokuanchecked
    })
  },
  shebeigetStorage: function () {
    var that = this
    var getstorage = that.data.getstorage
    wx.getStorage({
      key: 'shiyanshi',
      success: function (res) {
        console.log(res)
        getstorage = res.data
        that.setData({
          getstorage: getstorage
        })
      },
    })
  },

  change(e) {
    console.log(e)
    var that=this
     var shiyanshi=that.data.shiyanshi
     that.setData({
       shiyanshi:e.detail.name
     })
  },

  onPickerChangeoutdate: function (e) {
    console.log(e)
    this.setData({
      daystart: e.detail.year + "-" + e.detail.month + "-" + e.detail.day,
      outdate: e.detail.dateString
    })

  },

  onPickerChangeindate: function (e) {
    console.log(e)
    this.setData({
      dayend: e.detail.year + "-" + e.detail.month + "-"+e.detail.day,
      indate: e.detail.dateString
    })
  },
  judge(){

    var that=this
    var start_date = new Date(that.data.daystart.replace(/-/g, "/"));
    var end_date = new Date(that.data.dayend.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    if (day>3){
      wx.showToast({
        title: '借用时间不得超过三天',
        icon: 'none',
      })
      return false;
    }else{
      return true;
    }
  },
  changechecked() {
    this.setData({
    tiaokuanchecked: !this.data.tiaokuanchecked
    })
    let tiaokuanchecked = this.data.tiaokuanchecked
    wx.setStorageSync("tiaokuan", { tiaokuanchecked })
  }
})
