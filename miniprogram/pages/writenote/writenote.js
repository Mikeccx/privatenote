// miniprogram/pages/writenote/writenote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    id: '',
    notespc: ''
  },
  // onLoad: function(options) {
  //   if (app.globalData.openid) {
  //     this.setData({
  //       openid: app.globalData.openid
  //     })
  //   }
  // },
  //写日志
  onAdd: function(e) {
    const db = wx.cloud.database();
    let now = new Date();
    let time = now.toLocaleString();
    if (e.detail.value !== '') {
      return;
    } else {
      db.collection('note').add({
        data: {
          notespc: e.detail.value,
          time: time
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            counterId: res._id
          })
          wx.showToast({
            title: '已保存',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '保存'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }
  },
  send: function(e) {
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    })
    console.log(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const db = wx.cloud.database();
    console.log('options')
    console.log(Object.keys(options).length)
    let that = this
    if (Object.keys(options).length != 0) {
      console.log('coming')
      db.collection('note').doc(options.id).get({
        success: function (res) {
          // res.data 包含该记录的数据
          that.setData({
            notespc: res.data.notespc
          })
          console.log(res.data.notespc)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})