import {
  BookModel
} from '../../models/book.js'
let bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue: '',
    books: {}
  },
  formSubmit: function (e) {
    var that = this
    var comment = e.detail.value.comment;
    console.log(e.detail.value.comment);
    if (e.detail.value.comment == '') {
      wx.showToast({
        title: '留言不能为空',
        icon: 'fail',
        duration: 1000
      })
    } else{
      wx.request({
        url: 'https://dowalker.cn/bookMate/book/'+that.data.books.id+'/comment',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          id: that.data.books.id, 
          comment:comment,
        },
        success: function(res) {
          console.log(res)
          if (res.statusCode != 200) {
            wx.showToast({ //这里提示失败原因
              title: res.data.message,
              icon: 'loading',
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '留言提交成功', //这里成功
              icon: 'success',
              duration: 1000
            })
          }
        },
        fail: function(res) {
          console.log(fail)
          wx.showToast({
            title: '请求失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
    this.getPing();
    this.setData({
      Ivalue:''
    })
  },
  //再次请求评论数据
  getPing:function(){
    bookModel.getYan(this.data.books.id,(data)=>{
      this.setData({
          books:data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bid = options.bid
    bookModel.getYan(bid, (data) => {
      this.setData({
        books: data
      })
    })
  },


})