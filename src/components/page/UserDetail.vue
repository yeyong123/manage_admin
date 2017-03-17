<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <img class="user-logo" :src="user.headimg.url">
          {{user.real_name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <ul>
      <li>手机: {{user.tel}}</li>
      <li>余额: {{user.amount / 100.0}}</li>
      <li>邮箱: {{user.email}}</li>
      <li>角色: {{user.role}}</li>
      <li>品牌商: {{user.company_id}}</li>
      <li>我的订单数: {{user.orders_count}}</li>
      <li>加入时间: {{user.created_at}}</li>
    </ul>
    <div class="block">
      <el-button type="text" @click="deleteUser">删除</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: ""
    }
  },
  created() {
    this.fetchResource();
  },
  methods: {
    fetchResource(){
      let self = this;
      self.$http.get("users/" + self.$route.params.id + ".json").then(res => {
        self.user = res.body.klass
      }, res => {
        self.$message.error("加载失败");
      })
    },
    deleteUser(){
      let self = this;
      self.$confirm("删除之后不能恢复, 确认删除?", "删除用户?", {
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
        type: "danger"
      }).then(() => {
        self.$http.delete("users/" + self.$route.params.id + ".json").then(res => {
          if (res.body.code === 200) {
            self.$message({
              type: 'success',
              message: "删除成功"
            });
window.history.back();
          } else {
            self.$message.error("无效的操作");
          }
        }, res => {
          self.$message.error("连接断开");
        })
      })
    }
  }
}
</script>
<style scoped>
.crumbs {
}
.user-logo{
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

</style>
