<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 
           <router-link to="/dashboard">
           主页
           </router-link>
           </el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="user-header">
      <el-button type="text" @click="addLib">添加材料</el-button>
      <el-input class="search" icon="search" v-model="text_q" :on-icon-click="searchQuery"></el-input>
    </div>
    <el-table :data="users" border style="width: 100%">
      <el-table-column label="id" width="120">
        <template scope="scope">
          <span @click="rowClick(scope.row)">{{scope.row.id}}</span>
        </template>
        </el-table-column>
        <el-table-column label="头像" width="150">
          <template scope="scope">
            <img class="headimg" :src="scope.row.headimg.url" @error="defaultImg" />
          </template>
          </el-table-column>
          <el-table-column prop="real_name" label="姓名">
            </el-table-column>
            <el-table-column prop="tel" label="手机">
              </el-table-column>
              <el-table-column label="角色">
                <template scope="scope">
                  <span v-if="scope.row.role == 1">品牌商</span>
                  <span v-else-if="scope.row.role == 2">服务商</span>
                  <span v-else>普通用户</span>
                </template>
                </el-table-column>
                <el-table-column label="所属品牌">
                  <template scope="scope">
                    <span @click="handleCompany(scope.row.company_id)">{{scope.row.company_id}}</span>
                  </template>
                  </el-table-column>
                  <el-table-column label="加入时间" width="220">
                    <template scope="scope">
                      {{scope.row.created_at * 1000 | date("%Y-%m-%d %T")}}
                    </template>
                    </el-table-column>

                  <el-table-column
                            label="操作"
                            width="180">
                    <template scope="scope">
                      <el-button @click="rowClick(scope.row)" type="primary" size="small">查看</el-button>
                      <el-button @click="editUser(scope.row.id)" type="text" size="small">编辑</el-button>
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
                    <el-dialog title="操作用户" v-model="dialogVisible">
                      <el-form :inline="true" ref="user" :model="user" label-width="80px" enctype="multipart/form-data">
                        <el-form-item label="真实姓名">
                          <el-input v-model="user.real_name"></el-input>
                          </el-form-item>
                          <el-form-item label="手机">
                            <el-input v-model="user.tel"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                              <el-input v-model="user.password" type="password"></el-input>
                              </el-form-item>
                              <el-form-item label="邮箱">
                                <el-input v-model="user.email"></el-input>
                                </el-form-item>
                                <el-form-item label="品牌商">
                                  <el-input v-model="user.company_id"></el-input>
                                  </el-form-item>
                                  <el-form-item label="角色">
                                    <el-select v-model="user.role" placeholder="选择角色">
                                      <el-option label="普通用户" value=0></el-option>
                                      <el-option label="服务商" value=2></el-option>
                                      <el-option label="品牌商" value=1></el-option>
                                      </el-select>
                                      </el-form-item>
                                        <el-form-item label="权限">
                                    <el-select v-model="user.user_type" placeholder="选择权限">
                                      <el-option label="普通用户" value="user"></el-option>
                                      <el-option label="技术" value="tech"></el-option>
                                      <el-option label="财务" value="finance"></el-option>
                                      <el-option label="客服" value="server"></el-option>
                                      <el-option label="商务" value="business"></el-option>
                                      <el-option label="出纳" value="cashier"></el-option>
                                      <el-option label="超级用户" value="super"></el-option>
                                      <el-option label="管理员" value="manager"></el-option>
                                      </el-select>
                                      </el-form-item>

                                      <el-form-item label="审核" prop="audit">
                                        <el-switch on-text="" off-text="" v-model="user.audit"></el-switch>
                                        </el-form-item>
                                        <el-form-item label="头像">
                                          <input type="file" @change="uploadImage"></input>
                                          </el-form-item>

                                          </el-form>
                                          <span slot="footer" class="dialog-footer">
                                            <el-button type="primary" @click="userSubmit(type, edit_id)">提交</el-button>
                                            <el-button @click="dialogVisible=false">取消</el-button>
                                          </span>
                                          </el-dialog>

  </div>

</template>

<script>
export default {
  data: function(){
    return {
      users: [],
      page: {},
      text_q: "",
      dialogVisible: false,
      type: "new",
      edit_id: "",
      user: {
        real_name: "",
        password: "",
        tel: "",
        email: "",
        role: "",
        headimg: "",
        audit: true,
        locked: false,
        address: "",
        company_id: "",
        brand_name: "",
        region: "",
        user_type: "",
        amount: 0
      },
      image: "",
    }
  },
  created() {
    this.fetchResource(this.page.next_page);
  },
  methods: {
    fetchResource(val) {
      let self = this;
      self.$http.get("users.json?page=" + val + "&q=" + this.text_q).then(res => {
        self.users = res.body.klass;
        self.page = res.body.page;
      }, res => {
        self.$message.error("加载失败");
      })
    },
    handlePage(val){
      this.fetchResource(val);
    },
    rowClick(val){
      this.$router.push("/users/" + val.id);
    },
    handleCompany(val){
      this.$router.push("/companies/" + val);
    },
    addUser() {
      let self = this;
      self.dialogVisible = true;
    },
    editUser(id){
      let self = this;
      self.dialogVisible = true;
      self.users.forEach(function(user, index){
        if(id === user.id) {
          for (var u in self.user) {
            self.user[u] = user[u];
          }
          self.edit_id = id;
          return;
        }
      });
      self.type = "edit";
    },
    userSubmit(type, id) {
      let self = this;
      let form = new FormData();
      for(var u in this.user) {
        if (this.user[u]) {
          form.append(u, this.user[u]);
        }
      }
      if (self.image){
        form.append("headimg", self.image);
      }
      if (type == "edit") {
        self.$http.put("users/"+ id + ".json", form).then(res => {
          self.dialogVisible = false;
        }, res => {
          self.$message.error("更新失败");
        })
      } else {
        self.$http.post("users.json", form).then(res => {
          let data = res.body;
          if (data.code > 200) {
            self.$message.error(data.msg);
            return;
          }
          self.users.unshift(res.body.klass);
          self.dialogVisible = false;
        }, res => {
          self.$message.error("创建失败");
        })
      }
    },
    searchQuery(e) {
      this.fetchResource(1)
    },
    uploadImage(e){
      let files = e.target.files;
      if(!files.length) {
        return;
      }
      this.image = files[0];
    },
    defaultImg(row,col){
      row.target.src = "https://images.chuanggj.com/chuang.png"
    }
  }
}
</script>
<style scoped>
.headimg {
  width: 80px;
  height: 80px;
}
.search {
  width: 200px;
  float: right;
}
.user-header{
  margin-bottom: 20px;
}
</style>

