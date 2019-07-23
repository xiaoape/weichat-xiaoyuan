import {ClassicModel} from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    classic:null,
    latest:true,
    first:false,
    like:false,
    count:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    classicModel.getLatest((data)=>{
      this._getLikeStatus(data.id, data.type)
      this.setData({
        classic:data
      })
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //获取上一期的数据（可能时从缓存中获取也可能时从服务器中）
  onPrevious:function(event){
    let index = this.data.classic.index
    classicModel.getPrevious(index, (data)=>{
      if(data){
        this._getLikeStatus(data.id, data.type)
        this.setData({
          classic:data,
          latest: classicModel.isLatest(data.index),//返回ture或false
          first: classicModel.isFirst(data.index)//返回true或false
        })
      }
      else{
        console.log('not more classic')
      }
    })
  },
  //获取下一期的数据（可能时从缓存中获取也可能是从服务器中）
  onNext:function(event){
    let index = this.data.classic.index
    classicModel.getNext(index, (data)=>{
      if (data) {
        this._getLikeStatus(data.id, data.type)
        this.setData({
          classic: data,
          latest: classicModel.isLatest(data.index),
          first: classicModel.isFirst(data.index)
        })
      }
      else {
        console.log('not more classic')
      }
    })
  },  //将用户修正后的数据返回给服务器
  onLike:function(event){
    let like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.classic.id, this.data.classic.type)
  },

  //当页面在切换时，like组件的状态也需要改变，这个就是相应的函数实现
  _getLikeStatus:function(cid, type){
    likeModel.getClassicLikeStatus(cid, type, (data)=>{
      this.setData({
        like:data.like_status,
        count:data.fav_nums
      })
    })
  },
})
