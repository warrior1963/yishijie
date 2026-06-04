const request = require('../../utils/request');

Page({
  data: {
    promotionCode: '',
    promotionData: {
      totalRefer: 0,
      referCount: 0,
      totalReward: 0
    },
    loading: false
  },

  onLoad() {
    this.initPromotion();
  },

  initPromotion() {
    request.get('/promotion/my-info')
      .then(res => {
        this.setData({
          promotionCode: res.data.promotionCode,
          promotionData: res.data
        });
      })
      .catch(err => {
        console.error('获取推广信息失败', err);
        wx.showToast({
          title: '获取推广信息失败',
          icon: 'none'
        });
      });
  },

  copyPromotionCode() {
    wx.setClipboardData({
      data: this.data.promotionCode,
      success() {
        wx.showToast({
          title: '推广码已复制',
          icon: 'success'
        });
      }
    });
  },

  generatePoster() {
    this.setData({ loading: true });
    request.get(`/promotion/generate-poster?code=${this.data.promotionCode}`)
      .then(res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.data.posterUrl,
          success: () => {
            wx.showToast({
              title: '海报已保存到相册',
              icon: 'success'
            });
          },
          fail: () => {
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            });
          },
          complete: () => {
            this.setData({ loading: false });
          }
        });
      })
      .catch(err => {
        console.error('生成海报失败', err);
        wx.showToast({
          title: '生成海报失败',
          icon: 'none'
        });
        this.setData({ loading: false });
      });
  },

  onShareAppMessage() {
    return {
      title: `我的专属推广码：${this.data.promotionCode}`,
      path: `/pages/promote/index?promotionCode=${this.data.promotionCode}`,
      imageUrl: '/images/share-poster.png'
    };
  }
});