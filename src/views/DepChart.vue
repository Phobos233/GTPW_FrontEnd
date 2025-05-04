<template>
    <v-chart id="depChart" :option="mapOption" autoresize @click="detail" />
    <el-drawer v-model="drawer" title="植物详细信息" direction="rtl">
        <div class="plantInfo">
            <el-text>植物名称：{{ rawData[0].taxon }}</el-text>
            <br />
            <el-text>植物分类：{{ rawData[0].family }}</el-text>
            <br />
            <el-text>发现地区：{{ rawData[0].region }}</el-text>
            <br />
            <el-text>所属国家：{{ rawData[0].country }}</el-text>
            <br />
            <el-text>
                图片： </el-text>
            <el-image src="src/res/img/sample.png" fit="contain" style="height: 50%;width: 50%;" />


        </div>

    </el-drawer>
</template>
<script setup lang="ts">

import axios from 'axios';
import { onMounted, provide, ref, toRaw, toRef, toRefs } from 'vue';
import VChart, { THEME_KEY } from 'vue-echarts';
import { use } from 'echarts/core';
import GT from "@/res/json/MapJson.json";
import {
    TitleComponent
    , TooltipComponent
    , LegendComponent,
    GeoComponent,
    VisualMapComponent
} from 'echarts/components';
import { GraphChart, MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';

use([TitleComponent
    , GraphChart
    , CanvasRenderer
    , TooltipComponent
    , LegendComponent
    , GeoComponent
    , MapChart
    , VisualMapComponent
]);

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
const drawer = ref(false)
const mapData: any = GT
const depOption = ref(
    {
        title: {
            text: '植物分类点状图',
            left: 'center',
            top: '20px',
        },
        tooltip: {
            trigger: 'item', // 触发类型
            formatter: '{b} <br/> {c}', // 标签格式
        },

        series: [
            {
                name: '植物分类点状图',
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                type: 'graph',
                roam: true, // 允许拖拽缩放
                layout: "force",
                symbolSize: 50, // 节点大小
                symbol: 'circle', // 节点形状
                force: {
                    repulsion: 1500, // 节点间斥力
                    gravity: 0.5,    // 向心力
                    edgeLength: 200 // 边的理想长度
                },
                data: data, // 节点数据
                links: linkdata,
                label: {
                    show: true, // 显示标签
                    position: 'left', // 标签位置
                    formatter: '{b}', // 标签格式
                    fontSize: 12, // 字体大小
                    color: '#000000' // 字体颜色
                },
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
const mapOption = ref(
    {
        title: {
            text: '金三角地区植物分布图',
            left: 'center',
            top: '20px',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} <br/> {c}'
        },
        series: [
            {
                name: '金三角地区植物分布图',
                type: 'map',
                map: 'GT',
                roam: true,
                zoom: 1.2,
                label: {
                    show: true,
                    fontSize: 12,
                    color: '#000000'
                },
                itemStyle: {
                    areaColor: '#f0f0f0',
                    borderColor: '#999999',
                    borderWidth: 1
                },
                emphasis: {
                    itemStyle: {
                        areaColor: '#ffcc00'
                    }
                },
                data: [
                    { name: '克钦邦', value: 3829 },
                    { name: '掸邦', value: 3829 },
                    { name: '琅南塔', value: 846 },
                    { name: '琅勃拉邦', value: 846 },
                    { name: '乌多姆赛', value: 846 },
                    { name: '丰沙里', value: 846 },
                    { name: '波乔', value: 846 },
                    { name: '清莱', value: 4817 },
                    { name: '清迈', value: 4817 }
                ], // 这里可以添加地图数据
                nameMap: {
                    "Kachin": '克钦邦'
                    , "Shan": '掸邦'
                    , "Louangnamtha": '琅南塔'
                    , "Louangphabang": '琅勃拉邦'
                    , "Oudomxai": '乌多姆赛'
                    , "Phongsaly": '丰沙里'
                    , "Bokeo": '波乔'
                    , "Chiang Rai": '清莱'
                    , "Chiang Mai": '清迈'
                },
            }
        ]

    }
)
const chartOptionRef = ref()

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

function mapInit() {
    echarts.registerMap('GT', mapData)
}
function ChartSwitch() {
    if (chartOptionRef.value === mapOption.value) {
        chartOptionRef.value = depOption.value
    } else {
        chartOptionRef.value = mapOption.value
    }
}

onMounted(() => {
    mapInit()
    SearchAllNodes()
    SearchAllEdges()
})


</script>
<style lang="css" scoped>
#depChart {
    height: 100vh;
}
</style>