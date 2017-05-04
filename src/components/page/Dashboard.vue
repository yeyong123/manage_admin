<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <router-link to="/audit">
          <div class="grid-content bg-purple"><span>审核列表</span></div>
        </router-link>
        </el-col>
 <el-col :span="6">
        <router-link to="/users">
          <div class="grid-content bg-purple"><span>用户列表</span></div>
        </router-link>
        </el-col>
 <el-col :span="6">
        <router-link to="/orders">
          <div class="grid-content bg-purple"><span>订单列表</span></div>
        </router-link>
        </el-col>
 <el-col :span="6">
        <router-link to="/payments">
          <div class="grid-content bg-purple"><span>财务报表</span></div>
        </router-link>
        </el-col>
 <el-col :span="6">
        <router-link to="/companies">
          <div class="grid-content bg-purple"><span>品牌管理</span></div>
        </router-link>
        </el-col>
 <el-col :span="6">
        <router-link to="/encashs">
          <div class="grid-content bg-purple"><span>提现</span></div>
        </router-link>
        </el-col>

 <el-col :span="6">
        <router-link to="/invoices">
          <div class="grid-content bg-purple"><span>开具发票</span></div>
        </router-link>
        </el-col>

 <el-col :span="6">
        <router-link to="/admins">
          <div class="grid-content bg-purple"><span>管理员</span></div>
        </router-link>
        </el-col>

         <el-col :span="6">
        <router-link to="/mail">
          <div class="grid-content bg-purple"><span>邮件/短信状态</span></div>
        </router-link>
        </el-col>
 <el-col :span="6">
        <router-link to="/libs">
          <div class="grid-content bg-purple"><span>材料库</span></div>
        </router-link>
        </el-col>
 <el-col :span="6">
        <router-link to="/rate">
          <div class="grid-content bg-purple"><span>设置利率</span></div>
        </router-link>
        </el-col>

         <el-col :span="6">
        <router-link to="/profits">
          <div class="grid-content bg-purple"><span>收益列表</span></div>
        </router-link>
        </el-col>

          <el-col :span="6">
        <router-link to="/pools">
          <div class="grid-content bg-purple"><span>冻结/封存资金库</span></div>
        </router-link>
        </el-col>

           <el-col :span="6">
        <router-link to="/api_users">
          <div class="grid-content bg-purple"><span>API用户</span></div>
        </router-link>
        </el-col>

          <el-col :span="6">
        <router-link to="/addons">
          <div class="grid-content bg-purple"><span>插件</span></div>
        </router-link>
        </el-col>

  <el-col :span="6">
        <router-link to="/departments">
          <div class="grid-content bg-purple"><span>部门</span></div>
        </router-link>
        </el-col>

          <el-col :span="6">
        <router-link to="/roles">
          <div class="grid-content bg-purple"><span>角色</span></div>
        </router-link>
        </el-col>

  <el-col :span="6">
        <router-link to="/nodes">
          <div class="grid-content bg-purple"><span>节点</span></div>
        </router-link>
        </el-col>
  <el-col :span="6">
        <router-link to="/incidents">
          <div class="grid-content bg-purple"><span>订单附加费</span></div>
        </router-link>
        </el-col>


          <el-col :span="6">
        <router-link to="/finances">
          <div class="grid-content bg-purple"><span>平台扣除的费用</span></div>
          </router-link>
          </el-col>

          </el-row>
          <!--
          <div style="margin: auto; width: 70%;padding-top: 15px;">
          <div class="echarts">
            <IEcharts :option="bar" ></IEcharts>
          </div>
          <div class="echarts">
            <IEcharts :option="line" ></IEcharts>
          </div>
          </div>
          -->
  </div>
</template>


<script>
import IEcharts from 'vue-echarts-v3';
export default {
    components: {
        IEcharts
    },


    data: () => ({
        bar: {
            color:["#20a0ff","#13CE66","#F7BA2A","#FF4949"],
            title: {
                text: "窗管家概况"
            },
            xAxis: {
                data: []
            },
            yAxis:{},
            series: []
        },

        line: {
            color:["#20a0ff","#13CE66","#F7BA2A","#FF4949"],
            title: {
                text: "近七天订单量"
            },
            xAxis: {
                data: []
            },
            yAxis:{},
            series: []
        },
        pie: {
            color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
            title : {
                text: '概况',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋"]
            },
            series : [
            {
                name: '销量',
                type: 'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                {value:335, name:'衬衫'},
                {value:310, name:'羊毛衫'},
                {value:234, name:'雪纺衫'},
                {value:135, name:'裤子'},
                {value:548, name:'高跟鞋'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
            ]
        },
        pie_radius:{
            color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
            title : {
                text: '环形图',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋"]
            },
            series : [
            {
                name: '销量',
                type: 'pie',
                radius : ['40%','60%'],
                data:[
                {value:335, name:'衬衫'},
                {value:310, name:'羊毛衫'},
                {value:234, name:'雪纺衫'},
                {value:135, name:'裤子'},
                {value:548, name:'高跟鞋'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
            ]
        }
    }),
    beforeMount() {
        //let self = this;
        //self.$http.get("last_days_chart.json").then(res => {
        //    self.line.xAxis.data = res.body.date;
        //    self.line.series = [{
        //        name: "订单量",
        //        type: "line",
        //        data: res.body.count
        //    }]
        //}, res => {
        //    self.$message.error("加载失败")
        //});
        //self.$http.get("asynis_models.json").then(res => {
        //    self.bar.xAxis.data = ["用户数", "订单数", "品牌商", "服务商", "交易量"];
        //    self.bar.series = [{
        //        name: "概况",
        //        type: "bar",
        //        data: [res.body.users, res.body.orders, res.body.company_users, res.body.server_users, res.body.payments]
        //    }]
        //})
    },
  created() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user.role == 'finance') {
      this.$router.push("/pay")
    }
  }
}
</script>

<style scoped>
.echarts {
    float: left;
    width: 500px;
    height: 400px;
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 45px;
    text-align: center;
    padding-top: 22px;
    font-size: 18px;
    font-weight: bold;
    color: #0a1509;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

