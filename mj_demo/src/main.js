// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import md5 from 'js-md5'
import store from './utils/storeUtils'
import './mock.js'
import {getRequest} from './utils/apiUtils'
import {postRequest} from './utils/apiUtils'
import {deleteRequest} from './utils/apiUtils'
import {putRequest} from './utils/apiUtils'
import {loginRequest} from './utils/apiUtils'

Vue.prototype.$MD5 = md5
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.loginRequest = loginRequest;
Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.use(element)

router.beforeEach((to,from,next) => {
  if (localStorage.getItem('userName') == null && to.path !== '/') {
    next('/')
  } else if(localStorage.getItem('userName') != null && to.path == '/') {
    next('/system/app')
  }else{
    next()
  }
})

router.afterEach((to,from,next) => {
  window.scrollTo(0, 0)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
