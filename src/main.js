import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import VueSocketIO from 'vue-socket.io'
import store from './store'
import './common.scss'

Vue.use(ElementUI);
Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://8.131.89.181:7001/',    // 这个地址是 线上的 服务端地址
  // connection: 'http://192.168.0.109:7001/',    // 这个地址是 浩爽的 服务端地址
  // connection: 'http://192.168.0.120:7001/',    //这个地址是 尚宇豪 服务端地址
}))
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
