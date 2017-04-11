<template>
  <div>
    <div class="crumbs">

      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 
          <router-link to="/dashboard">
            主页
            </router-link>
            </el-breadcrumb-item>

            <el-breadcrumb-item>API用户</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <el-table :data="users" border style="width: 100%">
      <el-table-column prop="name" label="用户名称"></el-table-column>
        <el-table-column prop="api_type" label="角色" width="120"></el-table-column>
        <el-table-column prop="refersh_name" label="访问源" width="120"></el-table-column>
        <el-table-column prop="token" label="Token" width="250" :formatter="truncate"></el-table-column>
        <el-table-column prop="api_key" label="KEY" width="250" :formatter="truncate">
          </el-table-column>
        <el-table-column prop="visits_count" label="访问次数"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button @click="rowClick(scope.row.id)" type="text" size="small">查看</el-button>
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
        <el-dialog title="查看详细" v-model="dialogVisible">
          <div class="pall">
            <p>用户: {{user.name}}</p>
            <p>电话: {{user.tel}}</p>
            <p>IP: {{user.remote_ip}}</p>
            <hr>
            <p style="width: 100%; word-wrap:break-word;">Key: {{user.api_key}}</p>
            <hr>
            <p>Token: {{user.token}}</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="shuffle_key(user.id)">重新生成Key和Token</el-button>
            <el-button @click="dialogVisible=false">关闭</el-button>
          </span>
          </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return {
      users: [],
      page: {next_page: 1},
      dialogVisible: false,
      user: {},
    }
  },
  created(){
    this.fetchResource(this.page.next_page)
  },
    truncate: function(string, value) {
      return string.substring(0, value) + "..."
  },
  methods: {
    fetchResource(page){
      this.$http.get("api_users.json?page=" + page).then(res => {
        this.users = res.body.klass;
        this.page = res.body.page;
      })
    },
    handlePage(val) {
      this.fetchResource(val)
    },
    rowClick(id){
      let self = this;
      self.dialogVisible = true;
      self.users.forEach(function(e, i){
        if (id === e.id){
          self.user = e;
          return;
        }
      })
    },
    shuffle_key(id){
      this.$http.post("api_users/shuffle_key.json", {id: id}).then(res => {
        this.user = res.body.user;
        this.$message("生成成功");
      })
    },
    truncate(row, col) {
      return row.api_key.substring(0, 20) + "..."
  },

  }
}
</script>
<style scoped>
.pall {
  padding: 4px;
}
.pall hr {
  margin-top: 4px;
}
.pall p {
  padding: 10px;
}
</style>

