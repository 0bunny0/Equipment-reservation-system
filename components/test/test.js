// components/test1/test1.js
Component({
  /**
   * 组件的属性列表
   */
  
  properties: {
    pickerIndex:{
      type: Number,
      value: 'underfined'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    name: [
      "请选择", '摄像机160', '单反700D', '单反三脚架', '单反电池', '摄像机160电池', '摄像机充电器', '小型摇臂', 'CamlightLED灯', 'Camlight黑色聚光灯', '蓝色聚光灯', '稳定器', '摄像机160三脚架', '富莱仕LED灯', '松下GH5', '单反1000D', 'CamlightLED灯电源线', 'Camlight黑色聚光灯电源线', '公牛排插',
    ],
    number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    index: 0,
    anotherindex: 0,
  },
  onSubmitevent: function (event) {
    console.log(event)
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    onSubmitevent: function (event) {
      console.log(event)
    },
    bindchange: function (e) {
      var page = this
      console.log(e)
      this.setData({
        index: e.detail.value
      })
      var name=this.data.name
      var index= this.data.index
      var obj= {};
      obj.name = name[index];
      obj.pickerIndex = page.data.pickerIndex;
      console.log(name[index] )
      this.triggerEvent('change',obj,{})

    },
    bindPickerChangetwo: function (e) {
      console.log(e.detail.value)
      this.setData({
        anotherindex: e.detail.value
      })


    },
  
    
   },

   

})
