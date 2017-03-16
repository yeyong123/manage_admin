import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import VueResoure from "vue-resource";
import vueFilter from "vue-filter";
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题

Vue.use(ElementUI);
Vue.use(VueResoure);
Vue.use(vueFilter)
Vue.http.options.root = "http://192.168.0.164:8080/admin";
Vue.http.headers.common['Authorization'] = localStorage.getItem("5mutian_token");
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;
new Vue({
    router,
    render: h => h(App),

}).$mount('#app');
