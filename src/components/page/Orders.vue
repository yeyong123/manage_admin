<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 订单</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="user-header">
      <el-input class="search" icon="search" v-model="q" :on-icon-click="searchQuery"></el-input>
    </div>
    <el-table :data="orders" border style="width: 100%">
      <el-table-column label="订单号" width="150">
        <template scope="scope">
          <span @click="rowClick(scope.row.id)">{{scope.row.serial_number}}</span>
        </template>
        </el-table-column>
        <el-table-column label="发单人" width="150">
          <template scope="scope">
            {{scope.row.name}}
          </template>
          </el-table-column>
            <el-table-column prop="tel" label="手机" width="170"></el-table-column>
            <el-table-column prop="total" label="预估总价"></el-table-column>
            <el-table-column prop="city" label="所在城市"></el-table-column>
            <el-table-column prop="region" label="渠道"></el-table-column>
            <el-table-column prop="service_info.name" label="接单人"></el-table-column>
            <el-table-column prop="customer_service_info.name" label="测量人"></el-table-column>
                  <el-table-column
                            label="操作"
                            width="120">
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
  </div>

             </template>
<script>
export default {
  data() {
    return {
      orders: [],
      page: {},
      q: "",
    }
  },
  created() {
    this.fetchResource(this.page.next_page);
  },
  methods: {
    fetchResource(page){
      let self = this;
      self.$http.get("orders.json?page=" + page + "&q=" + this.q).then(res => {
        self.orders = res.body.klass;
        self.page = res.body.page;
      }, res => {
        self.$message.error("加载失败");
      })
    },
     handlePage(val){
      this.fetchResource(val);
    },
    rowClick(val){
      this.$router.push("/orders/" + val);
    },
    searchQuery(){
      this.fetchResource(1)
    }

  }
}
</script>


<style scoped>
.search {
  width: 200px;
  float: right;
  margin-bottom: 15px;
}

</style>
