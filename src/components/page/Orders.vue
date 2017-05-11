<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
 <el-breadcrumb-item><i class="el-icon-menu"></i> 
           <router-link to="/dashboard">
           主页
           </router-link>
           </el-breadcrumb-item>

        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="user-header">
      <form>
        <el-input class="search" v-model="q" placeholder="订单号或手机号"></el-input>
         <el-date-picker
      v-model="time"
      type="datetimerange"
      :picker-options="pickerOptions2"
      placeholder="选择时间范围"
      format="yyyy-MM-dd HH:mm:ss"
     range-separator="/" 
      align="right">
    </el-date-picker>
        <el-select
         v-model="facilitator_id"
         filterable
         remote
         placeholder="安装师傅"
         :remote-method="remoteUser"
         :loading="loading">
          <el-option
         v-for="item in service_users"
         :key="item.real_name"
         :label="item.real_name"
         :value="item.id">
            </el-option>
            </el-select>
             <el-select
         v-model="customer_service_id"
         filterable
         remote
         placeholder="测量师傅"
         :remote-method="remoteUser2"
         :loading="loading">
          <el-option
         v-for="item in measured_users"
         :key="item.real_name"
         :label="item.real_name"
         :value="item.id">
            </el-option>
            </el-select>
            <el-select v-model="workflow_state" placeholder="选择状态">
    <el-option
      v-for="item in states"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
 <el-button type="primary" @click="searchQuery">搜索</el-button>

      </form>
    </div>
    <p>共: {{page.total_count}}</p>
    <el-table :data="orders" border>
      <el-table-column label="订单号">
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
          <el-table-column prop="workflow_state" label="进度" :formatter="orderState"></el-table-column>
          <el-table-column label="安装人">
              <template scope="scope">
                <a :link="{name: 'users', params: {id: scope.row.facilitator_id}}">{{scope.row.service_info.name}}</a>
              </template>
            </el-table-column>
          <el-table-column prop="customer_service_info.name" label="测量人"></el-table-column>
          <el-table-column
                                                             label="操作"
                                                             width="160">
            <template scope="scope">
              <el-button @click="rowClick(scope.row.id)" type="text" size="small">查看</el-button>
              <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
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
            <el-dialog title="订单处理" v-model="dialogVisible">
              <el-form :inline="true" ref="order" :model="order" label-width="120px">
                <el-form-item label="订单号">
                  <el-input v-model="order.serial_number" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="面积">
                    <el-input v-model="order.square"></el-input>
                    </el-form-item>

                    <el-form-item label="省">
                      <el-input v-model="order.province"></el-input>
                      </el-form-item>
                      <el-form-item label="市">
                        <el-input v-model="order.city"></el-input>
                        </el-form-item>
                        <el-form-item label="区">
                          <el-input v-model="order.area"></el-input>
                          </el-form-item>
                          <el-form-item label="街道">
                            <el-input v-model="order.street"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人">
                              <el-input v-model="order.name"></el-input>
                              </el-form-item>

                              <el-form-item label="联系人手机">
                                <el-input v-model="order.tel"></el-input>
                                </el-form-item>
                                <el-form-item label="品牌商">
                                  <el-input v-model="order.company_id"></el-input>
                                  </el-form-item>

                                  <el-form-item label="测量人">
                                    <el-input v-model="order.customer_service_id"></el-input>
                                    </el-form-item>
                                    <el-form-item label="安装人">
                                      <el-input v-model="order.facilitator_id"></el-input>
                                      </el-form-item>
                                      <el-form-item label="状态">
                                        <el-input v-model="order.workflow_state"></el-input>
                                        </el-form-item>
                                        <el-form-item label="测量费">
                                          <el-input v-model="order.measure_amount"></el-input>
                                          </el-form-item>

                                          <el-form-item label="预估总价">
                                            <el-input v-model="order.total"></el-input>
                                            </el-form-item>
                                            </el-form>
                                            <span slot="footer" class="dialog-footer">
                                              <el-button type="primary" @click="editSubmit(edit_id)">提交</el-button>
                                              <el-button @click="dialogVisible=false">取消</el-button>
                                            </span>

                                            </el-dialog>
  </div>

