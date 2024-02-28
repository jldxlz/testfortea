import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from 'axios'
import store from './store'


const service = axios.create({
  // baseURL 需要设置为反向代理前缀，不能设置绝对路径URL
  baseURL: "/api",
  timeout: 500000,
  withCredentials: false,
  headers: { 'X-Custom-Header': 'zuiyu' }
})

const goService = axios.create({
  // baseURL 需要设置为反向代理前缀，不能设置绝对路径URL
  baseURL: "/istackAgent",
  timeout: 500000,
  withCredentials: false,
  headers: { 'X-Custom-Header': 'zuiyu' }
})

const app = createApp(App)

app.use(ElementPlus)
app.use(store)

//为axios配置请求的根路径
// axios.defaults.baseURL='http://localhost'

//将axios挂载为app的全局自定义属性之后
//每个组件可以通过this直接访问到全局挂载的自定义属性
app.provide('$axios', axios)
app.use(router)
app.mount('#app')
app.config.globalProperties.$http = service
app.config.globalProperties.$goService = goService



router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth) {
    next();
  } else {
    // let token = localStorage.getItem('token');
    // if (token === null || token === 'null' || token === '' || token === 'undefined') {
    if (!localStorage.getItem('token')) {
      next('/login');
    } else {
      next();
    }
  }
});


//异步请求前在header里加入token
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  });
goService.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  });
//异步请求后，判断token是否过期
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
  }
)
goService.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
  }
)

window.router = router

export default { service, goService }
