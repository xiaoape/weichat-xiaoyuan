import { HTTP } from '../utils/http.js'

class ClassicModel extends HTTP{
  prefix = 'classic'

  constructor() {
    super()
  }
//获取最新一期
  getLatest(sCallback){
    this.request({
      url:'classic/latest',
      success:(data)=>{
          // 如果不用箭头函数，this将指代不正确
          let key = this._fullKey(data.index)
          wx.setStorageSync(key, data)
          //这里存的是一个索引index，这里的key就是classic-latest-8，value就是8,不知道为什么要去存这个？
          this._setLatestIndex(data.index)
          sCallback(data)
        }
    })
  }

  getPrevious(index, sCallback){
    this._getClassic(index,'previous',sCallback)
  }

  getNext(index, sCallback) {
    this._getClassic(index, 'next', sCallback)
  }

  getById(cid, type, success){
    let params = {
      url:'classic/' + cid,
      success:success
    }
    this.request(params)
  }
//如果是最新一期
  isLatest(index){
    let key = this._fullKey('latest-' + index)
    let latestEpsoide = wx.getStorageSync(key)
    if(latestEpsoide){
      if (index == latestEpsoide){
        return true
      }
    }
    else return false
  }
//如果是第一期，就返回false，去改变图片的状态，已经使其不去触发新的函数
  isFirst(index){
    if (index==1){
      return true
    }
    else return false
  }
//获取我喜欢的期刊
  // getMyFavor(success){
  //   let params={
  //     url:'classic/favor',
  //     success:success
  //   }
  //   this.request(params)
  // }
  //切换上一期或者下一期
  _getClassic(index, next_or_previous, sCallback){
    let key = next_or_previous == 'next' ? this._fullKey(index + 1):
      this._fullKey(index-1)
      //从缓存中取出数据
    let classic = wx.getStorageSync(key)
    //如果没有数据，就从服务器中重新获取，并写入缓存。有数据就直接从缓存中获取数据
    if (!classic) {
      let params = {
        url: 'classic/' + index + '/' + next_or_previous,
        success:(data)=>{
          let key = this._fullKey(data.index)
          wx.setStorageSync(key, data)
          sCallback(data)
        }
      }
      this.request(params)
    }
    else{
      sCallback(classic)
    }
  }

  /**
   * 在缓存中存放最新一期的期数
   */

   //存储最新一期的index
  _setLatestIndex(index){
    let key = this._fullKey('latest-' + index)
    wx.setStorageSync(key, index)
  }
  //取出最新一期的index
  _getLatestEpsoide(index){
    let key = this._fullKey(index)
    return wx.getStorageSync(key)
  }
//这里就是加了一个前缀classic
  _fullKey(partKey){
    let key = this.prefix + '-' + partKey
    return key
  }
}

export {ClassicModel}