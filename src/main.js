import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.min.css'
//import Routes from './routes'
import router from './routes'
import Swal from 'sweetalert2'
import VeeValidate from 'vee-validate';
import Moment from 'moment';
import vue from 'vue'
import 'chart.js'
import 'hchs-vue-charts'
import '../node_modules/nprogress/nprogress.css'
import nProgress from 'nprogress';

const swal = require('sweetalert2');
window.swal=swal;
const moment = require('moment')
window.moment=moment;
const NProgress = require('nprogress')
window.NProgress = NProgress;




Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(window.VueCharts);


Vue.config.productionTip = false


new Vue({
  el:"#app",
  router : router,
  render: h => h(App)

})
