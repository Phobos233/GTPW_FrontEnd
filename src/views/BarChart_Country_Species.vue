<template lang="html">
    <div id="BarChartLayout" >
        <VChart :option="BarOption" autoresize  style="width: 100%; height: 100%;"></VChart>
    </div>
</template>
<script setup lang="ts">
import VChart, { THEME_KEY } from 'vue-echarts';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers';

import * as echarts from 'echarts/core';
import { onMounted, ref } from 'vue';
import axios from 'axios';

use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]);
let dataset = ref([ {
        "value": 10110,
        "name": "Myanmar"
    },
    {
        "value": 11636,
        "name": "Thailand"
    },
    {
        "value": 5449,
        "name": "Laos"
    }])

const BarOption = {
    title: {
        text: '金三角三国植物分布柱状图',
        left: 'center',
        top: '20px',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} <br/> {c}'
    },
    xAxis: {
        type: 'category',
        data: [dataset.value[0].name, dataset.value[1].name, dataset.value[2].name]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Sales',
            type: 'bar',
            data: [dataset.value[0].value, dataset.value[1].value,dataset.value[2].value],
            itemStyle: {
                color: '#5470C6'
            }
        }
    ]
};


function SearchBarData() {
  axios({
    method: 'post',
    url: 'http://localhost:8080/BarChart_Count_Species', // Replace with your actual API endpoint
    // params: {
    //     search: this.searchQuery // Use the search query from the input field
    // }

  })
    .then(response => {
      dataset.value = response.data;
      console.log(response.data);
    })
    .catch(error => {
      console.log('Error fetching number data:', error);
    });
  return dataset
}
onMounted(() => {
    SearchBarData()
})

</script>
<style lang="css" scoped>
    #BarChartLayout {
        width: 100%;
        height: 100%;
                background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        display: flex;
    }
</style>