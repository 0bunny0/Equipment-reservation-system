const db = wx.cloud.database()
const _ = db.command
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        shebeilist:[]
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
                    shebeilist:[]
                })
        }
    },
    getshiyanshilist(value){
        db.collection('shebei').orderBy('createTime', 'desc').where(_.or([
            {
              shebei:_.elemMatch({
                name: db.RegExp({ regexp: value, options: 'i' })
              })
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
            shebeilist:res.data,
              inputVal: value
          });
          if(this.data.shebeilist.length===0){
              wx.showToast({
                  title: '暂时没有数据',
                  icon: 'none',
                  duration: 2000,
                  mask: true,
              });
                
          }
        })
    },
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
    var temstring = 'shebeilist['+index+']'+'.'+'value'
    this.setData({
        [temstring]:1
    })
      console.log(temstring)
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
      var temstring = 'shebeilist[' + index + ']' + '.' + 'value'
    this.setData({
        [temstring]: 2
    })
      let deletelist = this.data.shebeilist.find((v,i)=>i===index)
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
      var temstring = 'shebeilist[' + index + ']' + '.' + 'value'
    this.setData({
        [temstring]: 3
    })
      let deletelist = this.data.shebeilist.find((v, i) => i === index)
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
    toggleBtn: function (e) {
        //var btnVal = that.data.list._id;
        var that = this;
        var itemId = e.currentTarget.dataset.index
        //if (itemId == btnVal)
        this.setData({
          id: itemId
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