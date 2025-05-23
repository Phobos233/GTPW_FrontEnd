import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import MapChart from "../views/MapChart.vue";
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
                    path: "SpeciesNode",
                    name: "SpeciesNodeManage",
                    component: () => import("../views/SpeciesNodeManage.vue"),
                },
                {
                    path: "GenusNode",
                    name: "GenusNodeManage",
                    component: () => import("../views/GenusNodeManage.vue"),
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
            path: "/",
            redirect: "/index",
        },
        {
            path: "/chartsindex",
            name: "ChartsIndex",
            component: () => import("../views/ChartIndex.vue"),
        },
        {
            path: "/Relationchart",
            name: "RelationChart",
            component: () => import("../views/DepChart.vue"),
        },
        {
            path: "/Search",
            name: "Search",
            component: () => import("../views/SearchList.vue"),
        },
    ],
})
export default router