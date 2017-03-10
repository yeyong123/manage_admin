webpackJsonp([20,27],{196:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{payments:[],page:{},q:""}},created:function(){this.fetchResource(this.page.next_page)},methods:{fetchResource:function(e){var t=this;this.$http.get("payments.json?page="+e).then(function(e){t.payments=e.body.klass,t.page=e.body.page},function(e){t.$message.error("加载失败")})},handlePage:function(e){this.fetchResource(e)},tradeType:function(e,t){var a="";switch(e.trade_type){case"income":a="收入";break;case"expense":a="支出"}return a},tradeStatus:function(e,t){var a="";switch(e.trade_status){case"locked":a="锁定";break;case"complete":a="交易完成";break;case"cancel":a="取消";break;case"new":a="新交易";break;case"pending":a="交易中..."}return a},payType:function(e,t){var a="";switch(e.pay_type){case"local":a="站内交易";break;case"finace_pay":a="财务转账";break;case"refund":a="已退款";break;case"alipay_pc_direct":a="网页支付宝";break;case"alipay_wap":a="手机支付宝";break;case"wx_pub":a="公众号支付"}return a}}}},600:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[e._v("财务交易")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.payments,border:""}},[a("el-table-column",{attrs:{prop:"order_num",label:"交易编号",width:"170"}}),e._v(" "),a("el-table-column",{attrs:{prop:"order_id",label:"订单ID"}}),e._v(" "),a("el-table-column",{attrs:{prop:"user_id",label:"用户"}}),e._v(" "),a("el-table-column",{attrs:{prop:"origin_id",label:"交易对象"}}),e._v(" "),a("el-table-column",{attrs:{label:"交易金额"},scopedSlots:e._u([["default",function(t){return[e._v("\n       "+e._s(t.row.price/100)+"\n     ")]}]])}),e._v(" "),a("el-table-column",{attrs:{prop:"trade_type",label:"类型",formatter:e.tradeType}}),e._v(" "),a("el-table-column",{attrs:{prop:"trade_status",label:"交易状态",formatter:e.tradeStatus}}),e._v(" "),a("el-table-column",{attrs:{prop:"pay_type",label:"交易渠道",formatter:e.payType}}),e._v(" "),a("el-table-column",{attrs:{prop:"title",label:"描述",width:"220"}})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":e.page.current_page,"page-size":25,total:e.page.total_count},on:{"current-change":e.handlePage}})],1)],1)},staticRenderFns:[]}},95:function(e,t,a){var r=a(29)(a(196),a(600),null,null);e.exports=r.exports}});