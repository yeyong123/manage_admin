webpackJsonp([15,38],{209:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{libs:[],page:{next_page:1},q:""}},created:function(){this.fetchResource(this.page.next_page)},methods:{fetchResource:function(e){var t=this;this.$http.get("material_libs.json?page="+e).then(function(e){t.libs=e.body.klass,t.page=e.body.page},function(e){t.$message.error("加载失败")})},handlePage:function(e){this.fetchResource(e)}}}},333:function(e,t,a){t=e.exports=a(7)(),t.push([e.i,"img[data-v-cb8caf74]{width:80px;height:80px}",""])},637:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-menu"}),e._v(" "),a("router-link",{attrs:{to:"/dashboard"}},[e._v("\n           主页\n           ")])],1),e._v(" "),a("el-breadcrumb-item",[e._v("材料库")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.libs,border:""}},[a("el-table-column",{attrs:{prop:"name",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"specify",label:"规格"}}),e._v(" "),a("el-table-column",{attrs:{prop:"count",label:"库存"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"单价"}}),e._v(" "),a("el-table-column",{attrs:{prop:"kind",label:"类别"}}),e._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"备注"}})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":e.page.current_page,"page-size":25,total:e.page.total_count},on:{"current-change":e.handlePage}})],1)],1)},staticRenderFns:[]}},665:function(e,t,a){var r=a(333);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(30)("4592935c",r,!0)},98:function(e,t,a){a(665);var r=a(31)(a(209),a(637),"data-v-cb8caf74",null);e.exports=r.exports}});