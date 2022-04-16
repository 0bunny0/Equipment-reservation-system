// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Tabs:{
      type:Array,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changevalue(e){
      const index=e.currentTarget.dataset.index
      this.triggerEvent('changevalue',{index})
      this.setData({
        current: e.currentTarget.dataset.index
      })
    },
    changecontent(e){
      const current = e.detail.current
      this.triggerEvent('changecontent', { current })
    },
  }
})
