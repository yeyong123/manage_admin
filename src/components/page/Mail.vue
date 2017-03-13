<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>品牌商列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
<el-table :data="mails" border style="width: 100%">

  <el-table-column label="接受人">
      <template scope="scope">
        <span v-if="scope.row.send_type === 'tel'">
          {{scope.row.address}}
        </span>
          <span v-else>
            {{scope.row.email}}
          </span>
      </template>
    </el-table-column>
  <el-table-column prop="events" label="发送状态"></el-table-column>
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
      mails: [],
      page: {next_page: 1},
      q: ""
    }
  },
  created() {
    this.fetchResource(this.page.next_page)
  },
  methods: {
    fetchResource(page){
      this.$http.get("mail_states.json?page=" + page).then(res => {
        this.mails = res.body.klass;
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
