<template>
  <div>
    <div class="crumbs">

      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 
          <router-link to="/dashboard">
            主页
            </router-link>
            </el-breadcrumb-item>

            <el-breadcrumb-item><i class="el-icon-setting"></i>节点</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <el-table :data="nodes" border style="width: 100%">
      <el-table-column prop="company_id" label="所属品牌"></el-table-column>
        <el-table-column prop="role.name" label="角色"></el-table-column>
        <el-table-column prop="department.name" label="部门"></el-table-column>
        <el-table-column prop="level" label="层级"></el-table-column>
        <el-table-column prop="rules" label="权限"></el-table-column>
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
      nodes: [],
      page: {next_page: 1}
    }
  },
  created(){
    this.fetchResource(this.page.next_page)
  },
  methods: {
    fetchResource(page){
      this.$http.get("depart_nodes.json?page=" + page).then(res => {
        this.nodes = res.body.klass;
        this.page = res.body.page;
      })
    },
    handlePage(val) {
      this.fetchResource(val)
    },
  }
}
</script>
