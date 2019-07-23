# 微信小程序--小猿杂谈

### 项目说明：

微信小程序：实现一个校园交流分享互助平台

前端目录结构：

* component——存放项目可复用的组件
* pages——存放项目页面相关文件
* images——存放项目图片
* models——存放项目封装的模型
* utils——存放util文件

java后端目录结构：

* 

## 扫码体验

![img](https://github.com/xiaoape/images/blob/master/xiaoyuan-zatan/gh_a0deb71f3d50_430.jpg?raw=true)

### 项目截图:



算了图好大,懒得贴了



### 开发环境

原生微信小程序api+java



### 项目分工

成员及分工分别如下：

​    刘鹏: 负责产品设计和前端开发

​    康金涌:负责小程序java后端开发及运维

###java后端接口文档

**1.获取最新一期** 

**URL**:

GET      **/**classic**/**latest

**Response** *200*:

**{**

​        **"content":** "人生不能像做菜，把所有的料准备好才下锅"**,**

​        **"fav_nums":** **0,**

​        **"id":** **1,**

​        **"image":** "http://127.0.0.1:5000/images/movie.7.png"**,**

​        **"index":** **7,**

​        **"like_status":** **0,**

​        **"pubdate":** "2018-06-22"**,**

​        **"title":** "李安<<饮食男女>>"**,**

​        **"type":** **100**

**}**

**Response_description**:

- content：期刊内容
- fav_nums: 点赞次数
- image: 图片
- index: 期号
- like_status: 是否点赞
- pubdate: 发布日期
- title: 期刊题目
- type: 期刊类型,这里的类型分为:100 电影 200 音乐      300 句子
- id: 期刊在数据中序号，供点赞使用，返回期刊的详细信息

 

 

**2.获取当前一期的下一期** 

**URL**:

GET      **/**classic**/<**int**:**id**>/**next

**Parameters**:

- id：序号,必填,必须是正整数

**Response** *200*:

**{**

​        **"content":** "这个夏天又是一个毕业季"**,**

​        **"fav_nums":** **0,**

​        **"id":** **2,**

​        **"image":** "http://bl.yushu.im/images/sentence.2.png"**,**

​        **"index":** **2,**

​        **"like_status":** **0,**

​        **"pubdate":** "2018-06-22"**,**

​        **"title":** "未名"**,**

​        **"type":** **300**

**}**



**3.获取当前一期的上一期** 

**URL**:

GET     **/**classic**/<**int**:**id**>/**previous

**Parameters**:

- id: 序号,必填,必须是正整数

**Response** *200*

**{**

​        "content"**:** "你陪我步入蝉夏 越过城市喧嚣"**,**

​        "fav_nums"**:** **0,**

​        "image"**:** "http://bl.yushu.im/images/music.1.png"**,**

​        "id"**:** **3,**

​        "index"**:** **1,**

​        "like_status"**:** **0,**

​        "pubdate"**:** "2018-06-22"**,**

​        "title"**:** "纸短情长"**,**

​        "type"**:** **200**

**}**

 

 

**4.获取某一期详细信息** 

**URL**:

GET      **/**classic**/<**int**:**id**>**

**Parameters**:

- id：id号,必填,必须是正整数

**Response** *200*:

**{**

​        **"content":** "这个夏天又是一个毕业季"**,**

​        **"fav_nums":** **0,**

​        **"id":** **2,**

​        **"image":** "http://bl.yushu.im/images/sentence.2.png"**,**

​        **"index":** **2,**

​        **"like_status":** **0,**

​        **"pubdate":** "2018-06-22"**,**

​        **"title":** "未名"**,**

​        **"type":** **300**

**}**

 

**5.获取点赞信息** 

**URL**:

GET     classic**/<**int**:**id**>/**favor

**Parameters**:

- id: 必填, 点赞对象的id号

**Response** *200*

**{**

​        "fav_nums"**:** **1,**

​        "id"**:** **1,**

​        "like_status"**:** **1**

**}**

 

 

**6.进行点赞** 

**URL**:

POST      **/**like

**Parameters**:

- art_id: 点赞对象,例如你想对电影进行点赞，那这个参数就是电影的id号

**way:**

 **application/json**

**Response Status** *201*:

**{**

​        **"error_code":** **0,**

​        **"msg":** "ok"**,**

​        **"request":** "POST  /like/add"

**}**

 

 

**7.取消点赞** 

**URL**:

POST     **/**like**/**cancel

**Parameters**:

- art_id: 点赞对象id

**way:**

​       **application/json**

**Response Status** *201*:

**{**

​        **"error_code":** **0,**

​        **"msg":** "ok"**,**

​        **"request":** "POST  /like/cancel"

**}**

 

**8.获取某一发布详细信息** 

**URL**:

GET      **/**book**/<**int**:**id**>**

**Parameters**:

- id：id号,必填,必须是正整数

**Response** *200*:

**{**

- **image: "**[**https://dowalker.cn/bookMate/images/task/1.jpg**
- **pinglun:** 

**[**

- - **"我这里有",**
- - **"后街附近有",**
  - **"一觉标识",**
  - **"清除一下上面空的评论吧",**
  - **"测试一波"**

**],**

- **biaoti: "【求租】本人想租一房一厅",**
- **id: 1,**
- **content: "学校附近",**
- **pubdate: 1555603200000**

**}**

 

**9.对某一发布评论** 

**URL**:

POST      book/{id}/comment

**Parameters**:

- id：id号,必填,必须是正整数
- comment：评论内容

**way:**

​       **x-www-form-urlencoded**

**Response** *200*:

  成功：评论成功

  失败：评论失败

 

**10.添加发布** 

**URL**:

POST      books/add

**Parameters**:

- biaoti：id号,必填,必须是正整数
- content：内容
- file：图片对象

**way**

​       **multipart/form-data**

**Response** *200*:

​       Msg：“失败原因或者成功”

 

**11.查看所有发布** 

**URL**:

POST      books

**Parameters**:

- offset：开始序号，从这个序号开始往后显示十个 

**way:**

application/json

**Response** *200*:

[

​    {

​        "image": "https://dowalker.cn/bookMate/images/task/1.jpg",

​        "pinglun": [],

​        "biaoti": "【求租】本人想租一房一厅",

​        "id": 6,

​        "content": "学校附近",

​        "pubdate": 1555603200000

​    },

​    {

​        "image": "https://dowalker.cn/bookMate/images/task/1.jpg",

​        "pinglun": [],

​        "biaoti": "【求租】本人想租一房一厅",

​        "id": 7,

​        "content": "学校附近",

​        "pubdate": 1555603200000

​    }

...

]

##### [参考资料]



* [微信开发者文档 ]:    <https://developers.weixin.qq.com/miniprogram/dev/index.html?t=19043011>
