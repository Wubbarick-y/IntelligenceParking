// pages/info/change/changeMyinfo/changeMyinfo.js
import Toast from '@vant/weapp/toast/toast'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    sexColumns:["男",'女'],
    sexShow:false,
    cache1:null,
    cache2:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    that.setData({
      userInfo:app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onConfirm(event){
    let that = this
    const { picker, value, index } = event.detail;
    that.setData({
      'userInfo.gender': value,
      'sexShow':false
    })
  },
  onNicknameChange(event){
    let that = this
    that.setData({
      cache1:event.detail
    })
    console.log(that.data.cache1)
  },
  onClick(){
    let that = this
    that.setData({
      'sexShow':true
    })
  },
  onCancel() {
    let that = this
    that.setData({
      'sexShow':false
    })
  },
  onPhoneNumberChange(event){
    let that = this
    that.setData({
      cache2:event.detail
    })
    console.log(that.data.cache2)
  },
  OnSubmit(){
    let that = this
    that.setData({
      'userInfo.nickname':that.data.cache1,
      'userInfo.phoneNumber':that.data.cache2
    })
    wx.request({
      url:'http://localhost/users',
      method:'post',
      data:{
        user:this.data.userInfo
      },
      success(res){
        console.log(res)
        Toast(res.data.msg)
        wx.navigateBack()
      }
    })
  }
})