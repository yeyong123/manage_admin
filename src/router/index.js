import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve)
                },
                {
                    path: "/audit",
                    component: resolve => require(["../components/page/Audit.vue"], resolve)
                },
                {
                    path: "/users",
                    component: resolve => require(["../components/page/Users.vue"], resolve)
                },
                {
                    path: "/users/:id",
                    component: resolve => require(["../components/page/UserDetail.vue"], resolve)
                },

                {
                    path: "/orders",
                    component: resolve => require(["../components/page/Orders.vue"], resolve)
                },
                {
                    path: "/orders/:id",
                    component: resolve => require(["../components/page/OrderDetail.vue"], resolve)
                },

                {
                    path: "/payments",
                    component: resolve => require(["../components/page/Payments.vue"], resolve)
                },
                {
                    path: "/companies",
                    component: resolve => require(["../components/page/Companies.vue"], resolve)
                },
                {
                    path: "/companies/:id",
                    component: resolve => require(["../components/page/CompanyDetail.vue"], resolve)
                },
                {
                    path: "/admins",
                    component: resolve => require(["../components/page/Admin.vue"], resolve)
                },
                {
                    path: "/mail",
                    component: resolve => require(["../components/page/Mail.vue"], resolve)
                },
                {
                    path: "/rate",
                    component: resolve => require(["../components/page/Rate.vue"], resolve)
                },
                {
                    path: "/profits",
                    component: resolve => require(["../components/page/Profits.vue"], resolve)
                },
                {
                    path: "/libs",
                    component: resolve => require(["../components/page/Libs.vue"], resolve)
                },

                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/encashs',
                    component: resolve => require(['../components/page/Encashs.vue'], resolve)   // vue-echarts-v3组件
                },
                {
                    path: '/encash_users',
                    component: resolve => require(['../components/page/EncashUsers.vue'], resolve)   // vue-echarts-v3组件
                },
                {
                    path: '/invoices',
                    component: resolve => require(['../components/page/Invoices.vue'], resolve)   // vue-echarts-v3组件
                },

                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-echarts-v3组件
                },
                {
                    path: '/mixcharts',
                    component: resolve => require(['../components/page/MixCharts.vue'], resolve)    // vue-echarts-v3组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
