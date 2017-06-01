<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 
                    <router-link to="/orders">
                        订单列表
                    </router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>基本信息</span>
                    </div>
                    <el-col :span="12">订单号: <span>{{order.serial_number}}</span></el-col>
                    <el-col :span="12">面积: <span>{{order.square}}</span></el-col>
                    <el-col :span="12">材质: <span>{{order.material}}</span></el-col>
                    <el-col :span="12">品牌商: <span>{{order.company_id}}</span></el-col>
                    <el-col :span="12">品牌商名称: <span>{{order.company_name}}</span></el-col>
                    <el-col :span="12">发单人: <span>{{order.name}}</span></el-col>
                    <el-col :span="12">发单人手机: <span>{{order.tel}}</span></el-col>
                    <el-col :span="12">发单人ID: <span>{{order.customer_id}}</span></el-col>
                    <el-col :span="12">是否品牌商单子: <span>{{order.is_company}}</span></el-col>
                    <el-col :span="12">是否安装单: <span>{{order.mount_order}}</span></el-col>
                    <el-col :span="12">发单日期: <span>{{order.created_at * 1000 | date("%Y-%m-%d %T")}}</span></el-col>
                    <el-col :span="12">最后修改日期: <span>{{order.updated_at * 1000 | date("%Y-%m-%d %T")}}</span></el-col>
                    <el-col :span="12">预约上门时间: <span>{{order.booking_date * 1000 | date("%Y-%m-%d %T")}}</span></el-col>
                    <el-col :span="12">
                        <template v-if="order.install_date > 1">
                            安装时间: <span>{{order.install_date * 1000 | date("%Y-%m-%d %T")}}</span>
                        </template>
                        <template v-else>
                            安装时间: <span>待定</span>
                        </template>
                    </el-col>
                    <el-col :span="12">地址: <span>{{order.address}}</span></el-col>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span v-if="order.workflow_state != 'new'" class="prev_process process">上一个进度:{{prev_state | orderState}}</span>
                        <span class="current_process process">当前进度: {{order.workflow_state | orderState}}</span>
                        <span v-if="next_state != 'canceled'" class="next_process process">下一个进度:{{next_state | orderState}}</span>
                    </div>
                    <el-col :span="12">安装工: <span>{{server_name}}</span></el-col>
                    <el-col :span="12">安装工ID: <span>{{order.facilitator_id}}</span></el-col>
                    <el-col :span="12">测量员: <span>{{measure_name}}</span></el-col>
                    <el-col :span="12">测量员ID: <span>{{order.customer_service_id}}</span></el-col>
                    <el-col :span="12">测量费: <span>{{order.measure_amount}}</span></el-col>
                    <el-col :span="12">安装费: <span>{{order.install_amount}}</span></el-col>
                    <el-col :span="12">测量评论: <span>{{order.measure_comment}}</span></el-col>
                    <el-col :span="12">安装评论: <span>{{order.is_comment}}</span></el-col>
                    <el-col :span="12">预估价格: <span>{{order.total}}</span></el-col>
                    <el-col :span="12">最终价格(计算后): <span>{{(order.terminal_count / 100.0).toFixed(2)}}</span></el-col>
                    <el-col :span="12">安装工价格(计算后): <span>{{(order.service_installed_amount / 100.0).toFixed(2)}}</span></el-col>
                    <el-col :span="12">测量工价格(计算后): <span>{{(order.service_measure_amount / 100.0).toFixed(2)}}</span></el-col>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>审核流程</span>
                    </div>
                    <template v-if="is_appoint">
                        <template>
                            <p>当前所在的节点: 第{{order.level}}级,  共有{{node.max_node}}级</p>
                            <hr />
                            <div class="nodes p_users">
                                <p>上一节点审批人</p>
                                <template v-if="node.p_users == null">
                                    还没有人
                                </template>
                                <template v-else>
                                    <ul v-for="p_u in node.p_users">
                                        <li>{{p_u.real_name}}</li>
                                    </ul>
                                </template>
                            </div>
                            <div class="nodes n_users">
                                <p>下一节点审批人</p>
                                <template v-if="node.n_users == null">
                                    没有啦
                                </template>
                                <template else>
                                    <ul v-for="n_u in node.n_users">
                                        <li>{{n_u.real_name}}</li>
                                    </ul>
                                </template>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        无需审核
                    </template>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>图纸和附件</span>
                    </div>
                    <div class="measured pictures">
                        <p>测量图纸</p>
                        <ul v-for="pic in order.measure_pictures">
                            <template v-for="img in pic">
                                <li><a :href="img.image.url" target="_blank"><img :src="img.image.url" /></a></li>
                            </template>
                        </ul>
                    </div>
                    <hr />
                    <div class="completed pictures">
                        <p>安装图纸</p>
                        <ul v-for="pic in order.completed_pictures">
                            <li><a :href="pic.image.url" target="_blank"><img :src="pic.image.url" /></a></li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>操作日志</span>
                    </div>
                    <div class="event" v-for="evt in order.order_events">
                        <el-card class="box-card">
                            <p>{{evt.title}}</p>
                            <span class="time">{{evt.created_at * 1000 | date("%Y-%m-%d %T")}}</span>
                            <hr/>
                            <p>操作人ID {{evt.user_id}}</p>
                        </el-card>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                order: "",
                server_name: "",
                measure_name: "",
                states: ["new", "appointed_measurement", "measured", "appointed_installation", "installed", "confirm_installed", "completed", "canceled"],
                prev_state: "",
                next_state: "",
                is_appoint: "",
                node: {max_node: 0, n_users: [], p_users: []},

            }
        },
        created() {
            this.fetchResource()
        },
        filters: {
            orderState(val){
                let state = "";
                switch(val){
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
                    case "confirm_installed":
                        state = "管理员确认安装";
                        break;
                    default:
                        state = "已取消";
                }
                return state;
            }

        },
        methods: {
            fetchResource(){
                let self = this;
                self.$http.get("orders/" + self.$route.params.id + ".json").then(res => {
                    self.order = res.body.klass;
                    self.server_name = res.body.klass.service_info.name;
                    self.measure_name = res.body.klass.customer_service_info.name;
                    self.rangeState(res.body.klass.workflow_state);
                    if (!res.body.nodes) {
                        self.is_appoint = false;
                    } else {
                        self.node = res.body.nodes;
                        self.is_appoint  = true;
                    }
                }, res => {
                    self.$message.error("加载失败");
                })
            },
                rangeState(val) {
                    let l_n = this.states.length;
                    let current_n = this.states.indexOf(val);
                    console.log(l_n, current_n, val, this.states);
                    if (current_n == 0) {
                        this.prev_state = "new";
                        this.next_state = this.states[current_n + 1];
                    } else if (current_n + 1 == l_n) {
                        this.next_state = "canceled";
                        this.prev_state = this.states[current_n - 1];
                    } else {
                        this.prev_state = this.states[current_n - 1];
                        this.next_state = this.states[current_n + 1];
                    }               

                }

        }
    }
