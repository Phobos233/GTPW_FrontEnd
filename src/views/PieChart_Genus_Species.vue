<template lang="html">
    <div id="PieChartLayout">
        <VChart :option="PieOption" autoresize style="width: 100%; height: 100%;"></VChart>
    </div>
</template>
<script setup lang="ts">
import VChart, { THEME_KEY } from 'vue-echarts';

import { onMounted, ref } from 'vue';
import axios from 'axios';
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

let dataset = ref([])


const PieOption = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    series: [
        {
            name: '金三角植物物种数量分布-饼图（按属划分）',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 32,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {
                    "value": 434,
                    "name": "石斛属"
                },
                {
                    "value": 416,
                    "name": "石豆兰属"
                },
                {
                    "value": 274,
                    "name": "榕属"
                },
                {
                    "value": 204,
                    "name": "秋海棠属"
                },
                {
                    "value": 182,
                    "name": "蒲桃属"
                },
                {
                    "value": 177,
                    "name": "马蓝属"
                },
                {
                    "value": 165,
                    "name": "莎草属"
                },
                {
                    "value": 164,
                    "name": "贝母兰属"
                },
                {
                    "value": 160,
                    "name": "杜鹃花属"
                },
            ]
        }
    ]
};

function SearchPieData() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/PieChart_Count_Genus_Belong', // Replace with your actual API endpoint
        // params: {
        //     search: this.searchQuery // Use the search query from the input field
        // }

    })
        .then(response => {
            dataset.value = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching piecount data:', error);
        });
    return dataset;
}
onMounted(() => {
    // SearchPieData()
})

</script>
<style lang="css" scoped>
#PieChartLayout {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
}
</style>