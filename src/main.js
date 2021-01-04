import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'
import vuetify from './plugins/vuetify';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';

require('moment/locale/ru');
Vue.config.productionTip = false
Vue.use(VueFilterDateFormat);

Vue.filter('localTime', function (date) {
    if (date) {
        return moment.utc(date || new Date()).local().format("DD.MM.YYYY, HH:mm")
    }
});

Vue.prototype.$http = axios.create({
    baseURL: store.state.baseUrl
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
