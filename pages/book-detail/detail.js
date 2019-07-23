// pages/book-detail/detail.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'
let classicModel = new ClassicModel()
let bookModel = new BookModel()
const app = getApp()
Page({

      /**
       * 页面的初始数据
       */
      data: {
        book: Object
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        //获取来自index页面传递过来的参数index，并请求数据
        let bid = options.bid
        bookModel.getDetail(bid, (data) => {
          this.setData({
            book: data
          })
        })
      },
    })