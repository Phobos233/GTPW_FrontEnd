<template lang="html">
    <div class="ChartLayout">
        <v-chart :option="mapOption" autoresize style="width: 100%; height: 100%;" v-on:click="transTo"></v-chart>
    </div>
</template>
<script lang="ts" setup>
import VChart, { THEME_KEY } from 'vue-echarts';
import { use } from 'echarts/core';
import { onMounted, ref } from 'vue';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';

import GT from "@/res/json/MapJson.json";

import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GeoComponent,
    VisualMapComponent
} from 'echarts/components';
import { MapChart } from 'echarts/charts';
import { useRouter } from 'vue-router';
import { Switch } from '@element-plus/icons-vue';

use([
    TitleComponent,
    MapChart,
    CanvasRenderer,
    TooltipComponent,
    LegendComponent,
    GeoComponent,
    VisualMapComponent
]);

const GTMap: any = GT;

echarts.registerMap('GT', GTMap);

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
        visualMap: {
            min: 4000,
            max: 12000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            calculable: true,
            inRange: {
                color: ['#5DE2E7', '#ffcc00']
            },
            textStyle: {
                color: '#000000'
            }
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
                    { name: '克钦邦', value: 10104 },
                    { name: '掸邦', value: 10104 },
                    { name: '琅南塔', value: 5448 },
                    { name: '琅勃拉邦', value: 5448 },
                    { name: '乌多姆赛', value: 5448 },
                    { name: '丰沙里', value: 5448 },
                    { name: '波乔', value: 5448 },
                    { name: '清莱', value: 11634 },
                    { name: '清迈', value: 11634 }
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
const router = useRouter()

function transTo(params: any) {

    switch (params.data.name) {
        default:
            console.log('default');
            router.push({ path: '/RelationChart', query: { name: 'Myanmar' } });
            break;
        case '克钦邦':
            console.log('克钦邦');
            router.push({ path: '/RelationChart', query: { name: 'Myanmar' } });
            break;
        case '掸邦':
            console.log('掸邦');
            router.push({ path: '/RelationChart', query: { name: 'Myanmar' } });
            break;
        case '琅南塔':
            console.log('琅南塔');
            router.push({ path: '/RelationChart', query: { name: 'Laos' } });
            break;
        case '琅勃拉邦':
            console.log('琅勃拉邦');
            router.push({ path: '/RelationChart', query: { name: 'Laos' } });
            break;
        case '乌多姆赛':
            console.log('乌多姆赛');
            router.push({ path: '/RelationChart', query: { name: 'Laos' } });
            break;
        case '丰沙里':
            console.log('丰沙里');
            router.push({ path: '/RelationChart', query: { name: 'Laos' } });
            break;
        case '波乔':
            console.log('波乔');
            router.push({ path: '/RelationChart', query: { name: 'Laos' } });
            break;
        case '清莱':
            console.log('清莱');
            router.push({ path: '/RelationChart', query: { name: 'Thailand' } });
            break;
        case '清迈':
            console.log('清迈');
            router.push({ path: '/RelationChart', query: { name: 'Thailand' } });
            break;
    }

    // 这里可以进行一些初始化操作
    console.log(params);
    // router.push('/Index');

}



</script>
<style lang="css">
.ChartLayout {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
}
</style>