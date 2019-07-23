// components/panel/panel.js
import {formatTime} from '../../utils/util.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shixiang:Object,
    message:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    time:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMessage: function () {
      this.triggerEvent('booktap', {
        bid:this.properties.shixiang.id
      }, {})
    wx.navigateTo({
      url: '../../pages/liuyan/liuyan?bid='+this.properties.shixiang.id
    });
    },
    getTime:function(){
      return formatTime(this.properties.shixiang.pubdate)
    },
  },
  ready:function(){
    let time = this.getTime();
    this.setData({
      time:time
    })
  }
})
