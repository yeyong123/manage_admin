<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
         <el-breadcrumb-item><i class="el-icon-menu"></i> 
           <router-link to="/dashboard">
           主页
           </router-link>
           </el-breadcrumb-item>

           <el-breadcrumb-item><i class="el-icon-setting"></i>提现列表</el-breadcrumb-item>
           </el-breadcrumb>
    </div>
    <div class="tag-ele">
      <span @click="fetch_type('alipay')">
        <el-tag class="tag" :class="type === 'alipay' ? type : null">提现到支付宝</el-tag>
      </span>
      <span @click="fetch_type('wx_pub')">
        <el-tag type="gray" class="tag" :class="type === 'wx_pub' ? type : null">提现到微信公众号</el-tag>
      </span>
      <span @click="fetch_type('bank')">
        <el-tag type="primary" class="tag" :class="type === 'bank' ? type : null">提现到银行卡</el-tag>
      </span>
    </div>
    <hr >
    <el-table :data="encashs" border>
      <el-table-column label="生成时间" width="300">
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
            <template v-if="type === 'alipay'">
            <el-table-column label="操作">
              <template scope="scope">
                <span @click="batch_pay(scope.row.id)" class="el-button el-button--danger">提交到{{type | conver}}</span>
              </template>
              </el-table-column>
            </template>
              </el-table>

              <el-dialog title="提现的用户" v-model="dialogVisible" size="large">
                <el-table :data="users" border style="width: 100%">
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="open_bank" label="开户行"></el-table-column>
                  <el-table-column prop="open_bank_code" label="支行"></el-table-column>
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
                      <template v-if="type != 'alipay'">
                        <el-table-column label="操作">
                          <template scope="scope">
                            <span @click="single_handle(scope.row.id, scope.$index)" class="el-button el-button--danger">处理{{type | conver}}支付</span>
                          </template>
                          </el-table-column>

                      </template>
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
      users: [],
      type: "alipay",
      en_index: 0
    }
  },
  created(){
    this.fetch_soruce(this.type)
  },
  filters: {
    conver(val) {
      let v = "";
      switch(val) {
        case "alipay":
          v = "支付宝";
          break;
        case "wx_pub":
          v = "公众号"
          break;
        case "bank":
          v = "银行卡"
          break;
        default:
          v = "支付宝";
      }
      return v
    }
  },
  methods: {
    fetch_soruce() {
      this.$http.get("encashments.json?type=" + this.type).then(res => {
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
    },
      fetch_type(type) {
        this.type = type
        this.fetch_soruce(type)
      },
      single_handle(id, index) {
        this.$http.post("encashments/" + id + "/recipient.json", {type: this.type}).then(res => {
          let data = res.body
          if (data.code == 200) {
            this.users.splice(index, 1);
            this.$message("处理完成");
            if (this.users.length <= 0) {
              this.$http.post("encashments/" + id + "/close_encash.json", {}).then(res =>{
                if (res.body.code == 200) {
                  this.encashs.splice(0, 1);
                  this.dialogVisible = false;
                }
              })
            }
          }
        })
      }
  }
}
</script>
<style scoped>
hr {
  margin: 15px 0;
}
.tag {
  margin-right: 5px;
  width: 20%;
  text-align: center;
  padding: 12px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
}
.alipay, .wx_pub, .bank {
  border-bottom: 4px solid red;
}
</style>
