<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>提现列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-table :data="recipients" border>
      <el-table-column label="生成时间" width="300">
        <template scope="scope">
          {{scope.row.created_at * 1000 | date("%Y-%m-%d %T")}}
        </template>
        </el-table-column>
        <el-table-column label="金额" width="250">
          <template scope="scope">
            {{(scope.row.amount / 100.00).toFixed(2)}}
          </template>
          </el-table-column>
          
          <el-table-column label="提现的用户">
            <template scope="scope">
              {{scope.row.name}}
            </template>
            </el-table-column>
             <el-table-column label="提现渠道">
              <template scope="scope">
                {{scope.row.channel_type | conver}}
              </template>
              </el-table-column>

            <el-table-column label="提现到账户">
              <template scope="scope">
                {{scope.row.account}}
              </template>
              </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <span @click="batch_pay(scope.row.id, scope.$index)" class="el-button el-button--danger">确认已经支付</span>
              </template>
              </el-table-column>
              </el-table>


  </div>

</template>
<script>
export default{
  data() {
    return {
      recipients: [],
      page: {next_page: null}
    }
  },
  created() {
    this.fetchResource(this.page.next_page)
  },
  filters: {
    conver(val) {
      let v = "";
      switch(val) {
        case "alipay":
          v = "支付宝";
          break;
        case "wx_pub":
          v = "公众号"
          break;
        case "bank":
          v = "银行卡"
          break;
        default:
          v = "支付宝";
      }
      return v
    }
  },

  methods: {
     fetchResource(page) {
      let self = this;
       self.$http.get("recipients.json?page=" + page).then(res => {
         self.recipients = res.body.klass;
         self.page = res.body.page;
       }, res => {
         self.$message.error("加载失败");
       })
     },
      batch_pay(id, index) {
         this.$http.post("encashments/" + id + "/recipient.json", {type: this.type}).then(res => {
          let data = res.body
          if (data.code == 200) {
            this.recipients.splice(index, 1);
            this.$message("处理完成");
            if (this.recipients.length <= 0) {
              this.$http.post("encashments/" + id + "/close_encash.json", {}).then(res =>{
                if (res.body.code == 200) {
                  this.$message("哇塞! 都处理完了, 好棒啊!");
                }
              })
            }
          }
        })
      } 
  }
}
</script>
