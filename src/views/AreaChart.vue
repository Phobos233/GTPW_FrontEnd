<template lang="html">
    <div id="AreaChartLayout">
        <VChart :option="AreaOption" autoresize style="width: 100%; height: 100%;"></VChart>

    </div>
</template>
<script setup lang="ts">
import VChart, { THEME_KEY } from 'vue-echarts';
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, ref } from 'vue';
use([GridComponent, LineChart, CanvasRenderer])
const AreaOption = {
    title: {
        text: '金三角地区近十年新发现植物数量面积图',
        left: 'center',
        top: '20px',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} <br/> {c}'
    },
    xAxis: {
        type: 'category',
        data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Area',
            type: 'line',
            data: [257, 192, 148, 174, 439, 224, 194, 248, 187, 95],
            itemStyle: {
                color: '#5470C6'
            },
            areaStyle: {}
        }
    ]
}


</script>
<style lang="css" scoped>
#AreaChartLayout {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
}
</style>