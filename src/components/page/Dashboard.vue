<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>控制面板</el-breadcrumb-item>
                <el-breadcrumb-item>图表</el-breadcrumb-item>
                </el-breadcrumb>
        </div>
        <div class="echarts">
            <IEcharts :option="bar" ></IEcharts>
        </div>
        <div class="echarts">
            <IEcharts :option="line" ></IEcharts>
        </div>
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
        let self = this;
        self.$http.get("last_days_chart.json").then(res => {
            self.line.xAxis.data = res.body.date;
            self.line.series = [{
                name: "订单量",
                type: "line",
                data: res.body.count
            }]
        }, res => {
            self.$message.error("加载失败")
        });
        self.$http.get("asynis_models.json").then(res => {
            self.bar.xAxis.data = ["用户数", "订单数", "品牌商", "服务商", "交易量"];
            self.bar.series = [{
                name: "概况",
                type: "bar",
                data: [res.body.users, res.body.orders, res.body.company_users, res.body.server_users, res.body.payments]
            }]
        })
    }
}
</script>

<style scoped>
.echarts {
    float: left;
    width: 500px;
    height: 400px;
}
</style>

