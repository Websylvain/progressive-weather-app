// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(Vuex);

Vue.config.productionTip = false

require('@/assets/weather-icons/css/weather-icons.css');
import 'vuetify/dist/vuetify.min.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
