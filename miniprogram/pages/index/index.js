const request = require('../../utils/request');

Page({
  data: {
    banners: [],
    courses: [],
    products: [],
    announcements: []
  },

  onLoad() {
    this.fetchBanners();
    this.fetchCourses();
    this.fetchProducts();
    this.fetchAnnouncements();
  },

  fetchBanners() {
    request.get('/banner/list')
      .then(res => {
        this.setData({
          banners: res.data || []
        });
      })
      .catch(err => {
        console.error('获取轮播图失败', err);
      });
  },

  fetchCourses() {
    request.get('/course/list?page=1&limit=4')
      .then(res => {
        this.setData({
          courses: res.data || []
        });
      })
      .catch(err => {
        console.error('获取课程列表失败', err);
      });
  },

  fetchProducts() {
    request.get('/product/list?page=1&limit=4')
      .then(res => {
        this.setData({
          products: res.data || []
        });
      })
      .catch(err => {
        console.error('获取商品列表失败', err);
      });
  },

  fetchAnnouncements() {
    request.get('/announcement/list?page=1&limit=3')
      .then(res => {
        this.setData({
          announcements: res.data || []
        });
      })
      .catch(err => {
        console.error('获取公告失败', err);
      });
  },

  goToCourseDetail(e) {
    const courseId = e.currentTarget.dataset.courseId;
    wx.navigateTo({
      url: `/pages/course/detail?id=${courseId}`
    });
  },

  onPullDownRefresh() {
    this.fetchBanners();
    this.fetchCourses();
    this.fetchProducts();
    this.fetchAnnouncements();
    wx.stopPullDownRefresh();
  }
});