webpackJsonp([18,41],{104:function(e,s,a){a(674);var t=a(31)(a(219),a(632),"data-v-2d1cf237",null);e.exports=t.exports},219:function(e,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={data:function(){return{order:"",server_name:"",measure_name:"",states:["new","appointed_measurement","measured","appointed_installation","installed","confirm_installed","completed","canceled"],prev_state:"",next_state:"",is_appoint:"",node:{max_node:0,n_users:[],p_users:[]}}},created:function(){this.fetchResource()},filters:{orderState:function(e){var s="";switch(e){case"new":s="新订单";break;case"installed":s="已安装";break;case"canceled":s="已取消";break;case"completed":s="已完成";break;case"measured":s="已测量";break;case"appointed_installation":s="预约安装";break;case"appointed_measurement":s="预约测量";break;case"confirm_installed":s="管理员确认安装";break;default:s="已取消"}return s}},methods:{fetchResource:function(){var e=this;e.$http.get("orders/"+e.$route.params.id+".json").then(function(s){e.order=s.body.klass,e.server_name=s.body.klass.service_info.name,e.measure_name=s.body.klass.customer_service_info.name,e.rangeState(s.body.klass.workflow_state),s.body.nodes?(e.node=s.body.nodes,e.is_appoint=!0):e.is_appoint=!1},function(s){e.$message.error("加载失败")})},rangeState:function(e){var s=this.states.length,a=this.states.indexOf(e);0==a?(this.prev_state="new",this.next_state=this.states[a+1]):a+1==s?(this.next_state="canceled",this.prev_state=this.states[a-1]):(this.prev_state=this.states[a-1],this.next_state=this.states[a+1])}}}},332:function(e,s,a){s=e.exports=a(7)(),s.push([e.i,".box-card[data-v-2d1cf237]{padding:0 0 15px;margin:10px 5px 10px 0}.box-card div[data-v-2d1cf237]{margin-bottom:5px}.box-card .process[data-v-2d1cf237]{float:none;width:90%;padding:5px 15px 5px 0;margin-right:20px}.prev_process[data-v-2d1cf237]{color:#ccc}.current_process[data-v-2d1cf237]{color:red}.next_process[data-v-2d1cf237]{color:green}.box-card span[data-v-2d1cf237]{margin-left:20px}.pictures[data-v-2d1cf237]{clear:both;margin-bottom:10px}.pictures img[data-v-2d1cf237]{margin:10px;border:1px solid;padding:5px;width:180px;height:180px;float:left}.pictures ul[data-v-2d1cf237]{list-style:none}hr[data-v-2d1cf237]{clear:both;margin:10px 0;color:#ccc;background-color:#909090}.time[data-v-2d1cf237]{float:right;color:#ccc;font-size:12px}.event p[data-v-2d1cf237]{margin-top:5px}.nodes[data-v-2d1cf237]{width:40%;padding:10px 20px;float:left}.nodes li[data-v-2d1cf237]{margin-top:5px;border-bottom:1px solid #ccc;padding:4px}ul[data-v-2d1cf237]{list-style:none}",""])},632:function(e,s){e.exports={render:function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"table"},[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-menu"}),e._v(" "),a("router-link",{attrs:{to:"/orders"}},[e._v("\n                    订单列表\n                ")])],1),e._v(" "),a("el-breadcrumb-item",[e._v("订单详情")])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",slot:"header"},[a("span",[e._v("基本信息")])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("订单号: "),a("span",[e._v(e._s(e.order.serial_number))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("面积: "),a("span",[e._v(e._s(e.order.square))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("材质: "),a("span",[e._v(e._s(e.order.material))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("品牌商: "),a("span",[e._v(e._s(e.order.company_id))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("品牌商名称: "),a("span",[e._v(e._s(e.order.company_name))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("发单人: "),a("span",[e._v(e._s(e.order.name))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("发单人手机: "),a("span",[e._v(e._s(e.order.tel))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("发单人ID: "),a("span",[e._v(e._s(e.order.customer_id))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("是否品牌商单子: "),a("span",[e._v(e._s(e.order.is_company))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("是否安装单: "),a("span",[e._v(e._s(e.order.mount_order))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("发单日期: "),a("span",[e._v(e._s(e._f("date")(1e3*e.order.created_at,"%Y-%m-%d %T")))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("最后修改日期: "),a("span",[e._v(e._s(e._f("date")(1e3*e.order.updated_at,"%Y-%m-%d %T")))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("预约上门时间: "),a("span",[e._v(e._s(e._f("date")(1e3*e.order.booking_date,"%Y-%m-%d %T")))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e.order.install_date>1?[e._v("\n                        安装时间: "),a("span",[e._v(e._s(e._f("date")(1e3*e.order.install_date,"%Y-%m-%d %T")))])]:[e._v("\n                        安装时间: "),a("span",[e._v("待定")])]],2),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("地址: "),a("span",[e._v(e._s(e.order.address))])])],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",slot:"header"},["new"!=e.order.workflow_state?a("span",{staticClass:"prev_process process"},[e._v("上一个进度:"+e._s(e._f("orderState")(e.prev_state)))]):e._e(),e._v(" "),a("span",{staticClass:"current_process process"},[e._v("当前进度: "+e._s(e._f("orderState")(e.order.workflow_state)))]),e._v(" "),e.order.is_company?["canceled"!=e.next_state?a("span",{staticClass:"next_process process"},[e._v("下一个进度:"+e._s(e._f("orderState")(e.next_state)))]):e._e()]:"installed"==e.order.workflow_state?["canceled"!=e.next_state?a("span",{staticClass:"next_process process"},[e._v("下一个进度:已完成")]):e._e()]:e._e()],2),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("安装工: "),a("span",[e._v(e._s(e.server_name))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("安装工ID: "),a("span",[e._v(e._s(e.order.facilitator_id))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("测量员: "),a("span",[e._v(e._s(e.measure_name))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("测量员ID: "),a("span",[e._v(e._s(e.order.customer_service_id))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("测量费: "),a("span",[e._v(e._s(e.order.measure_amount))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("安装费: "),a("span",[e._v(e._s(e.order.install_amount))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("测量评论: "),a("span",[e._v(e._s(e.order.measure_comment))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("安装评论: "),a("span",[e._v(e._s(e.order.is_comment))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("预估价格: "),a("span",[e._v(e._s(e.order.total))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("最终价格(计算后): "),a("span",[e._v(e._s((e.order.terminal_count/100).toFixed(2)))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("安装工价格(计算后): "),a("span",[e._v(e._s((e.order.service_installed_amount/100).toFixed(2)))])]),e._v(" "),a("el-col",{attrs:{span:12}},[e._v("测量工价格(计算后): "),a("span",[e._v(e._s((e.order.service_measure_amount/100).toFixed(2)))])])],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",slot:"header"},[a("span",[e._v("审核流程")])]),e._v(" "),e.is_appoint&&!e.order.brand_confirm?[[a("p",[e._v("当前所在的节点: 第"+e._s(e.order.level)+"级,  共有"+e._s(e.node.max_node)+"级")]),e._v(" "),a("hr"),e._v(" "),a("div",{staticClass:"nodes p_users"},[a("p",[e._v("上一节点审批人")]),e._v(" "),null==e.node.p_users?[e._v("\n                                还没有人\n                            ")]:e._l(e.node.p_users,function(s){return a("ul",[a("li",[e._v(e._s(s.real_name))])])})],2),e._v(" "),a("div",{staticClass:"nodes n_users"},[a("p",[e._v("下一节点审批人")]),e._v(" "),null==e.node.n_users?[e._v("\n                                没有啦\n                            ")]:e._e(),e._v(" "),e._l(e.node.n_users,function(s){return a("ul",[a("li",[e._v(e._s(s.real_name))])])})],2)]]:[e._v("\n                    无需审核\n                ")]],2)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",slot:"header"},[a("span",[e._v("图纸和附件")])]),e._v(" "),a("div",{staticClass:"measured pictures"},[a("p",[e._v("测量图纸")]),e._v(" "),e._l(e.order.measure_pictures,function(s){return a("ul",[e._l(s,function(e){return[a("li",[a("a",{attrs:{href:e.image.url,target:"_blank"}},[a("img",{attrs:{src:e.image.url}})])])]})],2)})],2),e._v(" "),a("hr"),e._v(" "),a("div",{staticClass:"completed pictures"},[a("p",[e._v("安装图纸")]),e._v(" "),e._l(e.order.completed_pictures,function(e){return a("ul",[a("li",[a("a",{attrs:{href:e.image.url,target:"_blank"}},[a("img",{attrs:{src:e.image.url}})])])])})],2)])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",slot:"header"},[a("span",[e._v("操作日志")])]),e._v(" "),e._l(e.order.order_events,function(s){return a("div",{staticClass:"event"},[a("el-card",{staticClass:"box-card"},[a("p",[e._v(e._s(s.title))]),e._v(" "),a("span",{staticClass:"time"},[e._v(e._s(e._f("date")(1e3*s.created_at,"%Y-%m-%d %T")))]),e._v(" "),a("hr"),e._v(" "),a("p",[e._v("操作人ID "+e._s(s.user_id))])])],1)})],2)],1)],1)],1)},staticRenderFns:[]}},674:function(e,s,a){var t=a(332);"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);a(30)("055d0bb3",t,!0)}});