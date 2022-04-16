// pages/teacherlogin/techerlogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     password:123456 
  },

  onSubmitevent:function(e){
     console.log(e)
     var password = this.data.password
     var inputpassword = e.detail.value.inputpassword
    if (password == inputpassword){
      
      wx.navigateTo({
        url: '../teacherindex/teacherindex'
      })
    }else{
      wx.showToast({
        title: '密码错误',
        icon: 'none',
        duration: 1000
      })
    }
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