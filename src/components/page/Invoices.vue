<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i> 开票列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-table :data="invoices" border style="width: 100%">
      <el-table-column prop="company_name" label="开票单位"></el-table-column>
      <el-table-column prop="content" label="开票内容"></el-table-column>
      <el-table-column prop="invoice_type" label="发票类型" :formatter="formatter"></el-table-column>
      <el-table-column prop="price" label="开票金额"></el-table-column>
      <el-table-column prop="handle_type" label="处理进度" :formatter="formatter"></el-table-column>
      <el-table-column prop="express_name" label="快递公司"></el-table-column>
      <el-table-column label="操作">
          <template scope="scope">
            <span v-if="scope.row.handle_type === 'audit'" @click="invoice_panel(scope.row.id, scope.$index)">确认开票</span>
            <span v-else @click="show_ship(scope.row.id, scope.$index)">查看快递状态</span>
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

      <el-dialog title="查看快递" v-model="dialogVisible" size="tiny">
        <ul>
          <li> 开票单位: <span>{{invoice.company_name}}</span></li>
          <li>金额: <span>{{invoice.price}}</span></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
        </el-dialog>

        <el-dialog title="处理开票" v-model="handleVisible" size="tiny">
          <el-form :inline="true" :model="invoice" label-width="80px">
            <el-form-item label="快递公司">
              <el-input v-model="invoice.express_name"></el-input>
              </el-form-item>
              <el-form-item label="单号">
                <el-input v-model="invoice.number"></el-input>
                </el-form-item>
                <el-form-item label="操作">
                  <el-select v-model="invoice.handle_type">
                    <el-option label="确认开票" value="completed"></el-option>
                    </el-select>
                    </el-form-item>
                    </el-form>
                <el-button type="primary" @click="handleSubmit(invoice.id)">提交</el-button>
                <el-button @click="handleVisible=false">取消</el-button>
                </el-dialog>

  </div>
</template>
<script>
export default {
  data(){
    return {
      invoices: [],
      invoice: {},
      page: {next_page: 0},
      dialogVisible: false,
      handleVisible: false

    }
  },
  created(){
    this.fetchResource(this.page.next_page)
  },
  methods: {
    fetchResource(page) {
      this.$http.get("invoices.json?page=" + page).then(res => {
        this.invoices = res.body.klass
      })
    },
    show_ship(id, idx){
      let self = this;
      self.invoices.forEach(function(c, index){
        if (c.id == id){
          self.invoice = c;
          return;
        }
      });
      this.dialogVisible = true;
    },
    invoice_panel(id, idx){
      let self = this;
      self.invoices.forEach(function(c, index){
        if (c.id == id){
          self.invoice = c;
          return;
        }
      });

      this.handleVisible = true;
    },
    handleSubmit(id){
      this.$http.put("invoices/" + this.invoice.id + ".json", this.invoice).then(res => {
        this.handleVisible = false;
        this.$message("完成");
      })
    },
    handlePage(val) {
      this.fetchResource(val)
    },
    formatter(row, col){
      let value = "";
      let c_type = col.label === "处理进度" ? row.handle_type : row.invoice_type
      switch(c_type){
        case "common":
          value = "普通发票";
          break;
        case "added":
          value = "增值税发票";
          break;
        case "completed":
          value = "已发送";
          break;
        case "audit":
          value = "审核中";
          break;
        default:
          value = "--";
      }
      return value;
    }
  }
}
</script>
<style scoped>
ul {
  list-style: none;
}
</style>
