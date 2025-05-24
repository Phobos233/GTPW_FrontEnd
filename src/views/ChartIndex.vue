<template lang="html">
    <div id="ChartLayout">

        <el-row justify="space-between" align="middle" id="nav">

            <el-col :span="6" align="start">
                <div id="btnBack">
                    <router-link to="/index">
                        <el-icon>
                            <ArrowLeft />
                        </el-icon>
                    </router-link>
                    图表导航
                </div>

            </el-col>
            <el-col :span="12" align="center">
                <el-input v-model="inputText" style="max-width: 600px;height: 80%;" placeholder="请输入搜索内容" clearable
                    size="large" class="input-with-select">
                    <template #prepend>
                        <el-select placeholder="搜索选项" style="width: 115px" v-model="selectOp">
                            <el-option v-for="item in selectOps" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </template>
                    <template #append>
                        <el-button @click="goToSearch">搜索
                            <Search />
                        </el-button>
                    </template>
                </el-input>

            </el-col>

            <el-col :span="6" align="end">
                <el-button type="primary">设置</el-button>
            </el-col>

        </el-row>

        <el-row id="mainC" justify="space-around" align="middle">
            <el-col :span="8" justify="center" align="middle">
                <div id="leftupper">
                    <BarChart_Country_Species />
                </div>
                <div id="leftlower">
                    <PieChart_Genus_Species />
                </div>


            </el-col>
            <el-col :span="8" id="mapChart" justify="center" align="middle">
                <div id="middle">
                    <MapChart />
                </div>

            </el-col>
            <el-col :span="8" justify="center" align="middle">
                <div id="rightupper">
                    <AreaChart />
                </div>
                <div id="rightlower">
                    <PieChart_Area_Species />
                </div>
            </el-col>
        </el-row>



    </div>
</template>
<script setup lang="ts">

import MapChart from './MapChart.vue';
import BarChart_Country_Species from './BarChart_Country_Species.vue';
import PieChart_Genus_Species from './PieChart_Genus_Species.vue';
import PieChart_Area_Species from './PieChart_Area_Species.vue';
import AreaChart from './AreaChart.vue';
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();
const selectOps = [
    { value: '1', label: '学名' },
    { value: '2', label: '中文名' },
    { value: '3', label: '地区' }
];

let inputText = ref('');
let selectOp = ref();


function goToSearch() {
    console.log(inputText.value);
    router.push({ path: '/Search', query: { name: inputText.value, type: selectOp.value } });
    // Perform search logic here
}
onMounted(() => {
    selectOp.value = '1';
});

</script>
<style lang="css" scoped>
#ChartLayout {
    width: 100%;
    height: 100vh;
}

#mainC {
    width: 100%;
    height: 92%;
}

#nav {
    background-color: #6cf8507c;
    padding: 10px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    align-items: center;
    margin: auto;
    height: 8%;
}

#leftupper {
    width: 95%;
    height: 45vh;
    margin: 5px;
}

#leftlower {
    width: 95%;
    height: 45vh;
    margin: 5px;
}

#middle {
    width: 100%;
    height: 90vh;
    margin: 5px;
}

#rightupper {
    width: 95%;
    height: 45vh;
    margin: 5px;
}

#rightlower {
    width: 95%;
    height: 45vh;
    margin: 5px;
}
</style>