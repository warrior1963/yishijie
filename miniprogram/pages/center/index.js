const request = require('../../utils/request');

Page({
  data: {
    userInfo: {},
    orders: [],
    points: 0,
    rewards: 0
  },

  onLoad() {
    this.fetchUserCenter();
  },

  fetchUserCenter() {
    request.get('/user/center')
      .then(res => {
        this.setData({
          userInfo: res.data.userInfo,
          orders: res.data.orders,
          points: res.data.points,
          rewards: res.data.rewards
        });
      })
      .catch(err => {
        console.error('获取会员中心信息失败', err);
      });
  },

  goToOrders() {
    wx.navigateTo({
      url: '/pages/order/list'
    });
  },

  editProfile() {
    wx.navigateTo({
      url: '/pages/center/edit'
    });
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.navigateTo({
            url: '/pages/login/index'
          });
        }
      }
    });
  }
});