
import {
  classicBehavior
} from '../classic-beh.js'
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],

  properties: {
    img: String,
    xiangqing:Object,
    zhaiyao:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getBook: function () {
      //将index作为参数传递到内容详情页
        this.triggerEvent('booktap', {
          bid:this.properties.xiangqing.index
        }, {})
      wx.navigateTo({
        url: '../../pages/book-detail/detail?bid='+this.properties.xiangqing.index
      });
    }
  }
})