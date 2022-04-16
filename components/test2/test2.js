// components/test2/test2.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      
  },

  /**
   * 组件的初始数据
   */
  data: {
    name:[
      '请选择','摄影棚一教309', '临建棚101苹果机房', '临建棚104演播厅', '临建棚203虚拟演播厅', '临建棚录影棚204', '临建棚录影棚205', '临建棚录影棚206', '临建棚录影棚207', '临建棚录影棚208', '临建棚录影棚209', '临建棚102设备管理室', '临建棚103播控室', '临建棚105灯光实验室', '临建棚201影视后期制作实验室', '临建棚202影视调色实验室',
    ],
    index: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
   Changeshiyanshiname:function(e){
     var page = this
       this.setData({
       index: e.detail.value
     })
     var name = this.data.name[this.data.index];
     var obj = {};
     obj.name = name;
    
     console.log(obj)
     this.triggerEvent('change', obj, {})
   }
  }
})
