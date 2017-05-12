<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 
                    <router-link to="/dashboard">
                        主页
                    </router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>财务交易</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="pay-header">
            <form>
                <el-input class="search" v-model="q" placeholder="交易编号"></el-input>
                <el-input class="search" v-model="user" placeholder="收款人"></el-input>
                <el-date-picker
                    v-model="time"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    placeholder="选择时间范围"
                    format="yyyy-MM-dd HH:mm:ss"
                    range-separator="/" 
                    align="right">
                </el-date-picker>
                <el-select v-model="trade_status" placeholder="选择状态">
                    <el-option
                        v-for="item in states"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="trade_type" placeholder="交易类型">
                    <el-option
                        v-for="item in types"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="searchQuery">搜索</el-button>
            </form>
        </div>
        <el-table :data="payments" border style="width: 100%">
            <el-table-column prop="order_num" label="交易编号" width="170"></el-table-column>
            <el-table-column prop="order_id" label="订单ID"></el-table-column>
            <el-table-column prop="user_id" label="用户"></el-table-column>
            <el-table-column prop="origin_id" label="交易对象"></el-table-column>
            <el-table-column label="交易金额">
                <template scope="scope">
                    {{scope.row.price / 100.0}}
                </template>
            </el-table-column>
            <el-table-column prop="trade_type" label="类型" :formatter="tradeType"></el-table-column>
            <el-table-column prop="trade_status" label="交易状态" :formatter="tradeStatus"></el-table-column>
            <el-table-column prop="pay_type" label="交易渠道" :formatter="payType"></el-table-column>
            <el-table-column prop="title" label="描述" width="220"></el-table-column>
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
                payments: [],
                page: {},
                q: "",
                trade_status: '',
                trade_type: '',
                time: [],
                user: '',
                types: [
                    {value: null, label: "交易类型"},
                    {value: "income", label: "收入"},
                    {value: "expense", label: "支出"}
                ],
                states: [
                    {value: null, label: "选择状态"},
                    {value: "pending", label: "交易中"},
                    {value: "complete", label: "交易完成"},
                    {value: "new", label: "新交易"},
                    {value: "locked", label: "锁定"}
                ],
                current_action: 'index',
            }
        },
        created() {
            this.fetchResource(this.page.next_page)
        },
        methods: {
            fetchResource(page){
                this.$http.get("payments.json?page=" + page).then(res => {
                    this.payments= res.body.klass;
                    this.page = res.body.page;
                }, res => {
                    this.$message.error("加载失败")
                })
            },
                handlePage(val){
                    let args = {
                        trade_type: this.trade_type,
                        trade_status: this.trade_status,
                        q: this.q,
                        time: this.time,
                        user_id: this.user,
                        page: val
                    }
                    if (this.current_action === 'index') {
                        this.fetchResource(val);
                    } else {
                        this.search_ps(args)
                    }
                },
                search_ps(args) {

                    this.current_action = 'search'
                    this.$http.get("payments/search_payments", {params: args}).then(res =>{
                        this.payments = res.body.klass;
                        this.page = res.body.page;
                    })
                },
                searchQuery() {
                    let args = {
                        trade_type: this.trade_type,
                        trade_status: this.trade_status,
                        q: this.q,
                        time: this.time,
                        user_id: this.user,
                    }
                    this.search_ps(args)
                },
                tradeType(row, col) {
                    let name = "";
                    switch(row.trade_type) {
                        case "income":
                            name = "收入"
                            break;
                        case "expense":
                            name = "支出"
                            break;
                    }
                    return name;
                },
                tradeStatus(row, col){
                    let name = "";
                    switch(row.trade_status){
                        case "locked":
                            name = "锁定"
                            break;
                        case "complete":
                            name = "交易完成"
                            break;
                        case "cancel":
                            name = "取消"
                            break;
                        case "new":
                            name = "新交易"
                            break;
                        case "pending":
                            name = "交易中..."
                            break;
                    }
                    return name;
                },
                payType(row, col){
                    let name = "";
                    switch(row.pay_type){
                        case "local":
                            name = "站内交易"
                            break;
                        case "finace_pay":
                            name = "财务转账"
                            break;
                        case "refund":
                            name = "已退款"
                            break;
                        case "alipay_pc_direct":
                            name  = "网页支付宝"
                            break;
                        case "alipay_wap":
                            name = "手机支付宝"
                            break;
                        case "wx_pub":
                            name = "公众号支付"
                            break;
                    }
                    return name;
                }
        }
    }
</script>
<style scoped>
    .search {
        width: 200px;
    }
    .pay-header {
        margin-bottom: 15px;
    }
</style>
