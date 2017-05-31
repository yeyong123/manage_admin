<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 
                    <router-link to="/dashboard">
                        主页
                    </router-link>
                </el-breadcrumb-item>

                <el-breadcrumb-item>材料库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button type="text" @click="addLib">添加材料</el-button>
        <el-table :data="libs" border style="width: 100%">
            <el-table-column prop="name" label="名称" ></el-table-column>
            <el-table-column prop="specify" label="规格"></el-table-column>
            <el-table-column prop="count" label="库存"></el-table-column>
            <el-table-column prop="price" label="单价"></el-table-column>
            <el-table-column prop="kind" label="类别"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                     <el-button type="text" @click="editLib(scope.row)">编辑</el-button>
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

        <el-dialog title="材料库操作" v-model="dialogVisible">
            <el-form :inline="true" ref="lib" :model="lib" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="lib.name"></el-input>
                </el-form-item>
 <el-form-item label="单价">
                    <el-input v-model="lib.price"></el-input>
                </el-form-item>
                <el-form-item label="库存">
                    <el-input v-model="lib.count"></el-input>
                </el-form-item>
                <el-form-item label="规格">
                    <el-input v-model="lib.specify"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="lib.remark"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="libSubmit(action, edit_id)">提交</el-button>
                <el-button @click="dialogVisible=false">取消</el-button>
            </span>
        </el-dialog>


    </div>

</template>
<script>
    export default {
        data() {
            return {
                libs: [],
                page: {next_page: 0, current_page: 0},
                lib: {
                    name: "",
                    price: "",
                    specify: "",
                    count: "",
                    company_id: "",
                    remark: ""
                },
                dialogVisible: false,
                edit_id: "",
                action: "edit"
            }
        },
        created() {
            this.fetchResource(this.page.next_page)
        },
        methods: {
            fetchResource(page){
                this.$http.get("material_libs.json?page=" + page).then(res => {
                    this.libs = res.body.klass;
                    this.page = res.body.page;
                }, res => {
                    this.$message.error("加载失败")
                })
            },
                handlePage(val){
                    this.fetchResource(val);
                },
                addLib() {
                    this.action = "new";
                    this.dialogVisible = true;
                },
            libSubmit(type, edit_id) {
                let self = this;
                if (type == "new") {
                    self.$http.post("material_libs.json", self.lib).then(res => {
                        if (res.body.code == 200) {
                            self.libs.unshift(res.body.klass);
                            self.lib = res.body.klass;
                            self.dialogVisible = false;
                        } else {
                            self.$message.error(res.body.msg);
                        }
                    })
                } else {
                    self.$http.put("material_libs/" + edit_id + ".json", self.lib).then(res => {
                        if (res.body.code == 200) {
                            self.lib = res.body.klass;
                            self.dialogVisible = false;
                        } else {
                            self.$message.error(res.body.msg);
                        }
                    })
                }
            },
                editLib(obj) {
                    this.lib = obj;
                    this.edit_id = obj.id;
                    this.action = 'edit';
                    this.dialogVisible = true;
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
