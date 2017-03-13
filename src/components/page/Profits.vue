<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>品牌商列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
<el-table :data="profits" border style="width: 100%">
  <el-table-column prop="user_id" label="用户" width="120" ></el-table-column>
  <el-table-column label="利率" width="120">
    <template scope="scope">
      {{scope.row.rate / 100.0 }}
    </template>
    </el-table-column>
  <el-table-column label="收益金额">
    <template scope="scope">
      {{scope.row.price / 100.00}}
    </template>
    </el-table-column>
  <el-table-column label="余额">
      <template scope="scope">
        {{scope.row.balance / 100.0}}
      </template>
    </el-table-column>
    <el-table-column label="时间" width="220">
      <template scope="scope">
      {{scope.row.created_at * 1000 | date("%Y-%m-%d %T")}}
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
export default {
  data() {
    return {
      profits: [],
      page: {next_page: 1},
      q: ""
    }
  },
  created() {
    this.fetchResource(this.page.next_page)
  },
  methods: {
    fetchResource(page){
      this.$http.get("profits.json?page=" + page).then(res => {
        this.profits = res.body.klass;
        this.page = res.body.page;
      }, res => {
        this.$message.error("加载失败")
      })
    },
 handlePage(val){
      this.fetchResource(val);
    },

  }
}
</script>
<style scoped>
img {
  width: 80px;
  height:80px;
}
</style>
