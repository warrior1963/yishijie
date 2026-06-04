const request = require('../../utils/request');

Page({
  data: {
    courseList: [],
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    finished: false
  },

  onLoad() {
    this.loadCourses();
  },

  loadCourses() {
    if (this.data.loading || this.data.finished) return;
    
    this.setData({ loading: true });
    
    request.get(`/course/list?page=${this.data.page}&limit=${this.data.limit}`)
      .then(res => {
        const newList = this.data.page === 1 ? res.data : [...this.data.courseList, ...res.data];
        this.setData({
          courseList: newList,
          page: this.data.page + 1,
          total: res.total || 0,
          loading: false,
          finished: newList.length >= res.total
        });
      })
      .catch(err => {
        console.error('获取课程列表失败', err);
        wx.showToast({
          title: '获取课程列表失败',
          icon: 'none'
        });
        this.setData({ loading: false });
      });
  },

  goToDetail(e) {
    const courseId = e.currentTarget.dataset.courseId;
    wx.navigateTo({
      url: `/pages/course/detail?id=${courseId}`
    });
  },

  onReachBottom() {
    this.loadCourses();
  },

  onPullDownRefresh() {
    this.setData({
      page: 1,
      courseList: []
    });
    this.loadCourses();
    wx.stopPullDownRefresh();
  }
});