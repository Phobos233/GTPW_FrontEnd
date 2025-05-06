<template lang="html">
    <div>
        <v-chart :option="mapOption" style="width: 100%; height: 100vh;"></v-chart>
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

use([
    TitleComponent,
    MapChart,
    CanvasRenderer,
    TooltipComponent,
    LegendComponent,
    GeoComponent,
    VisualMapComponent
]);

const GTMap:any= GT;

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


</script>
<style lang="">
    
</style>