<template>
    <div>
        <h2>提现到{{type | conver}}用户</h2>
        <span @click="export_excel()" class="el-button">导出</span>
<el-button @click="rowClick()" type="text" size="small">返回</el-button>

        <div class='table'>
            <el-table :data='recipients' border>
                <el-table-column label='提现人' prop='name'></el-table-column>
                <el-table-column label='提现到账户' prop='account'></el-table-column>
                <el-table-column label='提现金额'>
                    <template scope='scope'>
                        {{ (scope.row.amount / 100.00).toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column label="用户 ID" prop='user_id'></el-table-column>
                <el-table-column label="开户行" prop='open_bank'></el-table-column>
                <el-table-column label="支行" prop='open_bank_code'></el-table-column>
                <el-table-column label="生成时间" >
                    <template scope='scope'>
                        {{ scope.row.created_at * 1000 | date("%Y-%m-%d %T") }}
                    </template>
                </el-table-column>
                <el-table-column label='操作'>
                    <template scope="scope">
                        <el-button @click="payClick(scope.row.id, scope.row.name, scope.$index)" type="text" size="small">完成支付</el-button>
                        <el-button @click="deleteClick(scope.row.id, scope.row.name, scope.$index)" type="text" size="small">拒绝</el-button>
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                recipients: [],
                page: {next_page: 0, current_page: 0},
                type: "",
            }
        },
        created() {
            this.fetchResource(this.next_page);
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
            fetchResource(page) {
                let self = this;
                self.type = self.$route.query.type;
                self.$http.get("encashments/" + self.$route.params.id + "/fetch_users.json?page=" + page).then(res => {
                    self.recipients = res.body.klass;
                    self.page = res.body.page;
                }, res => {
                    this.$alert("网络连接失败");
                })
            },

            export_excel(){
                this.$http.get("encashments/" + this.$route.params.id + "/fetch_users.xlsx?limit=100",{responseType: 'blob', content_type: "application/xlsx"}).then(res => {
                    window.location.href = res.url
                
                }, res => {
                    this.$alert("网络连接失败");
                })

            },
                rowClick(){
                    this.$router.push('/encashs/?type=' + this.type);
                },
                payClick(id, name, index){
                    let self = this;
                    self.$confirm("已确认支付给[" + name + "]款项", "进一步确认支付", {
                        confirmButtonText: "确认支付",
                        cancelButtonText: "关闭",
                        type: "danger"
                    }).then(() => {
                        self.$http.post("encashments/" + id + "/recipient.json").then(res => {
                            if (res.body.code == 200) {
                                self.recipients.splice(index, 1);
                                self.$message({
                                    type: "success",
                                    message: "成功支付"
                                });
                            } else {
                                self.alert("操作失败");
                            }
                        }) 
                    })   
                },
                deleteClick(id, name, index) {
                    let self= this;
                    self.$confirm("驳回用户[" + name + "]提现请求?", "拒绝提现", {
                        confirmButtonText: "确认拒绝",
                        cancelButtonText: "点错了",
                        type: "danger"
                    }).then(() => {
                        self.$http.delete('encashments/' + id + ".json").then(res => {
                            if (res.body.code == 200) {
                                self.recipients.splice(index, 1);
                                self.$message({
                                    type: "success",
                                    message: "操作成功"
                                });
                            } else {
                                self.alert("操作失败");
                            }
                        })
                    })
                },
                handlePage(val) {
                    this.fetchResource(val)
                }
        }
    }
</script>
