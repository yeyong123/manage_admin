webpackJsonp([17,27],{187:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{companies:[],page:{next_page:1},q:"",dialogVisible:!1,type:"new",edit_id:"",company:{name:"",logo:"",abbr:"",tel:"",address:""}}},created:function(){this.fetchResource(this.page.next_page)},methods:{fetchResource:function(e){var t=this;this.$http.get("companies.json?page="+e).then(function(e){t.companies=e.body.klass,t.page=e.body.page},function(e){t.$message.error("加载失败")})},handlePage:function(e){this.fetchResource(e)},newCompany:function(){this.dialogVisible=!0},companySubmit:function(){var e=this.company,t=this;t.$http.post("companies.json",e).then(function(e){var a=e.body;if(a.code>200)return void t.$message.error(a.msg);t.companies.unshift(a.klass),t.$message("添加完成"),t.dialogVisible=!1},function(e){t.$message.error("网络加载失败")})}}}},300:function(e,t,a){t=e.exports=a(7)(),t.push([e.i,"img[data-v-31c1c4d3]{width:80px;height:80px}",""])},591:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[e._v("品牌商列表")])],1)],1),e._v(" "),a("div",[a("el-button",{attrs:{type:"text"},on:{click:e.newCompany}},[e._v("添加品牌")])],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.companies,border:""}},[a("el-table-column",{attrs:{prop:"name",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"abbr",label:"缩写"}}),e._v(" "),a("el-table-column",{attrs:{prop:"tel",label:"联系人"}}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"地址"}}),e._v(" "),a("el-table-column",{attrs:{label:"Logo"},scopedSlots:e._u([["default",function(e){return[a("img",{attrs:{src:e.row.logo}})]}]])})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":e.page.current_page,"page-size":25,total:e.page.total_count},on:{"current-change":e.handlePage}})],1),e._v(" "),a("el-dialog",{attrs:{title:"品牌商操作"},model:{value:e.dialogVisible,callback:function(t){e.dialogVisible=t}}},[a("el-form",{ref:e.company,attrs:{inline:!0,model:e.company,"label-width":"80px",entype:"multipart/form-data"}},[a("el-form-item",{attrs:{label:"公司名称"}},[a("el-input",{model:{value:e.company.name,callback:function(t){e.company.name=t}}})],1),e._v(" "),a("el-form-item",{attrs:{label:"缩写"}},[a("el-input",{model:{value:e.company.abbr,callback:function(t){e.company.abbr=t}}})],1),e._v(" "),a("el-form-item",{attrs:{label:"联系人"}},[a("el-input",{model:{value:e.company.tel,callback:function(t){e.company.tel=t}}})],1),e._v(" "),a("el-form-item",{attrs:{label:"地址"}},[a("el-input",{model:{value:e.company.address,callback:function(t){e.company.address=t}}})],1),e._v(" "),a("el-form-item",{attrs:{label:"公司 Logo"}},[a("el-input",{model:{value:e.company.logo,callback:function(t){e.company.logo=t}}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.companySubmit(e.type,e.edit_id)}}},[e._v("提交")]),e._v(" "),a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]}},619:function(e,t,a){var o=a(300);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a(29)("347b30a2",o,!0)},86:function(e,t,a){a(619);var o=a(30)(a(187),a(591),"data-v-31c1c4d3",null);e.exports=o.exports}});