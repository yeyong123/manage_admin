import Vue from 'vue';
import App from './App';
import Vuex from 'vuex'
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
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;
Vue.http.interceptors.push(function(request, next){
  request.headers.set("Authorization", localStorage.getItem("5mutian_token"));
  next(function(res){
    let code = res.body.code;
    if (code && code == 419) {
        router.push("/login")
    } else if (code && code > 200) {
        this.$alert(res.body.msg);
    }
  })  
});

new Vue({
    router,
    render: h => h(App),

}).$mount('#app');
