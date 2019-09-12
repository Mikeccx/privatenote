// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "text": 'cx',
    "note": []
  },
  change: function () {
    this.setData({
      text: 'ppp'
    })
  },
  //跳转到写日志
  toaddnote: function () {
     wx.navigateTo({
       url: '../writenote/writenote',
       success: function(res) {},
       fail: function(res) {},
       complete: function(res) {},
     })
  },
  //跳转到页面详情
  tonotespc: function (e) {
    console.log(e.currentTarget.dataset.idx)
    wx.navigateTo({
      url: '../writenote/writenote?id='+ e.currentTarget.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.openid);
    const db = wx.cloud.database();
    var that = this;
    db.collection('note').get({
      success: function (res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        that.setData({
          note:res.data
        })
      }
    })
    console.log(this.note)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  inputedit: function (e) {
    // 1. input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    //data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象，有obj和item属性，可以通过这两个实现双向数据绑定，通过更改这两个值，对不同name的变量赋值
    let value = e.detail.value;
    this.setData({
      text: value
    });
  }
})