import VeeValidate, { Validator } from 'vee-validate';
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store/store';

// tslint:disable-next-line:no-var-requires
const ja = require('vee-validate/dist/locale/ja');
// tslint:enable

Vue.config.productionTip = false;
Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: ja });

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
