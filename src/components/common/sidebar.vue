<template>
  <div class="sidebar">
    <el-menu default-active class="el-menu-vertical-demo" theme="dark" unique-opened router>
      <el-menu-item index="/dashboard">
        <i class="el-icon-setting"></i>控制台
        </el-menu-item>
        <el-menu-item index="/audit">
          <i class="el-icon-information"></i>审核列表
          </el-menu-item>
          <el-menu-item index="/users">
            <i class="el-icon-share"></i>用户列表
            </el-menu-item>
            <el-menu-item index="/orders">
              <i class="el-icon-menu"></i>订单列表
              </el-menu-item>
              <el-menu-item index="/payments">
                <i class="el-icon-document"></i>财务报表
                </el-menu-item>
                <el-menu-item index="/companies">
                  <i class="el-icon-minus"></i>品牌管理
                  </el-menu-item>

                  <el-submenu index="1">
                    <template slot="title"><i class="el-icon-more"></i>附加工具</template>
                    <el-menu-item index="/mail">邮件/短信状态</el-menu-item>
                    <el-menu-item index="/libs">材料库</el-menu-item>
                    <el-menu-item index="/admins">管理员管理</el-menu-item>
                    <el-menu-item index="/invoices">待开票</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">

                      <template slot="title"><i class="el-icon-document"></i>提现</template>
                      <el-menu-item index="/encashs">提现列表</el-menu-item>
                      </el-submenu>

                      <el-submenu index="3">

                      <template slot="title"><i class="el-icon-information"></i>税费/收益设置</template>
                      <el-menu-item index="/rate">设置税费/利率收益</el-menu-item>
                      <el-menu-item index="/profits">收益列表</el-menu-item>
                      </el-submenu>


                      <el-submenu index="8">
                        <template slot="title"><i class="el-icon-menu"></i>表格</template>
                        <el-menu-item index="basetable">基础表格</el-menu-item>
                        <el-menu-item index="vuetable">Vue表格组件</el-menu-item>
                        </el-submenu>
                        <el-submenu index="9">
                          <template slot="title"><i class="el-icon-date"></i>表单</template>
                          <el-menu-item index="baseform">基本表单</el-menu-item>
                          <el-menu-item index="vueeditor">编辑器</el-menu-item>
                          <el-menu-item index="markdown">markdown</el-menu-item>
                          <el-menu-item index="upload">文件上传</el-menu-item>
                          </el-submenu>
                          <el-submenu index="10">
                            <template slot="title"><i class="el-icon-star-on"></i>图表</template>
                            <el-menu-item index="basecharts">基础图表</el-menu-item>
                            <el-menu-item index="mixcharts">混合图表</el-menu-item>
                            </el-submenu>
                            </el-menu>
  </div>
</template>
<script>
export default {
  computed:{
    onRoutes(){
      return this.$route.path.replace('/','');
    }
  }
}
</script>
<style scoped>
.sidebar{
  display: block;
  position: absolute;
  width: 230px;
  left: 0;
  top: 70px;
  bottom:0;
  background: #2E363F;
  overflow: auto;
}
    .sidebar > ul {
      height:100%;
    }
</style>
