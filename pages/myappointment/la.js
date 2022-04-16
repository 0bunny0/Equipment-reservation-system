// pages/my appointment/la.js
const db = wx.cloud.database()
const _ = db.command

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shiyanshilist:[],
    shebeilist: [],
    Tabs:[
      {
        id:0,
        title:"进行中",
        value:true
      },
      {
        id:1,
        title:"历史预约",
        value:false
      },
    ],
    isnone:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStorage()  
    if (this.data.shebeilist.length !== 0) {
      this.getnewsheibeilist()
    }
    if (this.data.shiyanshilist.length !== 0) {
      this.getnewshiyanshilist()
    }
    if (this.data.shebeilist.length === 0 && this.data.shiyanshilist.length === 0 ) {
      this.setData({
        isnone: 0
      })
    }
  },
  onPullDownRefresh: function () {
    this.getnewsheibeilist()
    this.getnewshiyanshilist()
  },
  getStorage(){
    let shebeilist=wx.getStorageSync("appointment")||[];
    let shiyanshilist=wx.getStorageSync("shiyanshi")||[]; 
    this.setData({
      shebeilist,
      shiyanshilist
    })
  },
  getnewshiyanshilist(){
    let shebeilist=wx.getStorageSync("shiyanshi")||[]
    let newlist=shebeilist.map((v)=>{return {id:v._id,value:v.value}})
    newlist.forEach((v)=>{
      db.collection('shiyanshi').where({
        _id:v.id,
        value:_.gt(0)
      }).get({
        success:res=>{
          shebeilist.forEach((v,i)=>{
            if(v._id===res.data[0]._id){
              v.value=res.data[0].value
            }
            this.setData({
              shiyanshilist:shebeilist
            })
          })
          wx.setStorageSync("shiyanshi", shebeilist);
          wx.stopPullDownRefresh()
        },
        fail:err=>{
          console.log(err)
        }
      })
    })
  },
  getnewsheibeilist(){
    let shebeilist=wx.getStorageSync("appointment")||[]
    let newlist=shebeilist.map((v)=>{return {id:v._id,value:v.value}})
    newlist.forEach((v)=>{
      db.collection('shebei').where({
        _id:v.id,
        value:_.gt(0)
      }).get({
        success:res=>{
          shebeilist.forEach((v,i)=>{
            if(v._id===res.data[0]._id){
              v.value=res.data[0].value
            }
            this.setData({
              shebeilist
            })
          })
          wx.setStorageSync("appointment", shebeilist);
          wx.stopPullDownRefresh()
        },
        fail:err=>{
          console.log(err)
        }
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
  toggleBtn: function (e) {
    //var btnVal = that.data.list._id;
    var that = this;
    var itemId = e.currentTarget.dataset.index
    //if (itemId == btnVal)
    this.setData({
      id: itemId
    })
  },
  toggleBtnshiyanshi(e) {
    var that = this;
    var itemId = e.currentTarget.dataset.index
    //if (itemId == btnVal)
    this.setData({
      shiyanshiid: itemId
    })
  },
})