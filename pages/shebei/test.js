// pages/test/test.js
const db = wx.cloud.database()
const app = getApp()
var util = require('../util/util.js')
Page({
agree(e){
  const index = e.currentTarget.dataset.index
  const db = wx.cloud.database()
  wx.cloud.callFunction({
    name:"changevalue",
    data:{
      name:'shebei',
      value:1,
      _id: e.currentTarget.id
    },
    success:(res)=>{
      wx.showToast({
        title: '处理成功',
        icon: 'success',
        duration: 1500,
        mask: true,
      });
      console.log(res)
    }
  })
  var temstring = 'list['+index+']'+'.'+'value'
  this.setData({
    [temstring]:1
  })
},
disagree(e) {
  const index = e.currentTarget.dataset.index
  const db = wx.cloud.database()
  wx.cloud.callFunction({
    name: "changevalue",
    data: {
      name: 'shebei',
      value: 2,
      _id: e.currentTarget.id
    },
    success: (res) => {
      wx.showToast({
        title: '处理成功',
        icon: 'success',
        duration: 1500,
        mask: true,
      });
      console.log(res)
    }
  })
  var temstring = 'list[' + index + ']' + '.' + 'value'
  this.setData({
    [temstring]: 2
  })
  let deletelist=this.data.list.find((v,i)=>i===index)
  let deleteshebei = deletelist.shebei.filter(v=>v!==null)
  deleteshebei.forEach((v,i)=>{
      wx.cloud.callFunction({
        name:"addnums",
        data:{
        name:v.name,
        nums:v.nums
        }
      })
      .then(res=>{
        wx.showToast({
          title: '处理成功',
          icon: 'success',
          duration: 1500,
          mask: true,
        });
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
  })
},
finish(e){
  const index = e.currentTarget.dataset.index
  const db = wx.cloud.database()
  wx.cloud.callFunction({
    name: "changevalue",
    data: {
      name: 'shebei',
      value: 3,
      _id: e.currentTarget.id
    },
    success: (res) => {
      wx.showToast({
        title: '处理成功',
        icon: 'success',
        duration: 1500,
        mask: true,
      });
      console.log(res)
    }
  })
  var temstring = 'list[' + index + ']' + '.' + 'value'
  this.setData({
    [temstring]: 3
  })
  let deletelist = this.data.list.find((v, i) => i === index)
  let deleteshebei = deletelist.shebei.filter(v => v !== null)
  deleteshebei.forEach((v,i)=>{
    wx.cloud.callFunction({
      name:"addnums",
      data:{
      name:v.name,
      nums:v.nums
      }
    })
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
})
},
changeValue(e){
  const index=e.detail.index
  let Tabs=this.data.Tabs
  Tabs.forEach((v,i)=>i===index?v.value=true:v.value=false)
  this.setData({
    Tabs:Tabs
  })
},
changeContent(e){
  const current=e.detail.current
  let tabs = this.data.Tabs
  tabs.forEach((v,i)=>i===current?v.value=true:v.value=false)
  this.setData({
    Tabs: tabs
  })
},
  /**
   * 页面的初始数据
   */
  data: {
   list:[],
    inputShowed: false,
    inputVal: "",
    uhide:0,
    id:"",
    page:0,
    Tabs:[
      {
        id:0,
        title:"未处理",
        value:true
      },
      {
        id:1,
        title:"待归还",
        value:false
      },
      {
        id:2,
        title:"全部",
        value:false
      },
    ],
    isnone:1
  },
  
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection('shebei').orderBy('createTime', 'desc').get().then(res => {
      var data = res.data;
        this.setData({
        list: data,
      })
    }) 
  },
  onShow(){
    const db = wx.cloud.database();
    db.collection('shebei').orderBy('createTime', 'desc').get().then(res => {
      var data = res.data;
      this.setData({
        list: data,
      })
    }) 
  },
  onPullDownRefresh(){
    const db = wx.cloud.database();
    db.collection('shebei').orderBy('createTime', 'desc').get().then(res => {
      var data = res.data;
      this.setData({
        list: data,
      })
      wx.stopPullDownRefresh()
    }) 
  },
  onReachBottom(){
    const db = wx.cloud.database();
    var page= this.data.page + 20
    db.collection('shebei').skip(page).orderBy('createTime', 'desc').get().then(res => {
      var new_data = res.data;
      var old_data = this.data.list
      this.setData({
        list: old_data.concat(new_data),
        page
      })
    }) 
  },
//切换隐藏和显示
  toggleBtn: function (e) {
    //var btnVal = that.data.list._id;
    var that=this;
    var itemId = e.currentTarget.dataset.index
    //if (itemId == btnVal)
    this.setData({
      id:itemId 
    })
  },
})