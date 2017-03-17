<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 审核列表</el-breadcrumb-item>
                </el-breadcrumb>
        </div>
        <el-table :data="audits" border style="width: 100%">
            <el-table-column label="用户昵称" sortable width="180">
                <template scope="scope">
                    <div class="detail" @click="detail(scope.row.id)">{{scope.row.real_name}}</div>
                </template>
                </el-table-column>
                <el-table-column prop="tel" label="电话" width="200">
                    </el-table-column>
                    <el-table-column prop="role" label="申请角色" sortable width="150">
                        <template scope="scope">
                            <el-tag :type="'success'" v-if="scope.row.role === 1">
                                品牌商
                                </el-tag>
                                <el-tag :type="'primary'" v-else>
                                    服务商
                                    </el-tag>
                        </template>
                        </el-table-column>
                        <el-table-column prop="audit" label="审核状态" sortable width="150">
                            <template scope="scope">
                                <el-tag :type="'success'" v-if="scope.row.audit === true">
                                    已通过
                                    </el-tag>
                                    <el-tag :type="'warning'" v-else>
                                        待审核
                                        </el-tag>
                            </template>

                            </el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button size="small"

                                               @click="confirm_appoint(scope.row.id, scope.$index)" v-if="scope.row.audit === false">审核通过</el-button>
                                           <el-button size="small" type="danger"
                                                                   @click="reject_appoint(scope.row.id, scope.$index)">驳回</el-button>
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

                                <el-dialog title="信息详细" v-model="dialogVisible" size="tiny">

                                    <ul>
                                        <li> 姓名: <span>{{audit.real_name}}</span></li>
                                        <li>手机: <span>{{audit.tel}}</span></li>
                                        <li>申请类型: <span>{{audit.role == 1 ? "品牌商" : "服务商"}}</span></li>
                                    <li class="image-list" v-for="image in audit.pictures">
                                        <img :src="image.image.url" />
                                    </li>
                                    </ul>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                                    </span>
                                    </el-dialog>
    </div>

</template>

<script>
export default {
    data: function(){
        return {
            audits: [],
            audit: "",
            dialogVisible: false,
            page: {}
        }
    },

    created() {
        this.fetchResource(this.page.next_page)
    },
    methods: {
        detail(id){
            let self = this;
            self.dialogVisible = true;
            self.$http.get("audits/" + id + ".json").then(res => {
                self.audit = res.body.audit;
            });
        },
        fetchResource(page){
             let self = this
            self.$http.get("audits.json?page=" + page).then(res => {
                self.audits = res.body.audits;
                self.page = res.body.page;
                console.log(res.body);
            }, res => {
                self.$message.error("加载失败");
            })
        },

        handlePage(val) {
            this.fetchResource(val)
        },
        confirm_appoint(id, index){
            this.$http.post("audits/" + id + "/audit.json?type=confirm", {}).then(res=>{
                this.audits.splice(index, 1);
                this.$message("审核成功");
            }, res => {
                this.$message.error("操作失败")
            })
        },
        reject_appoint(id, index) {
            this.$http.post("audits/" + id + "/audit.json?type=reject", {}).then(res => {
                this.audits.splice(index, 1);
                this.$message("拒绝了用户的请求");
            },res => {
                this.$message.error("操作失败")
            })
        }
    }
}
</script>

<style scoped>
.ms-doc{
    width:100%;
    max-width: 980px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
}
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
    ul {
        list-style: none;
    }
    ul li {
        padding: 7px;
        border-bottom: 1px solid #ccc;
        text-align: left;
        width: 100%;
    }
    ul li span {
        text-align: right;
    }
    .image-list img {
        width: 100%;
        height: auto;
    }
</style>
