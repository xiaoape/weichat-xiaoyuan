var adds = {}
const app = getApp()
Page({
  data: {
    img_arr: [],
    formdata: '',
  },
  done:function(e){
    console.log(e.detail.value)
    adds.biaoti =e.detail.value
  },
  formSubmit: function (e) {
    adds = e.detail.value;
    console.log(e.detail.value);//{biaoti}: "阀手动阀", content: "f飞洒地方"}
    this.upload()
    this.setData({
      program_id:'',
      formdata:'',
      img_arr:[]
    })
  },

  upload: function () {
    var that = this
    // for (var i = 0; i < this.data.img_arr.length; i++) {
    wx.uploadFile({
      url: 'https://dowalker.cn/bookMate/books/add',
      filePath: that.data.img_arr[0],
      name: 'file',
      formData: {
        biaoti:adds.biaoti,
        content:adds.content
      },
      success:  (res)=> {
        console.log(res.data)
        if (res) {
          wx.showToast({
            title: '已提交发布！',
            duration: 3000
          });
          var yong = wx.getStorageSync('yonghuID') || []
          //将拿到的id存储到页面,每次我重新编译的话，app.globalData都是空的
          yong.unshift(res.data)
          wx.setStorageSync('yonghuID', yong);
        }
      }
    })
    // }
    this.setData({
      formdata: ''
    })
    //
  },
  //预览选择的图片
  upimg: function () {
    var that = this;
    if (this.data.img_arr.length < 1) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传三张图片',
        icon: 'loading',
        duration: 3000
      });
    }
  },
  changeKey(partKey){
    let key =  'yonghu-' + partKey
    return key
  }
})