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
    mybook:[],
    mytime:[]
  },
  onShow:function(){
    var that = this
    let arr1 = []
    const arrid = wx.getStorageSync('yonghuID')||[]
    console.log(arrid);//一个装有id的数组
    if(arrid.length==0){
      return
    }else{
      for(let i = 0;i<arrid.length;i++){
        wx.request({
          url:'https://dowalker.cn/bookMate/book/'+arrid[i],
          success:(data)=>{
            //每次请求过来的都是一个对象，现在我需要将每个对象都加入到我定义的数组中
            // console.log(arr1);
            arr1.unshift(data);
            that.setData({
              mybook:arr1
            })
          }
        })
        
      }
    
    }
    setTimeout(function(){
      that.getmytime();
    },3000)
    
  },
  getmytime:function(){
    for(let i = 0;i<this.data.mybook.length;i++){
      var arr3 = [];
      arr3.push(this.data.mybook[i].pubdate);
    }
    this.setData({
      mytime:arr3
    })
  }

})