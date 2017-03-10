<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>品牌商列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
<el-table :data="companies" border style="width: 100%">
  <el-table-column prop="name" label="名称" ></el-table-column>
  <el-table-column prop="abbr" label="缩写"></el-table-column>
  <el-table-column prop="tel" label="联系人"></el-table-column>
  <el-table-column prop="address" label="地址"></el-table-column>
  <el-table-column label="Logo">
    <template scope="scope">
      <img :src="scope.row.logo" />
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
      companies: [],
      page: {next_page: 1},
      q: ""
    }
  },
  created() {
    this.fetchResource(this.page.next_page)
  },
  methods: {
    fetchResource(page){
      this.$http.get("companies.json?page=" + page).then(res => {
        this.companies = res.body.klass;
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
