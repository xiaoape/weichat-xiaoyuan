//logs.js

var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: null,
    hasUserInfo: true,
    classics: [],

  },
  onLoad:function(){

  },
    /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    this.hasGottenUserInfo()
  },

  hasGottenUserInfo: function() {
    // 获取用户的当前设置，查看是否授权
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (data) => {
              this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },

  onGetUserInfo: function(event) {
    let userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },

  MyFabu:function(){
    wx.navigateTo({
      url:'../myfabu/myfabu'
    })
  },
  AboutUs:function(){
    wx.navigateTo({
      url:'../about/about'
    })
  },
  sourceBook:function(){
    wx.navigateTo({
      url:'../tougao/tougao'
    })
  },
  beiwang:function(){
    wx.navigateTo({
      url:'../beiwang/beiwang'
    })
  },
  fankui:function(){
    wx.navigateTo({
      url:'../fankui/fankui'
    })
  },
})