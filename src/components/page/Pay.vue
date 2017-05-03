<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>提现列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="tag-ele">
      <span v-show="completed" @click="complete_recipients('pending')">
        <el-tag class="tag" type="primary">待处理</el-tag>
      </span>

      <span v-show="!completed" @click="complete_recipients('completed')">
        <el-tag class="tag" type="primary">已处理的提现</el-tag>
      </span>
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
                    <span v-if="!completed" @click="batch_pay(scope.row.id, scope.$index)" class="el-button el-button--danger">确认已经支付</span>
                    <span v-if="completed">已完成</span>
                  </template>
                  </el-table-column>
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
export default{
  data() {
    return {
      recipients: [],
      completed: false,
      type: "pending",
      page: {next_page: 1}
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
      },
      complete_recipients(type, page) {
        let self = this;
        this.$http.get("recipients?type=" + type + "&page=" + page).then(res => {
          let data = res.body;
          self.recipients = data.klass;
          self.page = data.page;
          if (type == "completed") {
            self.completed = true;
            self.type = type;
          } else {
            self.type = type;
            self.completed = false;
          }
        })
      },
      handlePage(val) {
        this.complete_recipients(this.type, val)
      },

  }
}
</script>
<style scoped>
.tag {
  margin: 4px;
  float: right;
  cursor: pointer;
}
</style>
