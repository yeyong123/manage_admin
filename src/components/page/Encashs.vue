<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i>提现列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-table :data="encashs" border>
      <el-table-column label="生成时间" width="200">
        <template scope="scope">
          {{scope.row.created_at * 1000 | date("%Y-%m-%d %T")}}
        </template>
        </el-table-column>
        <el-table-column label="总金额" width="250">
          <template scope="scope">
            {{(scope.row.amount / 100.00).toFixed(2)}}
          </template>
          </el-table-column>
          <el-table-column label="提现的用户">
            <template scope="scope">
              <span @click="show_users(scope.row.id)" class="el-button el-button--primary">查看明细</span>
            </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <span @click="batch_pay(scope.row.id)" class="el-button el-button--danger">提交到支付宝</span>
              </template>
              </el-table-column>
              </el-table>

              <el-dialog title="提现的用户" v-model="dialogVisible" size="large">
                <el-table :data="users" border style="width: 100%">
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="account" label="提现的账户"></el-table-column>
                  <el-table-column label="提现金额">
                    <template scope="scope">
                      {{(scope.row.amount / 100.00).toFixed(2)}}
                    </template>
                    </el-table-column>
                    <el-table-column prop="description" label="理由"></el-table-column>
                    <el-table-column label="提交时间">
                      <template scope="scope">
                        {{scope.row.created_at * 1000 | date("%Y-%m-%d %T")}}
                      </template>
                      </el-table-column>
                      </el-table>
                      </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return {
      encashs: [],
      dialogVisible: false,
      users: []
    }
  },
  created(){
    this.fetch_soruce()
  },
  methods: {
    fetch_soruce() {
      this.$http.get("encashments.json").then(res => {
        let data = res.body;
        this.encashs = data.klass;
      }, res => {
        this.$alert("加载失败")
      })
    },
    show_users(id){
      this.dialogVisible = true;
      this.$http.get("encashments/" + id + "/fetch_users.json").then(res => {
        this.users = res.body.klass;
      }, res => {
        this.$alert("加载失败");
      })
    },
    batch_pay(id){
      this.$http.post("encashments/" + id + "/batch_options.json").then(res => {
        let data = res.body;
        if (data.code == 200) {
          window.location.href = data.url
        }
      }, res => {
        this.$alert("加载失败");
      })
    }
  }
}
</script>
