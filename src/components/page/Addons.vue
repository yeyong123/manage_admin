<template>
  <div>
    <div class="crumbs">

      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 
          <router-link to="/dashboard">
            主页
            </router-link>
            </el-breadcrumb-item>

            <el-breadcrumb-item><i class="el-icon-setting"></i>插件</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <el-table :data="addons" border style="width: 100%">
      <el-table-column prop="title" label="插件名称"></el-table-column>
        <el-table-column prop="content" label="插件介绍"></el-table-column>
        <el-table-column prop="serial_number" label="编号"></el-table-column>
        <el-table-column prop="nickname" label="别名"></el-table-column>
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
      addons: [],
      page: {next_page: 1}
    }
  },
  created(){
    this.fetchResource(this.page.next_page)
  },
  methods: {
    fetchResource(page){
      this.$http.get("addons.json?page=" + page).then(res => {
        this.addons = res.body.klass;
        this.page = res.body.page;
      })
    },
    handlePage(val) {
      this.fetchResource(val)
    },
  }
}
</script>