</template>
<script>
export default {
  data() {
    return {
      orders: [],
      page: {next_page: 0, total_count: 0, current_page: 0},
      order: {},
      workflow_state: "",
      edit_id: "",
      dialogVisible: false,
      q: "",
      state: "",
      company_id: "",
      company_list: [],
      start_time: "",
      end_time: "",
      current_action: "search",
      facilitator_id: "",
      customer_service_id: '',
      service_users: [],
      measured_users: [],
      loading: false,
      states: [
        {value: null, label: "选择状态"},
        {value: "new", label: "新订单"},
        {value: "appointed_measurement", label: "预约测量"},
        {value: "measured", label: "已测量"},
        {value: "appointed_installation", label: "预约安装"},
        {value: "installed", label: "已安装"},
        {value: "confirm_installled", label: "确认安装"},
        {value: "completed", label: "已完成"},
        {value: "canceled", label: "已取消"},
      ],
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      time: [],
    }
  },
  created() {
    this.fetchResource(this.page.next_page);
  },
  methods: {
    fetchResource(page){
      let self = this;
      self.current_action = "index"
      self.$http.get("orders.json?page=" + page).then(res => {
        self.orders = res.body.klass;
        self.page = res.body.page;
      }, res => {
        self.$message.error("加载失败");
      })
    },
      handlePage(val){
        if (this.current_action === 'search') {
          let args = {
            keyword: this.q,
            facilitator_id: this.facilitator_id,
            customer_service_id: this.customer_service_id,
            workflow_state: this.workflow_state,
            page: page.current_page,
            time: this.conver_time(this.time)
          }
          this.fetchSearch(args)
        } else {
          this.fetchResource(val);
        }
      },
      rowClick(val){
        this.$router.push("/orders/" + val);
      },
      searchQuery(){
        this.current_action = "search"
        let args = {
          keyword: this.q,
          facilitator_id: this.facilitator_id,
          customer_service_id: this.customer_service_id,
          workflow_state: this.workflow_state,
          time: this.conver_time(this.time)
        }
        this.fetchSearch(args)
      },
      fetchSearch(args) {
        this.$http.post("orders/search_orders", args).then(res => {
          this.orders = res.body.klass;
          this.page = res.body.page;
        })
      },
      conver_time(time) {
        return this.time.map(item => new Date(item).getTime() / 1000)
      },
    edit(id){
      let self = this;
      self.orders.forEach(function(order, index){
        if(id == order.id) {
          self.order = order;
          self.edit_id = id;
          return;
        }
      });
      self.dialogVisible = true;
    },
    editSubmit(id){
      let form = new FormData();
      let self = this;
      for (var o in self.orde) {
        form.append(o, self.order[o]);
      }
      self.$http.put("orders/" + self.edit_id + ".json", form).then(res => {
        let data = res.body;
        if (data.code > 200) {
          self.$message.error(data.msg);
          return;
        }
        self.$message("修改完成");
        self.dialogVisible = false;
      }, res => {
        self.$message.error("加载失败");
      })
    },
       remoteUser2(query) {
      if(query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$http.get("orders/users?keyword=" + query).then(res => {
            this.measured_users = res.body.users;
          });
        }, 500);
      } else {
        this.customer_service_id= "";
        this.measured_users = [];
      }
    },

    remoteUser(query) {
      if(query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$http.get("orders/users?keyword=" + query).then(res => {
            this.service_users = res.body.users;
          });
        }, 500);
      } else {
        this.facilitator_id = "";
        this.service_users = [];
      }
    },
    orderState(row, col){
      let state = "";
      switch(row.workflow_state){
        case "new":
          state = "新订单"
          break;
        case "installed":
          state = "已安装";
          break;
        case "canceled":
          state = "已取消";
          break;
        case "completed":
          state = "已完成";
          break;
        case "measured":
          state = "已测量";
          break;
        case "appointed_installation":
          state = "预约安装";
          break;
        case "appointed_measurement":
          state = "预约测量";
          break;
        default:
          state = "已取消";
      }
      return state;
    }
  }
}
</script>


<style scoped>
.search {
  width: 200px;
  margin-bottom: 15px;
}

</style>
