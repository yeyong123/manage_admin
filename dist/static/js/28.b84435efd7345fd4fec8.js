webpackJsonp([28,39],{104:function(e,r,_){var s=_(31)(_(216),_(620),null,null);e.exports=s.exports},216:function(e,r,_){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default={data:function(){return{order:"",server_name:"",measure_name:""}},created:function(){this.fetchResource()},methods:{fetchResource:function(){var e=this;e.$http.get("orders/"+e.$route.params.id+".json").then(function(r){e.order=r.body.klass,e.server_name=r.body.klass.service_info.name,e.measure_name=r.body.klass.customer_service_info.name},function(r){e.$message.error("加载失败")})}}}},620:function(e,r){e.exports={render:function(){var e=this,r=e.$createElement,_=e._self._c||r;return _("div",{staticClass:"table"},[_("div",{staticClass:"crumbs"},[_("el-breadcrumb",{attrs:{separator:"/"}},[_("el-breadcrumb-item",[_("i",{staticClass:"el-icon-menu"}),e._v(" "),_("router-link",{attrs:{to:"/orders"}},[e._v("\n          订单列表\n          ")])],1),e._v(" "),_("el-breadcrumb-item",[e._v("订单详情")])],1)],1),e._v(" "),_("ul",[_("li",[e._v("订单号: "+e._s(e.order.serial_number))]),e._v(" "),_("li",[e._v("面积: "+e._s(e.order.square))]),e._v(" "),_("li",[e._v("材质: "+e._s(e.order.material))]),e._v(" "),_("li",[e._v("是否安装单: "+e._s(e.order.mount_order))]),e._v(" "),_("li",[e._v("发单人: "+e._s(e.order.name))]),e._v(" "),_("li",[e._v("联系方式: "+e._s(e.order.tel))]),e._v(" "),_("li",[e._v("地址: "+e._s(e.order.address))]),e._v(" "),_("li",[e._v("预估总价: "+e._s(e.order.total))]),e._v(" "),_("li",[e._v("测量费: "+e._s(e.order.measure_amount))]),e._v(" "),_("li",[e._v("品牌商: "+e._s(e.order.company_name))]),e._v(" "),_("li",[e._v("测量时间: "+e._s(e.order.booking_date))]),e._v(" "),_("li",[e._v("安装时间: "+e._s(e.order.install_date))]),e._v(" "),_("li",[e._v("安装人: "+e._s(e.server_name))]),e._v(" "),_("li",[e._v("测量人: "+e._s(e.measure_name))]),e._v(" "),_("li",[e._v("是否品牌商订单: "+e._s(e.order.is_company))]),e._v(" "),_("li",[e._v("当前进度: "+e._s(e.order.workflow_state))]),e._v(" "),_("li",[e._v("品牌商审核: "+e._s(e.order.brand_confirm))])])])},staticRenderFns:[]}}});