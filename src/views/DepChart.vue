<template>
    <v-chart id="depChart" :option="option" autoresize @click="detail" />
    <el-drawer
    v-model="drawer"
    title="植物详细信息"
    direction="rtl">
    <div class="plantInfo">
        <el-text>植物名称：{{ rawData[0].taxon }}</el-text>
        <br/>
        <el-text>植物分类：{{ rawData[0].family }}</el-text>
        <br/>
        <el-text>发现地区：{{ rawData[0].region }}</el-text>
        <br/>
        <el-text>所属国家：{{ rawData[0].country }}</el-text>
        <br/>
        <el-text>图片：</el-text>
    </div>

    </el-drawer>
</template>
<script setup lang="ts">
import axios from 'axios';
import { onMounted, provide, ref, toRaw, toRef, toRefs } from 'vue';
import VChart, { THEME_KEY } from 'vue-echarts';
import { use } from 'echarts/core';
import {
    TitleComponent
    , TooltipComponent
    , LegendComponent
} from 'echarts/components';
import { GraphChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { id } from 'element-plus/es/locales.mjs';

use([TitleComponent
    , GraphChart
    , CanvasRenderer
    , TooltipComponent
    , LegendComponent]);

// provide(THEME_KEY, 'dark');

interface rawNode {
    id: number;
    label: Array<string>;
    taxon: string;
    region: string;
    family: string;
    country: string;
}
interface rawEdge {
    source: string;
    target: string;
    type: string;
}
const drawer = ref(false)

let data = ref([])
let linkdata = ref([])
let rawData = ref([{
    id: Number,
    label: [],
    taxon: '',
    region: '',
    family: '',
    country: ''
}])

const option = ref(
    {
        title: {
            text: '植物分类点状图',
            left: 'center',
            top: '10px',
        },
        tooltip: {
            trigger: 'item', // 触发类型
            formatter: '{b} <br/> {c}', // 标签格式
        },
        label: {
            show: true, // 显示标签
            position: 'left', // 标签位置
            formatter: '{b}', // 标签格式
            fontSize: 12, // 字体大小
            color: '#fff' // 字体颜色
        },

        series: [
            {
                name: '植物分类点状图',
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                type: 'graph',
                roam: true, // 允许拖拽缩放
                layout: "force",
                SymbolSize: 50, // 节点大小
                Symbol: 'circle', // 节点形状
                force: {
                    repulsion: 100, // 节点间斥力
                    gravity: 1,    // 向心力
                    edgeLength: 50 // 边的理想长度
                },
                data: data, // 节点数据
                links: linkdata,

                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 10
                    }
                }
            }
        ]
    }
)

function SearchAllNodes() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/Chart', // Replace with your actual API endpoint
        // params: {
        //     search: this.searchQuery // Use the search query from the input field
        // }

    })
        .then(response => {
            data.value = response.data;
        })
        .catch(error => {
            console.log('Error fetching plant data:', error);
        });
    return data.value
}
function SearchAllEdges() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/getEdgesForCharts', // Replace with your actual API endpoint
        // params: {
        //     search: this.searchQuery // Use the search query from the input field
        // }

    })
        .then(response => {
            linkdata.value = response.data;
            console.log(linkdata.value)
        })
        .catch(error => {
            console.log('Error fetching plant data:', error);
        });
    return linkdata.value
}
function SearchRawData(id: number) {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findById', // Replace with your actual API endpoint
        params: {
            id: id // Use the search query from the input field
        }

    })
        .then(response => {
            rawData.value = response.data;
            console.log(rawData.value)
        })
        .catch(error => {
            console.log('Error fetching plant data:', error);
        });
    return rawData.value

}

function detail(params: any) {
    console.log(params.data.id)
    drawer.value = true
    SearchRawData(params.data.id)

    console.log(rawData.value)
}

onMounted(() => {
    SearchAllNodes()
    SearchAllEdges()
})




</script>
<style lang="css" scoped>
#depChart {

    height: 100vh;
}
</style>