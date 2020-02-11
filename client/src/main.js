import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import Axios from "axios";
import store from './store/index';

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faTrash,
  faLink,
  faListUl,
  faRandom,
  faUndo,
  faStar,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faLink, faListUl, faRandom, faUndo, faStar, faEnvelope);


Vue.config.productionTip = false

Vue.prototype.$http = Axios;

const token = localStorage.getItem('token') || '';
if (token) {
  Vue.prototype.$http.defaults.headers.common['authToken'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
