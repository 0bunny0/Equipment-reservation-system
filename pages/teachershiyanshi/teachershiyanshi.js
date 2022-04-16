// pages/teachershiyanshi/teachershiyanshi.js
Page({
  agree(e) {
    const index = e.currentTarget.dataset.index
    const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: "changevalue",
      data: {
        name: 'shiyanshi',
        value: 1,
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
      [temstring]: 1
    })
  },
  disagree(e) {
    const index = e.currentTarget.dataset.index
    const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: "changevalue",
      data: {
        name: 'shiyanshi',
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
  },
  finish(e) {
    const index = e.currentTarget.dataset.index
    const db = wx.cloud.database()
    wx.cloud.callFunction({
      name: "changevalue",
      data: {
        name: 'shiyanshi',
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
    list: [],
    inputShowed: false,
    inputVal: "",
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
  },
  
  getjok(){
    const db = wx.cloud.database();
    db.collection('shiyanshi').orderBy('createTime', 'desc').get().then(res => {
      var data = res.data;
      this.setData({
        list: data,
      })
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getjok();
  },
  onShow(){
    this.getjok();
  },
  onPullDownRefresh() {
    this.getjok();
  },
  onReachBottom(){
    const db = wx.cloud.database();
    let page = this.data.page + 20
    db.collection('shiyanshi').skip(page).orderBy('createTime', 'desc').get().then(res => {
      let old_data = this.data.list
      let new_data= res.data 
      this.setData({
        list: old_data.concat(new_data),
        page
      })
    })
  },
  toggleBtn: function (e) {
    //var btnVal = that.data.list._id;
    var that = this;
    var itemId = e.currentTarget.dataset.index
    //if (itemId == btnVal)
    this.setData({
      id: itemId
    })
  },
})