webpackJsonp([13,27],{196:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{orders:[],page:{},order:{},edit_id:"",dialogVisible:!1,q:"",state:"",company_id:"",company_list:[],start_time:"",end_time:""}},created:function(){this.fetchResource(this.page.next_page)},methods:{fetchResource:function(e){var t=this;t.$http.get("orders.json?page="+e+"&q="+this.q).then(function(e){t.orders=e.body.klass,t.page=e.body.page},function(e){t.$message.error("加载失败")})},handlePage:function(e){this.fetchResource(e)},rowClick:function(e){this.$router.push("/orders/"+e)},searchQuery:function(){this.fetchResource(1)},edit:function(e){var t=this;t.orders.forEach(function(r,a){if(e==r.id)return t.order=r,void(t.edit_id=e)}),t.dialogVisible=!0},editSubmit:function(e){var t=new FormData,r=this;for(var a in r.order)t.append(a,r.order[a]);r.$http.put("orders/"+r.edit_id+".json").then(function(e){var t=e.body;if(t.code>200)return void r.$message.error(t.msg);r.$message("修改完成"),r.dialogVisible=!1},function(e){r.$message.error("加载失败")})},orderState:function(e,t){var r="";switch(e.workflow_state){case"installed":r="已安装";break;case"canceled":r="已取消";break;case"completed":r="已完成";break;case"measured":r="已测量";break;case"appointed_installation":r="预约安装";break;case"appointed_measurement":r="预约测量";break;default:r="已取消"}return r}}}},304:function(e,t,r){t=e.exports=r(7)(),t.push([e.i,".search[data-v-649f511d]{width:200px;float:right;margin-bottom:15px}",""])},595:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"table"},[r("div",{staticClass:"crumbs"},[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",[r("i",{staticClass:"el-icon-menu"}),e._v(" 订单")]),e._v(" "),r("el-breadcrumb-item",[e._v("订单列表")])],1)],1),e._v(" "),r("div",{staticClass:"user-header"},[r("el-input",{staticClass:"search",attrs:{icon:"search","on-icon-click":e.searchQuery},model:{value:e.q,callback:function(t){e.q=t}}})],1),e._v(" "),r("el-table",{attrs:{data:e.orders,border:""}},[r("el-table-column",{attrs:{label:"订单号"},scopedSlots:e._u([["default",function(t){return[r("span",{on:{click:function(r){e.rowClick(t.row.id)}}},[e._v(e._s(t.row.serial_number))])]}]])}),e._v(" "),r("el-table-column",{attrs:{label:"发单人",width:"150"},scopedSlots:e._u([["default",function(t){return[e._v("\n          "+e._s(t.row.name)+"\n        ")]}]])}),e._v(" "),r("el-table-column",{attrs:{prop:"tel",label:"手机",width:"170"}}),e._v(" "),r("el-table-column",{attrs:{prop:"total",label:"预估总价"}}),e._v(" "),r("el-table-column",{attrs:{prop:"city",label:"所在城市"}}),e._v(" "),r("el-table-column",{attrs:{prop:"region",label:"渠道"}}),e._v(" "),r("el-table-column",{attrs:{prop:"workflow_state",label:"进度",formatter:e.orderState}}),e._v(" "),r("el-table-column",{attrs:{label:"接单人"},scopedSlots:e._u([["default",function(t){return[r("a",{attrs:{link:{name:"users",params:{id:t.row.facilitator_id}}}},[e._v(e._s(t.row.service_info.name))])]}]])}),e._v(" "),r("el-table-column",{attrs:{prop:"customer_service_info.name",label:"测量人"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"160"},scopedSlots:e._u([["default",function(t){return[r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){e.rowClick(t.row.id)}}},[e._v("查看")]),e._v(" "),r("el-button",{attrs:{type:"text",size:"small"},on:{click:function(r){e.edit(t.row.id)}}},[e._v("编辑")])]}]])})],1),e._v(" "),r("div",{staticClass:"pagination"},[r("el-pagination",{attrs:{layout:"prev, pager, next","current-page":e.page.current_page,"page-size":25,total:e.page.total_count},on:{"current-change":e.handlePage}})],1),e._v(" "),r("el-dialog",{attrs:{title:"订单处理"},model:{value:e.dialogVisible,callback:function(t){e.dialogVisible=t}}},[r("el-form",{ref:"order",attrs:{inline:!0,model:e.order,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"订单号"}},[r("el-input",{attrs:{disabled:""},model:{value:e.order.serial_number,callback:function(t){e.order.serial_number=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"面积"}},[r("el-input",{model:{value:e.order.square,callback:function(t){e.order.square=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"省"}},[r("el-input",{model:{value:e.order.province,callback:function(t){e.order.province=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"市"}},[r("el-input",{model:{value:e.order.city,callback:function(t){e.order.city=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"区"}},[r("el-input",{model:{value:e.order.area,callback:function(t){e.order.area=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"街道"}},[r("el-input",{model:{value:e.order.street,callback:function(t){e.order.street=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"联系人"}},[r("el-input",{model:{value:e.order.name,callback:function(t){e.order.name=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"联系人手机"}},[r("el-input",{model:{value:e.order.tel,callback:function(t){e.order.tel=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"品牌商"}},[r("el-input",{model:{value:e.order.company_id,callback:function(t){e.order.company_id=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"测量人"}},[r("el-input",{model:{value:e.order.customer_service_id,callback:function(t){e.order.customer_service_id=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"安装人"}},[r("el-input",{model:{value:e.order.facilitator_id,callback:function(t){e.order.facilitator_id=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"状态"}},[r("el-input",{model:{value:e.order.workflow_state,callback:function(t){e.order.workflow_state=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"测量费"}},[r("el-input",{model:{value:e.order.measure_amount,callback:function(t){e.order.measure_amount=t}}})],1),e._v(" "),r("el-form-item",{attrs:{label:"预估总价"}},[r("el-input",{model:{value:e.order.total,callback:function(t){e.order.total=t}}})],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.editSubmit(e.edit_id)}}},[e._v("提交")]),e._v(" "),r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]}},623:function(e,t,r){var a=r(304);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(29)("1ce3a937",a,!0)},95:function(e,t,r){r(623);var a=r(30)(r(196),r(595),"data-v-649f511d",null);e.exports=a.exports}});