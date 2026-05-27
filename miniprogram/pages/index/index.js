const app = getApp();

Page({
  data: {
    banners: [],
    teachers: [],
    travelProjects: [],
    courses: [],
    members: [],
    products: [],
    loading: true,
    userInfo: null,
    scrollTop: 0
  },

  onLoad() {
    this.loadPageData();
    this.checkUserLogin();
  },

  onShow() {
    // 每次显示页面时更新用户信息
    this.checkUserLogin();
  },

  // 检查用户登录状态
  checkUserLogin() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({ userInfo });
    }
  },

  // 加载首页数据
  loadPageData() {
    Promise.all([
      this.loadBanners(),
      this.loadTeachers(),
      this.loadTravelProjects(),
      this.loadCourses(),
      this.loadMembers(),
      this.loadProducts()
    ]).then(() => {
      this.setData({ loading: false });
    }).catch(err => {
      console.error('加载首页数据失败:', err);
      this.setData({ loading: false });
    });
  },

  // 加载轮播图
  loadBanners() {
    return new Promise((resolve) => {
      // 模拟数据
      const banners = [
        {
          id: 1,
          image: 'https://via.placeholder.com/375x200?text=Banner1',
          title: '医视界介绍',
          link: ''
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/375x200?text=Banner2',
          title: '健康旅居理念',
          link: ''
        },
        {
          id: 3,
          image: 'https://via.placeholder.com/375x200?text=Banner3',
          title: '企业资质',
          link: ''
        }
      ];
      this.setData({ banners });
      resolve();
    });
  },

  // 加载老师
  loadTeachers() {
    return new Promise((resolve) => {
      const teachers = [
        {
          id: 1,
          name: '王健康医生',
          title: '心脑血管专家',
          avatar: 'https://via.placeholder.com/80x80?text=Teacher1',
          intro: '30年临床经验'
        },
        {
          id: 2,
          name: '李养生专家',
          title: '中医养生顾问',
          avatar: 'https://via.placeholder.com/80x80?text=Teacher2',
          intro: '国家级中医师'
        },
        {
          id: 3,
          name: '张睡眠医生',
          title: '睡眠调理师',
          avatar: 'https://via.placeholder.com/80x80?text=Teacher3',
          intro: '睡眠医学博士'
        }
      ];
      this.setData({ teachers });
      resolve();
    });
  },

  // 加载旅居项目
  loadTravelProjects() {
    return new Promise((resolve) => {
      const projects = [
        {
          id: 1,
          name: '海南康养旅居7日',
          price: 3980,
          image: 'https://via.placeholder.com/200x150?text=Travel1',
          location: '海南三亚',
          days: 7,
          rating: 4.8
        },
        {
          id: 2,
          name: '巴马养生旅居5日',
          price: 2980,
          image: 'https://via.placeholder.com/200x150?text=Travel2',
          location: '广西巴马',
          days: 5,
          rating: 4.9
        },
        {
          id: 3,
          name: '云南康养旅居10日',
          price: 5980,
          image: 'https://via.placeholder.com/200x150?text=Travel3',
          location: '云南昆明',
          days: 10,
          rating: 4.7
        }
      ];
      this.setData({ travelProjects: projects });
      resolve();
    });
  },

  // 加载课程
  loadCourses() {
    return new Promise((resolve) => {
      const courses = [
        {
          id: 1,
          title: '心脑血管健康讲座',
          category: '心脑血管',
          image: 'https://via.placeholder.com/150x150?text=Course1',
          views: 2341
        },
        {
          id: 2,
          title: '睡眠调理秘诀',
          category: '睡眠',
          image: 'https://via.placeholder.com/150x150?text=Course2',
          views: 1892
        },
        {
          id: 3,
          title: '慢病管理指南',
          category: '慢病调理',
          image: 'https://via.placeholder.com/150x150?text=Course3',
          views: 3421
        }
      ];
      this.setData({ courses });
      resolve();
    });
  },

  // 加载学员风采
  loadMembers() {
    return new Promise((resolve) => {
      const members = [
        {
          id: 1,
          name: '王阿姨',
          image: 'https://via.placeholder.com/100x100?text=Member1',
          feedback: '参加后身体好多了！'
        },
        {
          id: 2,
          name: '李叔叔',
          image: 'https://via.placeholder.com/100x100?text=Member2',
          feedback: '推荐给所有朋友'
        },
        {
          id: 3,
          name: '张爷爷',
          image: 'https://via.placeholder.com/100x100?text=Member3',
          feedback: '服务很周到'
        }
      ];
      this.setData({ members });
      resolve();
    });
  },

  // 加载产品
  loadProducts() {
    return new Promise((resolve) => {
      const products = [
        {
          id: 1,
          name: '心脑宝胶囊',
          price: 298,
          image: 'https://via.placeholder.com/150x150?text=Product1',
          sales: 1234
        },
        {
          id: 2,
          name: '睡眠精油',
          price: 168,
          image: 'https://via.placeholder.com/150x150?text=Product2',
          sales: 892
        },
        {
          id: 3,
          name: '养生茶叶礼盒',
          price: 358,
          image: 'https://via.placeholder.com/150x150?text=Product3',
          sales: 2341
        }
      ];
      this.setData({ products });
      resolve();
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadPageData();
    wx.stopPullDownRefresh();
  },

  // 页面滚动
  onPageScroll(e) {
    this.setData({ scrollTop: e.scrollTop });
  },

  // 跳转到旅居列表
  goToTravel() {
    wx.switchTab({ url: '/pages/travel/list' });
  },

  // 查看旅居详情
  viewTravelDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/travel/detail?id=${id}` });
  },

  // 查看课程详情
  viewCourseDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/course/detail?id=${id}` });
  },

  // 查看产品详情
  viewProductDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/mall/detail?id=${id}` });
  },

  // 客服咨询
  contactService() {
    wx.makePhoneCall({
      phoneNumber: '4000000000'
    });
  }
});
