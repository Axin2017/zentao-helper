// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/store';
import plugin from './plugin/plugin';
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(window.zentaoConfig);
Vue.use(plugin);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
