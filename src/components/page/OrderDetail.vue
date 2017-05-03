<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 
          <router-link to="/orders">
            订单列表
            </router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <ul>
      <li>订单号: {{order.serial_number}}</li>
      <li>面积: {{order.square}}</li>
      <li>材质: {{order.material}}</li>
      <li>是否安装单: {{order.mount_order}}</li>
      <li>发单人: {{order.name}}</li>
      <li>联系方式: {{order.tel}}</li>
      <li>地址: {{order.address}}</li>
      <li>预估总价: {{order.total}}</li>
      <li>测量费: {{order.measure_amount}}</li>
      <li>品牌商: {{order.company_name}}</li>
      <li>测量时间: {{order.booking_date}}</li>
      <li>安装时间: {{order.install_date}}</li>
      <li>安装人: {{server_name}}</li>
      <li>测量人: {{measure_name}}</li>
      <li>是否品牌商订单: {{order.is_company}}</li>
      <li>当前进度: {{order.workflow_state}}</li>
      <li>品牌商审核: {{order.brand_confirm}}</li>
    </ul>
  </div>
</template>
<script>
export default{
  data(){
    return {
      order: "",
      server_name: "",
      measure_name: ""
    }
  },
  created() {
    this.fetchResource()
  },
  methods: {
    fetchResource(){
      let self = this;
      self.$http.get("orders/" + self.$route.params.id + ".json").then(res => {
        self.order = res.body.klass;
        self.server_name = res.body.klass.service_info.name;
        self.measure_name = res.body.klass.customer_service_info.name;
      }, res => {
        self.$message.error("加载失败");
      })
    }
  }
}
</script>
