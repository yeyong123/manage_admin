<template>
  <div>
    <div class="crumbs">

      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 
          <router-link to="/dashboard">
            主页
            </router-link>
            </el-breadcrumb-item>

            <el-breadcrumb-item><i class="el-icon-setting"></i>冻结/封存资金库</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <el-table :data="pools" border style="width: 100%">
      <el-table-column prop="charge" label="订单号"></el-table-column>
      <el-table-column label="金额" sortable>
        <template scope="scope">
          <div class="detail">{{scope.row.price / 100.0}}</div>
        </template>
        </el-table-column>

        <el-table-column prop="from_user_id" label="支付人"></el-table-column>
        <el-table-column prop="to_user_id" label="接受人"></el-table-column>
        <el-table-column prop="days" label="封存天数"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
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
  data(){
    return {
      pools: [],
      page: {next_page: 1}
    }
  },
  created(){
    this.fetchResource(this.page.next_page)
  },
  methods: {
    fetchResource(page){
      this.$http.get("capital_pools.json?page=" + page).then(res => {
        this.pools = res.body.klass;
        this.page = res.body.page;
      })
    },
    handlePage(val) {
      this.fetchResource(val)
    },
  }
}
</script>
