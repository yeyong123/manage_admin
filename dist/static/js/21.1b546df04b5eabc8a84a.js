webpackJsonp([21,38],{195:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{admins:[],page:{next_page:1},q:""}},created:function(){this.fetchResource(this.page.next_page)},methods:{fetchResource:function(e){var t=this;this.$http.get("admins.json?page="+e).then(function(e){t.admins=e.body.klass,t.page=e.body.page},function(e){t.$message.error("加载失败")})},handlePage:function(e){this.fetchResource(e)}}}},331:function(e,t,a){t=e.exports=a(7)(),t.push([e.i,"img[data-v-7eddfc47]{width:80px;height:80px}",""])},630:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-menu"}),e._v(" "),a("router-link",{attrs:{to:"/dashboard"}},[e._v("\n           主页\n           ")])],1),e._v(" "),a("el-breadcrumb-item",[e._v("品牌商列表")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.admins,border:""}},[a("el-table-column",{attrs:{prop:"name",label:"管理员"}}),e._v(" "),a("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"手机"}}),e._v(" "),a("el-table-column",{attrs:{prop:"role",label:"角色"}})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":e.page.current_page,"page-size":25,total:e.page.total_count},on:{"current-change":e.handlePage}})],1)],1)},staticRenderFns:[]}},664:function(e,t,a){var n=a(331);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(30)("7523dafd",n,!0)},83:function(e,t,a){a(664);var n=a(31)(a(195),a(630),"data-v-7eddfc47",null);e.exports=n.exports}});