const request = require('../../utils/request');

Page({
  data: {
    healthData: {
      basicInfo: {},
      medicalHistory: [],
      familyHistory: [],
      lifeStyle: {}
    },
    editMode: false
  },

  onLoad() {
    this.fetchHealthData();
  },

  fetchHealthData() {
    request.get('/health-record/my-info')
      .then(res => {
        this.setData({
          healthData: res.data
        });
      })
      .catch(err => {
        console.error('获取健康档案失败', err);
      });
  },

  toggleEditMode() {
    this.setData({
      editMode: !this.data.editMode
    });
  },

  saveHealthData() {
    request.put('/health-record/update', this.data.healthData)
      .then(res => {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
        this.setData({
          editMode: false
        });
      })
      .catch(err => {
        console.error('保存失败', err);
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      });
  }
});