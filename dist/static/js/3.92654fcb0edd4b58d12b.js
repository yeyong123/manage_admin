webpackJsonp([3,38],{191:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{name:"Admin"}},computed:{username:function e(){var e=JSON.parse(localStorage.getItem("user")||"[]");return e.name?e.name:this.name}},methods:{handleCommand:function(e){"loginout"==e&&(localStorage.removeItem("5mutian_token"),localStorage.removeItem("user"),this.$router.push("/login"))}}}},192:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(605),a=n.n(i),s=n(606);n.n(s);t.default={components:{vHead:a.a}}},193:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={computed:{onRoutes:function(){return this.$route.path.replace("/","")}}}},319:function(e,t,n){t=e.exports=n(7)(),t.push([e.i,".sidebar[data-v-226e7b30]{display:block;position:absolute;width:230px;left:0;top:70px;bottom:0;background:#2e363f;overflow:auto}.sidebar>ul[data-v-226e7b30]{height:100%}",""])},325:function(e,t,n){t=e.exports=n(7)(),t.push([e.i,".header[data-v-5eee63e9]{position:relative;box-sizing:border-box;width:100%;height:70px;font-size:22px;line-height:70px;color:#fff}.header .logo[data-v-5eee63e9]{float:left;width:250px;text-align:center}.user-info[data-v-5eee63e9]{float:right;padding-right:50px;font-size:16px;color:#fff}.user-info .el-dropdown-link[data-v-5eee63e9]{position:relative;display:inline-block;padding-left:50px;color:#fff;cursor:pointer;vertical-align:middle}.user-info .user-logo[data-v-5eee63e9]{position:absolute;left:0;top:15px;width:40px;height:40px;border-radius:50%}.el-dropdown-menu__item[data-v-5eee63e9]{text-align:center}a[data-v-5eee63e9]{color:#fff}",""])},600:function(e,t,n){e.exports=n.p+"static/img/img.2aab7b4.jpg"},605:function(e,t,n){n(657);var i=n(31)(n(191),n(623),"data-v-5eee63e9",null);e.exports=i.exports},606:function(e,t,n){n(651);var i=n(31)(n(193),n(613),"data-v-226e7b30",null);e.exports=i.exports},613:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sidebar"},[n("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"",theme:"dark","unique-opened":"",router:""}},[n("el-menu-item",{attrs:{index:"/dashboard"}},[n("i",{staticClass:"el-icon-setting"}),e._v("控制台\n      ")]),e._v(" "),n("el-menu-item",{attrs:{index:"/audit"}},[n("i",{staticClass:"el-icon-information"}),e._v("审核列表\n        ")]),e._v(" "),n("el-menu-item",{attrs:{index:"/users"}},[n("i",{staticClass:"el-icon-share"}),e._v("用户列表\n          ")]),e._v(" "),n("el-menu-item",{attrs:{index:"/orders"}},[n("i",{staticClass:"el-icon-menu"}),e._v("订单列表\n            ")]),e._v(" "),n("el-menu-item",{attrs:{index:"/payments"}},[n("i",{staticClass:"el-icon-document"}),e._v("财务报表\n              ")]),e._v(" "),n("el-menu-item",{attrs:{index:"/companies"}},[n("i",{staticClass:"el-icon-minus"}),e._v("品牌管理\n                ")]),e._v(" "),n("el-submenu",{attrs:{index:"1"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-more"}),e._v("附加工具")]),e._v(" "),n("el-menu-item",{attrs:{index:"/mail"}},[e._v("邮件/短信状态")]),e._v(" "),n("el-menu-item",{attrs:{index:"/libs"}},[e._v("材料库")]),e._v(" "),n("el-menu-item",{attrs:{index:"/admins"}},[e._v("管理员管理")]),e._v(" "),n("el-menu-item",{attrs:{index:"/invoices"}},[e._v("待开票")])],2),e._v(" "),n("el-submenu",{attrs:{index:"2"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-document"}),e._v("提现")]),e._v(" "),n("el-menu-item",{attrs:{index:"/encashs"}},[e._v("提现列表")])],2),e._v(" "),n("el-submenu",{attrs:{index:"3"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-information"}),e._v("税费/收益设置")]),e._v(" "),n("el-menu-item",{attrs:{index:"/rate"}},[e._v("设置税费/利率收益")]),e._v(" "),n("el-menu-item",{attrs:{index:"/profits"}},[e._v("收益列表")])],2),e._v(" "),n("el-submenu",{attrs:{index:"8"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),e._v("表格")]),e._v(" "),n("el-menu-item",{attrs:{index:"basetable"}},[e._v("基础表格")]),e._v(" "),n("el-menu-item",{attrs:{index:"vuetable"}},[e._v("Vue表格组件")])],2),e._v(" "),n("el-submenu",{attrs:{index:"9"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-date"}),e._v("表单")]),e._v(" "),n("el-menu-item",{attrs:{index:"baseform"}},[e._v("基本表单")]),e._v(" "),n("el-menu-item",{attrs:{index:"vueeditor"}},[e._v("编辑器")]),e._v(" "),n("el-menu-item",{attrs:{index:"markdown"}},[e._v("markdown")]),e._v(" "),n("el-menu-item",{attrs:{index:"upload"}},[e._v("文件上传")])],2),e._v(" "),n("el-submenu",{attrs:{index:"10"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-star-on"}),e._v("图表")]),e._v(" "),n("el-menu-item",{attrs:{index:"basecharts"}},[e._v("基础图表")]),e._v(" "),n("el-menu-item",{attrs:{index:"mixcharts"}},[e._v("混合图表")])],2)],1)],1)},staticRenderFns:[]}},623:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"header"},[e._m(0),e._v(" "),i("div",{staticClass:"user-info"},[i("el-dropdown",{attrs:{trigger:"click"},on:{command:e.handleCommand}},[i("span",{staticClass:"el-dropdown-link"},[i("img",{staticClass:"user-logo",attrs:{src:n(600)}}),e._v("\n                "+e._s(e.username)+"\n            ")]),e._v(" "),i("el-dropdown-menu",{slot:"dropdown"},[i("el-dropdown-item",{attrs:{command:"loginout"}},[e._v("退出")])],1)],1)],1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"logo"},[n("a",{attrs:{href:"/"}},[e._v("后台管理系统")])])}]}},633:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper"},[n("v-head"),e._v(" "),n("div",{staticClass:"content"},[n("transition",{attrs:{name:"move",mode:"out-in"}},[n("router-view")],1)],1)],1)},staticRenderFns:[]}},651:function(e,t,n){var i=n(319);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(30)("25179c4e",i,!0)},657:function(e,t,n){var i=n(325);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(30)("21594d48",i,!0)},81:function(e,t,n){var i=n(31)(n(192),n(633),null,null);e.exports=i.exports}});