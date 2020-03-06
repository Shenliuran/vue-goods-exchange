import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import vuetify from './plugins/vuetify'
import store from './store/index'
import service from './utils/request'


Vue.config.productionTip = false
Vue.prototype.$axios = service


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
