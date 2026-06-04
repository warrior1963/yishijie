const request = require('../../utils/request');

Page({
  data: {
    phone: '',
    password: '',
    loading: false,
    agreePolicy: false
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },

  toggleAgreePolicy() {
    this.setData({
      agreePolicy: !this.data.agreePolicy
    });
  },

  wechatLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = res.userInfo;
        this.handleWechatLogin(userInfo);
      },
      fail: (err) => {
        console.error('获取用户信息失败', err);
        wx.showToast({
          title: '用户拒绝授权',
          icon: 'none'
        });
      }
    });
  },

  handleWechatLogin(userInfo) {
    this.setData({ loading: true });
    request.post('/user/wechat-login', {
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      gender: userInfo.gender
    }, false)
      .then(res => {
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('userInfo', res.data.userInfo);
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
      })
      .catch(err => {
        console.error('登录失败', err);
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        });
        this.setData({ loading: false });
      });
  },

  phoneLogin() {
    if (!this.data.phone || !this.data.password) {
      wx.showToast({
        title: '请输入手机号和密码',
        icon: 'none'
      });
      return;
    }

    this.setData({ loading: true });
    request.post('/user/phone-login', {
      phone: this.data.phone,
      password: this.data.password
    }, false)
      .then(res => {
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('userInfo', res.data.userInfo);
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
      })
      .catch(err => {
        console.error('登录失败', err);
        wx.showToast({
          title: err.message || '登录失败',
          icon: 'none'
        });
        this.setData({ loading: false });
      });
  }
});