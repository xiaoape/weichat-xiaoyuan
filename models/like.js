import {
  HTTP
} from '../utils/http.js'
class LikeModel extends HTTP {
  constructor() {
    super()
  }
  //得到like组件在Classic页面的状态,这里的type虽然这里显示的是灰色，但是不加是会报错的。
  getClassicLikeStatus(cid, type, success) {
    var params = {
      // url: 'classic/' + type + '/' + cid + '/favor',
      url:'classic/'+cid+'/favor',
      success: success
    }
    this.request(params)
  }

  getBookLikeStatus(bid, type, success) {
    var params = {
      // url: 'book/' + type + '/' + bid + '/favor',
      url: 'book/'  + bid + '/favor',
      success: success
    }
    this.request(params)
  }

  like(like_or_cancel, art_id) {
    let url = like_or_cancel === 'cancel' ? 'like/cancel' : 'like'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: art_id,
      },
      success: (data) => {
        console.log(data)
      }
    })
  }
}

export {
  LikeModel
}