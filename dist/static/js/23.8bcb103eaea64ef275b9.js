webpackJsonp([23,38],{110:function(e,t,a){var r=a(31)(a(221),a(642),null,null);e.exports=r.exports},221:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{roles:[],page:{next_page:1}}},created:function(){this.fetchResource(this.page.next_page)},methods:{fetchResource:function(e){var t=this;this.$http.get("depart_roles.json?page="+e).then(function(e){t.roles=e.body.klass,t.page=e.body.page})},handlePage:function(e){this.fetchResource(e)}}}},642:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-menu"}),e._v(" "),a("router-link",{attrs:{to:"/dashboard"}},[e._v("\n          主页\n          ")])],1),e._v(" "),a("el-breadcrumb-item",[e._v("角色")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.roles,border:""}},[a("el-table-column",{attrs:{prop:"department_name",label:"部门"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"角色名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"rules",label:"权限"}}),e._v(" "),a("el-table-column",{attrs:{prop:"company_id",label:"所属品牌"}})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":e.page.current_page,"page-size":25,total:e.page.total_count},on:{"current-change":e.handlePage}})],1)],1)},staticRenderFns:[]}}});