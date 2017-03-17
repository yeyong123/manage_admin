<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>品牌商列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div>
      <el-button type="text" @click="newCompany">添加品牌</el-button>
    </div>
    <el-table :data="companies" border style="width: 100%">
      <el-table-column label="Logo" width="150">
          <template scope="scope">
            <img :src="scope.row.logo.url" />
          </template>
        </el-table-column>
      <el-table-column prop="name" label="名称" ></el-table-column>
      <el-table-column prop="abbr" label="缩写"></el-table-column>
      <el-table-column prop="tel" label="联系人"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button @click="editCompany(scope.row.id)" type="text" size="small">编辑</el-button>
                      <el-button @click="deleteCompany(scope.row.id, scope.$index)" type="danger" size="small">删除</el-button>
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


        <el-dialog title="品牌商操作" v-model="dialogVisible">
          <el-form :inline="true" :ref="company" :model="company" label-width="80px" entype="multipart/form-data">
            <el-form-item label="公司名称">
              <el-input v-model="company.name"></el-input>
              </el-form-item>
              <el-form-item label="缩写">
                <el-input v-model="company.abbr"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                  <el-input v-model="company.tel"></el-input>
                  </el-form-item>
                  <el-form-item label="地址">
                    <el-input v-model="company.address"></el-input>
                    </el-form-item>
                    <el-form-item label="公司 Logo">
                      <input type="file" @change="uploadImage"></input>
                      </el-form-item>
                      </el-form> 
                      <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="companySubmit(type, edit_id)">提交</el-button>
                        <el-button @click="dialogVisible=false">取消</el-button>
                      </span>
                      </el-dialog>
  </div>

</template>
<script>
export default {
  data() {
    return {
      companies: [],
      page: {next_page: 1},
      q: "",
      dialogVisible: false,
      type: "new",
      edit_id: "",
      image: "",
      company: {
        name: "",
        logo: "",
        abbr: "",
        tel: "",
        address: ""
      }
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
    newCompany(){
      this.dialogVisible= true;
    },
    editCompany(id){
      let self = this;
      self.type = "edit";
      self.edit_id = id;
      self.dialogVisible = true;
      self.companies.forEach(function(c, index){
        if (c.id == id) {
          self.company = c;
          return;
        }
      });
    },
    deleteCompany(id, index){
      let self = this;
      self.$confirm("删除之后不能恢复, 确认删除?", "删除品牌商?", {
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
        type: "danger"
      }).then(() => {
        self.$http.delete("companies/" + id + ".json").then(res => {
          if (res.body.code === 200) {
            self.$message({
              type: 'success',
              message: "删除成功"
            });
            self.companies.splice(index, 1);
          } else {
            self.$message.error("无效的操作");
          }
        }, res => {
          self.$message.error("连接断开");
        })
      })
    },
    companySubmit(type, edit_id){
      let form = new FormData();
      for(var u in this.company) {
        if (this.company[u]) {
          form.append(u, this.company[u]);
        }
        if (this.image) {
          form.append("logo", this.image)
        }
      }
      let self = this;
      if (type == "edit") {
        self.$http.put("companies/" + edit_id + ".json", form).then(res => {
          let data = res.body;
          if (data.code > 200) {
            self.$message.error(data.msg);
            return;
          }
          self.dialogVisible = false;
          self.$message("编辑完成");
        }, res => {
          self.$message.error("编辑失败");
        })
      } else {
        self.$http.post("companies.json", form).then(res => {
          let data = res.body;
          if (data.code > 200) {
            self.$message.error(data.msg);
            return;
          }
          self.companies.unshift(data.klass);
          self.$message("添加完成");
          self.dialogVisible = false;
        }, res => {
          self.$message.error("网络加载失败");
        })
      }
    },
     uploadImage(e){
      let files = e.target.files;
      if(!files.length) {
        return;
      }
      this.image = files[0];
    }
  }
}
</script>
<style scoped>
img {
  width: 80px;
  height:80px;
}
</style>