</script>
<style scoped>
    .box-card {
        padding: 0 0 15px 0;
        margin: 10px 5px 10px 0px;
    }
    .box-card div {
        margin-bottom: 5px;
    }
    .box-card .process {
        float: none;
        width: 100%;
        padding: 5px 15px;
        margin-right:20px;
    }
    .prev_process {
        color: #ccc;
    }
    .current_process {
        color: red;
    }
    .next_process {
        color: green;
    }
    .box-card span {
        margin-left: 20px;
    }
    .pictures {
        clear: both;
        margin-bottom: 10px;
    }
    .pictures img {
        margin: 10px;
        border: 1px solid;
        padding: 5px;
        width: 180px;
        height: 180px;
        float: left;
    }
    .pictures ul {
        list-style: none;
    }
    hr {
        clear: both;
        margin: 10px 0;
        color: #ccc;
        background-color: #909090;
    }
    .time {
        float: right;
        color: #ccc;
        font-size: 12px;
    }
    .event p {
        margin-top: 5px;
    }
    .nodes {
        width: 40%;
        padding: 10px 20px;
        float: left;
    }
    .nodes li {
        margin-top: 5px;
        border-bottom: 1px solid #ccc;
        padding: 4px;
    }
    ul {
        list-style: none;
    }
</style>
