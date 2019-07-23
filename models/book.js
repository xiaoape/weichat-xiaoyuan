import {HTTP} from '../utils/http.js'
class BookModel extends HTTP {
  constructor() {
    super()
  }

//请求具体是哪一个任务
  getYan(bid,success){
    let params = {
      url:'book/'+bid,
      success:success
    }
    this.request(params)
  }
//请求具体是哪一个文章详情
  getDetail(bid, success){
    let params = {
      url:'classic/'+ bid,
      success:success
    }
    this.request(params)
  }
//获取具体的点赞信息
  getLikeStatus(bid,success){
    let params = {
      url: '/book/' + bid + '/favor',
      success:success
    }
    this.request(params)
  }
//请求用户发布的所有杂谈
  getBooks(success){
    let params = {
      url: 'books',
      method: 'POST',
      data: {
        offset: 0,
      },
      success:success
    }
    this.request(params)
  }
}

export { BookModel}