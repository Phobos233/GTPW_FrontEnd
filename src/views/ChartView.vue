<template lang="html">
    <div id="ChartLayout">

        <el-container>

            <el-header id="nav" height="10vh">

                <el-row justify="start" align="middle">

                    <el-col :span="1" align="middle">
                        <router-link to="/index">
                            <el-icon>
                                <ArrowLeft />
                            </el-icon>
                        </router-link>
                    </el-col>
                    <el-col :span="8" align="start">
                        图表导航
                    </el-col>
                    <el-col :span="9" align="bottom">
                        <el-menu mode="horizontal" default-active="/chart/MapChart" router>
                            <el-menu-item index="/chart/MapChart">地图视图</el-menu-item>
                            <el-menu-item index="/chart/RelationChart">关系视图</el-menu-item>
                            <el-menu-item index="/login">饼图</el-menu-item>
                        </el-menu>
                    </el-col>
                    <el-col :span="6" align="end">
                        <el-button type="primary">设置</el-button>
                        <el-button type="danger">退出</el-button>
                    </el-col>

                </el-row>

            </el-header>

            <el-main id="MainChartView" height="80vh">

                <RouterView></RouterView>
            </el-main>

        </el-container>

    </div>
</template>
<script lang="ts" setup>
import { RouterView } from 'vue-router';

</script>
<style scoped>
#nav {
    background-color: #ffffff7c;
    padding: 10px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    align-items: center;
}
</style>