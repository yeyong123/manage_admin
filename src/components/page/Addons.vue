<template>
  <div>
    <div class="crumbs">

      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 
          <router-link to="/dashboard">
            主页
            </router-link>
            </el-breadcrumb-item>

            <el-breadcrumb-item><i class="el-icon-setting"></i>插件</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <el-button type="primary" @click="new_addon">添加插件</el-button>
    <el-table :data="addons" border style="width: 100%">
      <el-table-column prop="title" label="插件名称"></el-table-column>
        <el-table-column prop="content" label="插件介绍"></el-table-column>
        <el-table-column prop="serial_number" label="编号"></el-table-column>
        <el-table-column prop="nickname" label="别名"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <span @click="edit_addon(scope.row.id)">编辑</span>
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
        <el-dialog title="操作" v-model="dialogVisible">
          <el-form :inline="true" ref="addon" :model="addon" label-width="80px" enctype="multipart/form-data">
            <el-form-item label="名称">
              <el-input v-model="addon.title"></el-input>
              </el-form-item>
              <el-form-item label="介绍">
                <el-input v-model="addon.content"></el-input>
                </el-form-item>
                <el-form-item label="编号">
                  <el-input v-model="addon.serial_number"></el-input>
                  </el-form-item>
                  <el-form-item label="别名">
                    <el-input v-model="addon.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="图片">
                        <input type="file" @change="uploadImage"></input>
                      </el-form-item>

                      <div v-if="images.length > 0" v-for="img in images">
                        <img :src="img">
                      </div>
                      <div class="cu-footer">
                      <br />
                      <hr>
                      <p v-if="addon.pictures && addon.pictures.length > 0">旧的图片</p>
                        <div v-for="img in addon.pictures">
                          <img :src="img.image.url">
                      </div>
                      </div>
                      </el-form>
                      <span slot="footer" class="dialog-footer">
                        <div class="cu-footer">
                          <el-button type="primary" @click="PostAddon(type, addon.id)">提交</el-button>
                          <el-button @click="dialogVisible=false">取消</el-button>
                        </div>
                      </span>

                      </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return {
      addons: [],
      page: {next_page: 1},
      addon: {
        content: "",
        serial_number: "",
        nickname: "",
        title: "",
        pictures: []
      },
      dialogVisible: false,
      images: [],
      files: [],
      type: "new"
    }
  },
  created(){
    this.fetchResource(this.page.next_page)
  },
  methods: {
    fetchResource(page){
      this.$http.get("addons.json?page=" + page).then(res => {
        this.addons = res.body.klass;
        this.page = res.body.page;
      })
    },
    handlePage(val) {
      this.fetchResource(val)
    },

    edit_addon(id){
      let self = this;
      self.type = "edit";
      self.dialogVisible = true;
      self.images = [];
      self.addons.forEach(function(e, i){
        if (e.id == id) {
          self.addon = e;
          return;
        }
      })
    },
    uploadImage(e) {
      let self = this;
      let files = e.target.files;
      let reader = new FileReader();
      if (!files.length) {
        return;
      }
      self.files.push(files[0]);
      reader.onload = function() {
        self.images.push(reader.result);
      }
      reader.readAsDataURL(files[0])
    },
    new_addon() {
      this.type == "new"
      this.dialogVisible = true;
      this.images = [];
      this.addon = {};
    },

    PostAddon(type, id) {
      let self = this;
      let form =  new FormData();
      for(var u in self.addon) {
        if (self.addon[u]) {
          form.append(u, self.addon[u]);
        }
      }
      if (self.files.length > 0) {
        let h = {};
        self.files.forEach(function(e, i){
          form.append('pictures_attributes[][image]', e)
        })
      }
      if (type == "new") {
        this.$http.post("addons.json", form).then(res => {
          if (res.body.code == 200) {
            this.addons.unshift(res.body.addon);
            this.dialogVisible = false;
          }
        })
      } else {
        self.$http.put("addons/" + id + ".json", form).then(res => {
          if (res.body.code == 200) {
            self.dialogVisible = false;
          }
        })
      }
    }
  }
}
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  float: left;
}
.cu-footer {
  clear: both;
}

</style>
