import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import moment from 'moment'
import vuetify from './plugins/vuetify';

require('moment/locale/ru');
Vue.config.productionTip = false

Vue.filter('localTime', function (date) {
    if (date) {
        return moment.utc(date || new Date()).local().format("DD.MM.YYYY, HH:mm")
    }
});
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
