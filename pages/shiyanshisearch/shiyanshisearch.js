const db = wx.cloud.database()
const _ = db.command
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        shiyanshilist:[]
    },
    timeout:0,
    inputTyping: function (e) {
        var value=e.detail.value.trim()
        if(value!==""){
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(() => {
                    this.getshiyanshilist(value)
                }, 1000);
        }
        else if(value===""){
                clearTimeout(this.timeout);
                this.setData({
                    shiyanshilist:[]
                })
        }
    },
    getshiyanshilist(value){
        db.collection('shiyanshi').orderBy('createTime', 'desc').where(_.or([
            {
              shiyanshi: db.RegExp({ regexp: value, options: 'i' })
            },
            {
              banji: db.RegExp({ regexp: value, options: 'i' })
            },
            {
            teacher: db.RegExp({ regexp: value, options: 'i' })
            }
        ])).get()
        .then(res => {
          this.setData({
              shiyanshilist:res.data,
              inputVal: value
          });
          if(this.data.shiyanshilist.length===0){
              wx.showToast({
                  title: '暂时没有数据',
                  icon: 'none',
                  duration: 2000,
                  mask: true,
              });
                
          }
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
      var temstring = 'shiyanshilist[' + index + ']' + '.' + 'value'
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
      var temstring = 'shiyanshilist[' + index + ']' + '.' + 'value'
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
      var temstring = 'shiyanshilist[' + index + ']' + '.' + 'value'
    this.setData({
        [temstring]: 3
    })
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
});