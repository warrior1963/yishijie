App({
  onLaunch() {
    this.checkAuth();
  },
  onShow() {
    console.log('小程序显示');
  },
  onHide() {
    console.log('小程序隐藏');
  },
  globalData: {
    userInfo: null,
    token: null,
    apiBase: 'http://localhost:8080/api'
  },
  checkAuth() {
    const token = wx.getStorageSync('token');
    if (token) {
      this.globalData.token = token;
    }
  },
  getUserInfo() {
    return this.globalData.userInfo;
  },
  setUserInfo(userInfo) {
    this.globalData.userInfo = userInfo;
    wx.setStorageSync('userInfo', userInfo);
  }
});