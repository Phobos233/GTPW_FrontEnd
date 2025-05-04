import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/manage",
            name: "manageIndex",
            component: () => import("../views/ManageIndex.vue"),
            children: [
                {
                    path: "home",
                    name: "Home",
                    component: () => import("../views/Home.vue"),
                },
                {
                    path: "plantNode",
                    name: "PlantModeManage",
                    component: () => import("../views/PlantNodeManage.vue"),
                },
                {
                    path:"plantRelation",
                    name:"PlantRelationManage",
                    component: () => import("../views/PlantRelationshipManage.vue"),
                },
                {
                    path: "user",
                    name: "UserManage",
                    component: () => import("../views/UserManage.vue"),
                }
            ]
        },
        {
            path: "/index",
            name: "Index",
            component: () => import("../views/SiteIndex.vue"),
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("../views/Login.vue"),  
        },
        {
            path: "/",
            redirect: "/index",
        },
        {
            path: "/chart",
            name: "Chart",
            component: () => import("../views/ChartView.vue"),
            children: [
                {
                    path: "RelationChart",
                    name: "RelationMap",
                    component: () => import("../views/DepChart.vue"),
                },
                {
                    path: "MapChart",
                    name: "RegionMap",
                    component: () => import("../views/MapChart.vue"),
                },
            ]
        },
        {
            path: "/test",
            name: "Test",
            component: () => import("../views/testchart.vue"),
        }
    ],
})
export default router