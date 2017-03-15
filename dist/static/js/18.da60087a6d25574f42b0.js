webpackJsonp([18,27],{183:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{audits:[],audit:"",dialogVisible:!1,page:{}}},created:function(){this.fetchResource(this.page.next_page)},methods:{detail:function(t){var e=this;e.dialogVisible=!0,e.$http.get("audits/"+t+".json").then(function(t){e.audit=t.body.audit})},fetchResource:function(t){var e=this;e.$http.get("audits.json?page="+t).then(function(t){e.audits=t.body.audits,e.page=t.body.page,console.log(t.body)},function(t){e.$message.error("加载失败")})},handlePage:function(t){this.fetchResource(t)},confirm_appoint:function(t,e){var a=this;this.$http.post("audits/"+t+"/audit.json?type=confirm",{}).then(function(t){a.audits.splice(e,1),a.$message("审核成功"),console.log(t.body)},function(t){a.$message.error("操作失败")})},reject_appoint:function(t,e){var a=this;this.$http.post("audits/"+t+"/audit.json?type=reject",{}).then(function(t){a.$message("拒绝了用户的请求"),console.log(t.body)},function(t){a.$message.error("操作失败")})}}}},312:function(t,e,a){e=t.exports=a(7)(),e.push([t.i,".ms-doc[data-v-ede3225a]{width:100%;max-width:980px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif}.ms-doc h3[data-v-ede3225a]{padding:9px 10px 10px;margin:0;font-size:14px;line-height:17px;background-color:#f5f5f5;border:1px solid #d8d8d8;border-bottom:0;border-radius:3px 3px 0 0}.ms-doc article[data-v-ede3225a]{padding:45px;word-wrap:break-word;background-color:#fff;border:1px solid #ddd;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.ms-doc article h1[data-v-ede3225a]{font-size:32px;padding-bottom:10px;margin-bottom:15px;border-bottom:1px solid #ddd}.ms-doc article h2[data-v-ede3225a]{margin:24px 0 16px;font-weight:600;line-height:1.25;padding-bottom:7px;font-size:24px;border-bottom:1px solid #eee}.ms-doc article p[data-v-ede3225a]{margin-bottom:15px;line-height:1.5}.ms-doc article .el-checkbox[data-v-ede3225a]{margin-bottom:5px}ul[data-v-ede3225a]{list-style:none}ul li[data-v-ede3225a]{padding:7px;border-bottom:1px solid #ccc;text-align:left;width:100%}ul li span[data-v-ede3225a]{text-align:right}.image-list img[data-v-ede3225a]{width:100%;height:auto}",""])},607:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-setting"}),t._v(" 审核列表")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.audits,border:""}},[a("el-table-column",{attrs:{label:"用户昵称",sortable:"",width:"180"},scopedSlots:t._u([["default",function(e){return[a("div",{staticClass:"detail",on:{click:function(a){t.detail(e.row.id)}}},[t._v(t._s(e.row.real_name))])]}]])}),t._v(" "),a("el-table-column",{attrs:{prop:"tel",label:"电话",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"role",label:"申请角色",sortable:"",width:"150"},scopedSlots:t._u([["default",function(e){return[1===e.row.role?a("el-tag",{attrs:{type:"success"}},[t._v("\n                            品牌商\n                            ")]):a("el-tag",{attrs:{type:"primary"}},[t._v("\n                                服务商\n                                ")])]}]])}),t._v(" "),a("el-table-column",{attrs:{prop:"audit",label:"审核状态",sortable:"",width:"150"},scopedSlots:t._u([["default",function(e){return[e.row.audit===!0?a("el-tag",{attrs:{type:"success"}},[t._v("\n                                已通过\n                                ")]):a("el-tag",{attrs:{type:"warning"}},[t._v("\n                                    待审核\n                                    ")])]}]])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([["default",function(e){return[e.row.audit===!1?a("el-button",{attrs:{size:"small"},on:{click:function(a){t.confirm_appoint(e.row.id,e.$index)}}},[t._v("审核通过")]):t._e(),t._v(" "),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){t.reject_appoint(e.row.id,e.$index)}}},[t._v("驳回")])]}]])})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":t.page.current_page,"page-size":25,total:t.page.total_count},on:{"current-change":t.handlePage}})],1),t._v(" "),a("el-dialog",{attrs:{title:"信息详细",size:"tiny"},model:{value:t.dialogVisible,callback:function(e){t.dialogVisible=e}}},[a("ul",[a("li",[t._v(" 姓名: "),a("span",[t._v(t._s(t.audit.real_name))])]),t._v(" "),a("li",[t._v("手机: "),a("span",[t._v(t._s(t.audit.tel))])]),t._v(" "),a("li",[t._v("申请类型: "),a("span",[t._v(t._s(1==t.audit.role?"品牌商":"服务商"))])]),t._v(" "),t._l(t.audit.pictures,function(t){return a("li",{staticClass:"image-list"},[a("img",{attrs:{src:t.image.url}})])})],2),t._v(" "),a("span",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]}},631:function(t,e,a){var i=a(312);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(29)("1424ff7c",i,!0)},82:function(t,e,a){a(631);var i=a(30)(a(183),a(607),"data-v-ede3225a",null);t.exports=i.exports}});