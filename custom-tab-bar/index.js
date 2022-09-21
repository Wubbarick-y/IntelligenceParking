// custom-tab-bar/index.js
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
    active:0,
    list:[{
      pagePath: "/pages/home/home",

    },
    {
      pagePath: "/pages/orders/orders",
    },
    {
      pagePath: "/pages/find/find",
      
    },
    {
    pagePath: "/pages/my/my",
  }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event){
      let _this = this
      
      //tabbar转跳
      wx.switchTab({
        url:_this.data.list[event.detail].pagePath
      });
    }
    

  }
})
