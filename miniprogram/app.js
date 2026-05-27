App({
  onLaunch() {
    // 检查更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(() => {});
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {});
    }

    // 初始化全局变量
    this.globalData = {
      userInfo: null,
      token: null,
      appId: 'wx_your_app_id',
      baseUrl: 'https://api.yishijie.com'
    }

    // 检查登录状态
    this.checkLoginStatus()
  },

  checkLoginStatus() {
    wx.checkSession({
      success: () => {
        // session 未过期，检查本地是否有 token
        const token = wx.getStorageSync('token')
        if (token) {
          this.globalData.token = token
        }
      },
      fail: () => {
        // session 过期
        wx.clearStorageSync()
      }
    })
  },

  // 获取用户信息
  getUserInfo(callback) {
    if (this.globalData.userInfo) {
      typeof callback === 'function' && callback(this.globalData.userInfo)
      return
    }

    wx.getUserInfo({
      success: (res) => {
        this.globalData.userInfo = res.userInfo
        typeof callback === 'function' && callback(res.userInfo)
      }
    })
  },

  // API 请求
  request(options) {
    const { url, method = 'GET', data = null, header = {} } = options
    const token = this.globalData.token

    return new Promise((resolve, reject) => {
      wx.request({
        url: this.globalData.baseUrl + url,
        method: method,
        data: data,
        header: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          ...header
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else if (res.statusCode === 401) {
            // 未授权，清除 token
            wx.clearStorageSync()
            this.globalData.token = null
            wx.navigateTo({ url: '/pages/index/index' })
            reject(res.data)
          } else {
            reject(res.data)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
})
