import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

axios.interceptors.request.use(config => {
  return config;
}, err => {
  Message.error({ message: '请求超时!' });
  return Promise.resolve(err);
})
axios.interceptors.response.use(data => {
  if (data.status && data.status == 200 && data.data.Result == 'error') {
    Message.error({ message: data.data.Message });
    return;
  }
  if (data.status && data.status == 200 && data.data.NeedLogin) {
    localStorage.removeItem("userName")//删除本地缓存
    location.reload();
  }
  if (typeof data.data.Message == 'string') {
    try {
      data.data.Message = JSON.parse(data.data.Message);
    } catch (e) {
      console.log('error：' + e);
    }
  }
  return data;
}, err => {
  if (err.response.status == 504 || err.response.status == 404) {
    Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
  } else if (err.response.status == 403) {
    Message.error({ message: '权限不足,请联系管理员!' });
  } else {
    Message.error({ message: '未知错误!' });
  }
  return Promise.resolve(err);
})

let base = '';

export const loginRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  });
}
