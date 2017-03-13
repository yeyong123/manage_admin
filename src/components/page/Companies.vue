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
      <el-table-column prop="name" label="名称" ></el-table-column>
      <el-table-column prop="abbr" label="缩写"></el-table-column>
      <el-table-column prop="tel" label="联系人"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="Logo">
        <template scope="scope">
          <img :src="scope.row.logo" />
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
                      <el-input v-model="company.logo"></el-input>
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
    companySubmit(){
      let form = this.company;
      let self = this;
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

  }
}
</script>
<style scoped>
img {
  width: 80px;
  height:80px;
}
</style>
