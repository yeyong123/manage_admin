<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>品牌商列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div>
      <el-button type="danger"  class="set_rate" @click="setRate">设置利率</el-button>
    </div>
    <el-table :data="rates" border style="width: 100%">
      <el-table-column prop="rate" label="比值" ></el-table-column>
      <el-table-column prop="year" label="利率类型">
        <template scope="scope">
          <span v-if="scope.row.rate_type === 'year'">
            年化收益率
          </span>
          <span v-else>
            每万份收益率
          </span>
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
        <el-dialog title="设置利率" v-model="dialogVisible">
          <el-form :inline="true" ref="rate" :model="rate" label-width="80px">
            <el-form-item label="比值">
              <el-input v-model="rate.rate"></el-input>
              </el-form-item>
              <el-radio-group v-model="rate.rate_type">
                <el-radio-button label="year">年化收益率</el-radio-button>
                <el-radio-button label="thousand">万份收益率</el-radio-button>
                </el-radio-group>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="rateSubmit(type, edit_id)">提交</el-button>
                  <el-button @click="dialogVisible=false">取消</el-button>
                </span>

                </el-dialog>
  </div>

</template>
<script>
export default {
  data() {
    return {
      rates: [],
      rate: {
        rate_type: "year",
        rate: 0.0
      },
      type: "new",
      edit_id: "",
      dialogVisible: false,
      page: {next_page: 1},
      q: ""
    }
  },
  created() {
    this.fetchResource(this.page.next_page)
  },
  methods: {
    fetchResource(page){
      this.$http.get("rate_profits.json?page=" + page).then(res => {
        this.rates = res.body.klass;
        this.rate.rate_type = res.body.klass[0].rate_type;
        this.rate.rate = res.body.klass[0].rate;
        this.edit_id = res.body.klass[0].id;
        this.page = res.body.page;
      }, res => {
        this.$message.error("加载失败")
      })
    },
    handlePage(val){
      this.fetchResource(val);
    },
    setRate(){
      this.dialogVisible = true;
    },
    rateSubmit(type, id){
      let self = this;
      self.$http.put("rate_profits/" + self.edit_id + ".json", self.rate).then(res => {
        let data = res.body;
        if (data.code > 200) {
          self.$message.error(data.msg);
          return ;
        }
        self.rates = [res.body.klass];
        self.dialogVisible = false;
        self.$message("设置完成");
      })
    }
  }
}
</script>
<style scoped>
.set_rate {
  margin-bottom: 20px;
}
</style>
