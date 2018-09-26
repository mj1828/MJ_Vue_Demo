import Vue from 'vue'
import Router from 'vue-router'
import adminlogin from '@/components/login'
// 日志
import appLog from '@/components/log/app/appLog'
import loginLog from '@/components/log/login/loginLog'
import systemLog from '@/components/log/system/systemLog'
// 系统管理
import app from '@/components/system/app/app'
import user from '@/components/system/user/user'
// 统计管理
import statistics from '@/components/statistics/statistics'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: adminlogin
    },
   //用户管理
    {
      path: '/system/app',
      name: '/system/app',
      component: app
    },
    // 系统管理
    {
      path: '/system/user',
      name: '/system/user',
      component: user
    },
    {
      path: '/statistics/statistics',
      name: '/statistics/statistics',
      component: statistics
    },
    // 日志管理
    {
      path: '/log/appLog',
      name: '/log/appLog',
      component: appLog
    },
    {
      path: '/log/loginLog',
      name: '/log/loginLog',
      component: loginLog
    },
    {
      path: '/log/systemLog',
      name: '/log/systemLog',
      component: systemLog
    }
  ]
})