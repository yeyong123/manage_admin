<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 
           <router-link to="/dashboard">
           主页
           </router-link>
           </el-breadcrumb-item>

        <el-breadcrumb-item>财务交易</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
 <el-table :data="payments" border style="width: 100%">
  <el-table-column prop="order_num" label="交易编号" width="170"></el-table-column>
  <el-table-column prop="order_id" label="订单ID"></el-table-column>
  <el-table-column prop="user_id" label="用户"></el-table-column>
  <el-table-column prop="origin_id" label="交易对象"></el-table-column>
  <el-table-column label="交易金额">
      <template scope="scope">
        {{scope.row.price / 100.0}}
      </template>
    </el-table-column>
  <el-table-column prop="trade_type" label="类型" :formatter="tradeType"></el-table-column>
  <el-table-column prop="trade_status" label="交易状态" :formatter="tradeStatus"></el-table-column>
  <el-table-column prop="pay_type" label="交易渠道" :formatter="payType"></el-table-column>
  <el-table-column prop="title" label="描述" width="220"></el-table-column>
            </el-table>
 <div class="pagination">
                      <el-pagination
                         layout="prev, pager, next"
                         @current-change="handlePage"
                         :current-page="page.current_page"
                         :page-size=25
                         :total="page.total_count">
                        </el-pagination>
                    </div>

  </div>

</template>
<script>
export default {
  data() {
    return {
      payments: [],
      page: {},
      q: ""
    }
  },
  created() {
    this.fetchResource(this.page.next_page)
  },
  methods: {
    fetchResource(page){
      this.$http.get("payments.json?page=" + page).then(res => {
        this.payments= res.body.klass;
        this.page = res.body.page;
      }, res => {
        this.$message.error("加载失败")
      })
    },
     handlePage(val){
      this.fetchResource(val);
    },
     tradeType(row, col) {
       let name = "";
       switch(row.trade_type) {
         case "income":
           name = "收入"
             break;
         case "expense":
           name = "支出"
             break;
       }
       return name;
     },
     tradeStatus(row, col){
      let name = "";
      switch(row.trade_status){
        case "locked":
          name = "锁定"
          break;
          case "complete":
          name = "交易完成"
            break;
          case "cancel":
          name = "取消"
            break;
          case "new":
          name = "新交易"
            break;
          case "pending":
          name = "交易中..."
            break;
      }
      return name;
     },
     payType(row, col){
      let name = "";
      switch(row.pay_type){
        case "local":
          name = "站内交易"
            break;
          case "finace_pay":
          name = "财务转账"
            break;
          case "refund":
          name = "已退款"
            break;
          case "alipay_pc_direct":
          name  = "网页支付宝"
            break;
          case "alipay_wap":
          name = "手机支付宝"
            break;
          case "wx_pub":
          name = "公众号支付"
            break;
      }
      return name;
     }

  }
}
</script>
