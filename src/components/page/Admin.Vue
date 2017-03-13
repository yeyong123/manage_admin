<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>品牌商列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
<el-table :data="admins" border style="width: 100%">
  <el-table-column prop="name" label="管理员" ></el-table-column>
  <el-table-column prop="email" label="邮箱"></el-table-column>
  <el-table-column prop="phone" label="手机"></el-table-column>
  <el-table-column prop="role" label="角色"></el-table-column>
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
      admins: [],
      page: {next_page: 1},
      q: ""
    }
  },
  created() {
    this.fetchResource(this.page.next_page)
  },
  methods: {
    fetchResource(page){
      this.$http.get("admins.json?page=" + page).then(res => {
        this.admins = res.body.klass;
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
