<template>
  <div>
   <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <img class="user-logo" :src="company.logo">
          {{company.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <ul>
      <li>
        地址: {{company.address}}
      </li>
   <li>
        缩写: {{company.abbr}}
      </li>
   <li>
        插件: {{company.addons}}
      </li>
   <li>
        联系方式: {{company.tel}}
      </li>

    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      company: ""
    }
  },
  created() {
    this.fetchResource()
  },
  methods: {
    fetchResource(){
      let self = this;
      self.$http.get("companies/" + self.$route.params.id +".json").then(res => {
        self.company = res.body.klass;
      }, res => {
        self.$message.error("加载失败");
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
