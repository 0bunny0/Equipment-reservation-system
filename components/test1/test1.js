// components/test1/test1.js
Component({
  lifetimes: {
    attached: function () {
      const db = wx.cloud.database();
      const that = this;
      const name=this.data.name;  
      const kucun=this.data.kucun;
      db.collection('shebeiliebiao').get().then(res => {
        const Data = res.data;
        that.setData({
          Data: Data
        })
        for (var i = 0; i < Data.length; i++) {
         name.push(Data[i].name)
          kucun.push(Data[i].number)
        }
        that.setData({
          name:name,
          kucun:kucun
        })
      })
    },
  },
  /**
   * 组件的属性列表
   */
  
  properties: {
    pickerIndex:{
      type: Number,
      value: 'underfined'
    }, 

  },

  /**
   * 组件的初始数据
   */
  data: {
    name: [],
    kucun:[],
    number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    index: 0,
    anotherindex: 0,
  },

  

  

  /**
   * 组件的方法列表
   */
  methods: {


    ChangeName: function (e) {
      var page = this
  
      this.setData({
        index: e.detail.value
      })
      var name = this.data.name[this.data.index];
      var nums = this.data.number[this.data.anotherindex];
      var obj= {};
      obj.name = name;
      obj.nums = nums;
      obj.pickerIndex = page.data.pickerIndex;
      this.triggerEvent('change',obj,{})

    },
    ChangeNums: function (e) {

     var page = this
      this.setData({
        anotherindex: e.detail.value
      })

      var name = this.data.name[this.data.index];
      var nums = this.data.number[this.data.anotherindex];
      var obj = {};
      obj.name = name;
      obj.nums = nums;
      obj.pickerIndex = page.data.pickerIndex;
      this.triggerEvent('change', obj, {})


      


    },
  
    onShow(e){
      
    },


   },
})
