// miniprogram/pages/index/in.js
const db = wx.cloud.database()
const app = getApp()
var util = require('../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indate: '0',
    outdate:'0',
    daystart:'',
    dayend:'',
    date:'',
    number:[],
    listnumber:1,
    index:1,
    pickerIndex: -1,
    shebei:[],
    List:[],
    appointment:[],
    getstorage: [],
    info: [],
    disabled: false,//设置是否能点击 false可以 true不能点击
    placeholder: '请选择预约时间',
    placeholder1: '请选择归还时间',
    createdid:"",
    id:'',
    tiaokuanchecked:false
  },
  change(e){
     var NewListUnit = {};
     NewListUnit.name = e.detail.name;
     NewListUnit.nums = e.detail.nums;
     var pickerIndex = e.detail.pickerIndex-1
     var tempStr = 'List['+e.detail.pickerIndex+']'
     this.setData({
       [tempStr]: NewListUnit
     })
  },

  onSubmitevent: async function (e) {
    var date = this.data.date
    var indate = this.data.indate
    var outdate = this.data.outdate
    var list = this.data.List
    var info = e.detail.value
    var List = list.filter(x => x.name != "请选择")
    this.setData({
      List
    })
    if (this.data.List == "") {
      wx.showToast({
        title: '请输入借用设备',
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
    if(outdate > indate){
      wx.showToast({
        title: '预约时间有冲突',
      })
    }
    if (this.data.tiaokuanchecked===false) {
      wx.showToast({
        title: '请同意借用条例',
      })
    }
    this.judge()
    if (this.data.List.length >= 1 && e.detail.value.teacher && e.detail.value.members && e.detail.value.banji && outdate != date && indate != date && outdate < indate&&this.judge()&& this.data.tiaokuanchecked===true) {
      db.collection('shebei').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          date:this.data.date,
          value: 0,
          banji: e.detail.value.banji,
          indate: this.data.indate,
          outdate: this.data.outdate,
          members: e.detail.value.members,
          teacher: e.detail.value.teacher,
          shebei: List,
          createTime: db.serverDate()
        }
      })
        .then(res => {
          console.log(res)
          this.setData({
            createdid: res._id,
            List,
            info
          })
          this.setStorage() 
          let newlist=this.data.List
          newlist.forEach(v=>{
          wx.cloud.callFunction({
            name: 'reducenums',
            data: {
              name:v.name,
              nums:v.nums
            },
            success: (res) => {
              console.log(res)
            },
            fail(err) {
              console.log(err)
              wx.showToast({
                title: '提交失败，请检查网络后重试！',
                icon: 'none',
                mask:'true',
                duration: 2000//持续的时间
              })
            }
          })
          })
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
        })
    }
  },

setStorage: function () {
  var that = this
  var getstorage = that.data.getstorage
  var List = that.data.List
  var info = that.data.info
  var indate=that.data.indate
  var outdate=that.data.outdate
  var id = that.data.createdid
  var value=0
  var date=that.data.date
  info.date=date
  info.value=value
  info._id=id
  info.indate=indate
  info.outdate=outdate
  info.shebei=List
  getstorage.push(info)
  wx.setStorageSync('appointment', getstorage)
},

increase:function(){
  this.setData({
    pickerIndex: this.data.pickerIndex + 1
  })
var listnumber = this.data.listnumber;
  var index = this.data.index;
  var number = this.data.number;
  var list = this.data.List
  this.setData({
  listnumber:listnumber+1,
  index: index+1,
})
    number.push(index);
    var obj={}
    obj.name='请选择'
    obj.nums=1
    list.push(obj)
  this.setData({
    number :number
  })
},

reduce :function(){
  var listnumber = this.data.listnumber;
  var index = this.data.index;
 var number = this.data.number
 listnumber=listnumber-1
 index=index-1
 number.pop()
  var list = this.data.List
  list.pop()
  console.log(list)
//  number.prototype()
   this.setData({
     listnumber:listnumber,
     index:index,
   number:number,
   list:list
 })

},

onLoad: function (options) {
  var TIME = util.formatTime(new Date());
  const that = this;
  var outdate = that.data.outdate
  var indate = that.data.indate
  var date=that.data.date
  that.setData({
    indate: TIME,
    outdate: TIME,
    date: TIME,
  });
  this.shebeigetStorage()
},
onShow(){
  var { tiaokuanchecked } = wx.getStorageSync("tiaokuan")
  this.setData({
    tiaokuanchecked
  })
},
shebeigetStorage: function () {
  var that = this
  var getstorage = that.data.getstorage
  wx.getStorage({
    key: 'appointment',
    success: function (res) {
      console.log(res)
      getstorage = res.data
      that.setData({
        getstorage: getstorage
      })
    },
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
changechecked(){
  this.setData({
    tiaokuanchecked:!this.data.tiaokuanchecked
  })
  let tiaokuanchecked=this.data.tiaokuanchecked
  wx.setStorageSync("tiaokuan", {tiaokuanchecked})
}
})