const app = getApp();
const BASE_URL = app.globalData.apiBase;

function request(url, method = 'GET', data = null, needAuth = true) {
  return new Promise((resolve, reject) => {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (needAuth) {
      const token = wx.getStorageSync('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        wx.navigateTo({
          url: '/pages/login/index'
        });
        reject({ code: -1, message: '未登录' });
        return;
      }
    }

    wx.request({
      url: `${BASE_URL}${url}`,
      method: method,
      data: data,
      header: headers,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          wx.removeStorageSync('token');
          wx.navigateTo({
            url: '/pages/login/index'
          });
          reject({ code: -1, message: '未授权' });
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        reject({ code: -1, message: '网络请求失败' });
      }
    });
  });
}

function get(url, needAuth = true) {
  return request(url, 'GET', null, needAuth);
}

function post(url, data = null, needAuth = true) {
  return request(url, 'POST', data, needAuth);
}

function put(url, data = null, needAuth = true) {
  return request(url, 'PUT', data, needAuth);
}

function del(url, needAuth = true) {
  return request(url, 'DELETE', null, needAuth);
}

module.exports = {
  request,
  get,
  post,
  put,
  del
};