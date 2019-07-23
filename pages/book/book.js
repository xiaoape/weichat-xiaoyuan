//原来的index.js
const app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0,
    offset: 0,
    time:'',
    chenggong:false,
    loading:false,
  },
  onShow: function () {
    //设置锁
    wx.request({
      url: 'https://dowalker.cn/bookMate/books',
      method: 'POST',
      data: {
        offset: 0
      },
      success: (data) => {
        this.setData({
          feed: data.data,
          feed_length: data.data.length,
        })
        console.log(data)
      }
    })

  },
  onHide:function(){
    this.data.offset = 0;
  },
  lower: function (e) {
    console.log(this.data.offset);
    if(this.data.offset>30){
      wx.showToast({
        title: '没有更多数据了',
        icon: 'success',
        duration: 3000
      })
      return;
    }
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      that.nextLoad();
    }, 1000);
  },
//滑动再次加载
  nextLoad: function () {
    if(this.data.loading){
      return
    }
    //设置锁
    this.data.loading = true;
    let zancun = [].concat(this.data.feed);
    var that = this;
    let offset = that.getOffset();
    // console.log(this.data.offset) //0
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    wx.request({
      url: 'https://dowalker.cn/bookMate/books',
      method: 'POST',
      data: {
        offset: offset
      },
      success: (data) => {
        //箭头函数没有this
        console.log(this.data.feed);//onload获取的那十个数据
        // console.log(data);
        zancun = zancun.concat(data.data);
        console.log(zancun);
        //要保证setTimeout函数一定是在this.setData之后执行的话，仅仅这样写显然是不行的，你可以使用promise去解决问题，但是这里我全局都没有使用promise的话，这里就不用promise了
        this.setData({
          feed: zancun,
          feed_length:zancun.length,
          chenggong:true,
          loading:false
        })
        if(this.data.chenggong){
        setTimeout(function () {
          wx.showToast({
            title: '加载成功',
            icon: 'success',
            duration: 500
          })
        }, 3000)}else {
          wx.showToast({
            title: '加载失败',
            icon: 'fail',
            duration: 500
          })
        }
      }
    })   
  },
  getOffset: function () {
    this.data.offset+=10
    return this.data.offset
  },
  fabu:function(){
    wx.navigateTo({
      url:'../fabu/fabu',
    });
  },

})

//修改的的index.js
// import {
//   BookModel
// } from '../../models/book.js'
// let bookModel = new BookModel()

// const app = getApp()
// Page({
//   data: {
//     feed: [],
//     feed_length: 0,
//     offset: 0,
//     time: ''
//   },
//   onLoad: function () {
//     bookModel.getBooks((data) => {
//       this.setData({
//         feed: data.data,
//         feed_length: data.data.length
//       })
//     })
//   },
//   lower: function (e) {
//     wx.showNavigationBarLoading();
//     var that = this;
//     setTimeout(function () {
//       wx.hideNavigationBarLoading();
//       that.nextLoad();
//     }, 1000);
//   },
//   //滑动再次加载
//   nextLoad: function () {
//     let zancun = [].concat(this.data.feed);
//     var that = this;
//     let offset = that.getOffset();
//     // console.log(this.data.offset) //0
//     wx.showToast({
//       title: '加载中',
//       icon: 'loading',
//       duration: 500
//     })
//     wx.request({
//       url: 'https://dowalker.cn/bookMate/books',
//       method: 'POST',
//       data: {
//         offset: offset
//       },
//       success: (data) => {
//         //箭头函数没有this
//         console.log(this.data.feed); //onload获取的那十个数据
//         // console.log(data);
//         zancun = zancun.concat(data.data);
//         console.log(zancun);
//         this.setData({
//           feed: zancun,
//           feed_length: zancun.length
//         })
//         console.log(this.data.feed); //undefined,即使这里改成that也是undefined，不知道为什么这里就是undefined
//       }
//     })
//     console.log(this.data.feed);
//     setTimeout(function () {
//       wx.showToast({
//         title: '加载成功',
//         icon: 'success',
//         duration: 500
//       })
//     }, 3000)
//   },
//   getOffset: function () {
//     return this.data.offset + 10;
//   },
//   fabu: function () {
//     wx.navigateTo({
//       url: '../fabu/fabu',
//     });
//   },

// })