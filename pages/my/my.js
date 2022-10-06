// pages/my/my.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    show:false,
    code: null,
    iv: null,
    encryptedData: null,
    sessionId:null,
    openid:null,
    token:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    wx.login({
      success(res){
        console.log(res.code)
        wx.request({
          url:"http://localhost/users/session",
          data:{
            code:res.code
          },
          method:"POST",
          success(res){
            console.log(res)
            that.setData({
              sessionId:res.data.data.SessionId,
              openid:res.data.data.openid
            })
          }
          
        })
      }
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
    this.getTabBar().setData({
      active:3
    })
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
  wxLogin(){
    var that = this
    wx.getUserProfile({
      desc: '完整信息',
      success(res){
        that.setData({
          vi:res.iv,
          encryptedData:res.encryptedData
        })
        wx.request({
          url:"http://localhost/users/authLogin",
          method:"POST",
          data:{
            iv:that.data.vi,
            encryptedData:that.data.encryptedData,
            sessionId:that.data.sessionId,
            openid:that.data.openid
          },
          success(res){
            that.setData({
              token:res.data.data.token
              
            }
            )
            wx.request({
              url: 'http://localhost/users/userinfo',
              method:'GET',
              header:{
                Authorization:that.data.token
              },
              data:{
                refresh:true
              },
              success(res){
                var user = res.data.data
                app.globalData.userInfo = user
                that.setData({
                  userInfo: user,
                  show:true,
                })
                console.log(user)
                console.log(app.globalData.userInfo)
                console.log(that.data.userInfo)
              }
            
            })
          }
        })                                              
      }
      
    }
    )
    
    
    
  
  }
})