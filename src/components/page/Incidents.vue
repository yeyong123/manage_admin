<template>
  <div>
    <div class="crumbs">

      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 
          <router-link to="/dashboard">
            主页
            </router-link>
            </el-breadcrumb-item>

            <el-breadcrumb-item><i class="el-icon-setting"></i>订单附加费</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <el-table :data="incidents" border style="width: 100%">
      <el-table-column prop="order_id" label="订单号"></el-table-column>
      <el-table-column label="金额" sortable>
        <template scope="scope">
          <div class="detail">{{scope.row.price / 100.0}}</div>
        </template>
        </el-table-column>

        <el-table-column prop="title" label="名称"></el-table-column>
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
      incidents: [],
      page: {next_page: 1}
    }
  },
  created(){
    this.fetchResource(this.page.next_page)
  },
  methods: {
    fetchResource(page){
      this.$http.get("incidentals.json?page=" + page).then(res => {
        this.incidents = res.body.klass;
        this.page = res.body.page;
      })
    },
    handlePage(val) {
      this.fetchResource(val)
    },
  }
}
</script>
