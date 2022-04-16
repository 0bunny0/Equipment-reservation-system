// pages/studentindex/studentindex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item1:{
      functio:"navtoshebei",
      img:"/images/order.png",
      name: "设备预约"
    },
    item2: {
      functio: "navtoshiyanshi",
      img: "/images/order2.png",
      name: "实验室预约"
    },
    item3: {
      functio: "navtomyappointment",
      img: "/images/my.png",
      name: "我的预约"
    },
    item4: {
      functio: "navtotiaokuan",
      img: "/images/manage.png",
      name: "预约须知"
    },
    item5: {
      functio: "navtokebiao",
      img: "/images/changepassword.png",
      name: "实验室课表"
    },
   
  },
  navtoshebei: function () {
    wx.navigateTo({
      url: '../index/index',
     
    })
  },
  navtoshiyanshi: function () {
    wx.navigateTo({
      url: '../shiyanshi/shiyanshi',
       })
  },
  navtotiaokuan: function () {
    wx.navigateTo({
      url: '../tiaokuan/tiaokuan',
    })
  },
  navtokebiao: function () {
    wx.navigateTo({
      url: '../kebiao/kebiao',
    })
  },

  navtomyappointment: function () {
    wx.navigateTo({
      url: '../myappointment/la',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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