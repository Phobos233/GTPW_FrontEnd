<template lang="html">

    <div id="SearchLayout">

        <el-row justify="space-between" align="middle" id="nav">

            <el-col :span="6" align="start">
                <div id="btnBack">
                    <router-link to="/index">
                        <el-icon>
                            <ArrowLeft />
                        </el-icon>
                    </router-link>
                    搜索页
                </div>

            </el-col>
            <el-col :span="12" align="center">
                <el-input v-model="inputText" style="max-width: 600px;height: 80%;" placeholder="请输入搜索内容" clearable
                    size="large" class="input-with-select">
                    <template #prepend>
                        <el-select v-model="selectOp" style="width: 115px" default="1">
                            <el-option v-for="item in selectOps" :key="item.value" :value="item.value"
                                :label="item.label" />
                        </el-select>
                    </template>
                    <template #append>
                        <el-button @click="SearchFunc">搜索
                            <Search />
                        </el-button>
                    </template>
                </el-input>

            </el-col>

            <el-col :span="6" align="end">
                <el-button type="primary">设置</el-button>
            </el-col>

        </el-row>

        <el-row>
            <el-col :span="3" justify="center" align="middle">

            </el-col>
            <el-col :span="18" justify="center" align="middle">
                <div id="TableContainer">
                    <el-table :data="listData" style="width: 100%" height="80vh">
                        <el-table-column prop="id" label="ID"></el-table-column>

                        <el-table-column prop="taxon_name" label="学名"></el-table-column>

                        <el-table-column prop="ch_name" label="中文名"></el-table-column>

                        <el-table-column prop="taxon_rank" label="分类等级"></el-table-column>

                        <el-table-column label="操作">
                            <template #default="scope">
                                <el-button type="primary" @click="seeDetail(scope.row.taxon_rank,scope.row.taxon_name,scope.row.id)">查看</el-button>
                            </template>


                        </el-table-column>
                    </el-table>

                </div>
                <div class="pagination-block">

                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 30, 40, 50]" :size="size" :background="background"
                        layout="total,sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" />

                </div>
            </el-col>

            <el-col :span="3" justify="center" align="middle">

            </el-col>
        </el-row>

    </div>
    <el-dialog v-model="dialogFormVisible" id="SpeciesDetail">
        <el-row>
            <el-col :span="12" align="center">
                <div id="infoContainer">
                    <el-text>学名：{{ SpeciesdetailData[0].taxon_name }}</el-text>
                    <br />
                    <el-text>中文名：{{ SpeciesdetailData[0].ch_name }}</el-text>
                    <br />
                    <el-text>所属地区：{{ SpeciesdetailData[0].area }}</el-text>
                    <br />
                    <el-text>所属属：{{ SpeciesdetailData[0].genus }}</el-text>
                    <br />

                </div>
            </el-col>
            <el-col :span="12" align="center">
                <div id="imgContainer">
                    <el-image :src="imgURL" fit="contain" style="height: 50%;width: 50%;" />

                </div>
            </el-col>
        </el-row>
    </el-dialog>

    <el-dialog v-model="dialogFormVisibleGenus" id="GenusDetail">
        <el-row>
            <el-col :span="12" align="center">
                <div id="infoContainer">
                    <el-text>学名：{{ detailGenusData[0].taxon_name }}</el-text>
                    <br />
                    <el-text>中文名：{{ detailGenusData[0].ch_name }}</el-text>
                    <br />
                    <el-text>所属科：{{ detailGenusData[0].family }}</el-text>
                    <br />

                </div>
            </el-col>
            <el-col :span="12" align="center">
                <div id="minichartContainer">
                    <!-- <v-chart :options="depOption" style="width: 100%; height: 100%;"></v-chart>
                      -->
                    <el-image :src="imgURL" fit="contain" style="height: 50%;width: 50%;" />

                </div>
            </el-col>
        </el-row>
    </el-dialog>

</template>
<script lang="ts" setup>

//引入
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue'
import axios from 'axios';
import { id } from 'element-plus/es/locales.mjs';
import imgURL from '@/res/img/sample.png';

import {
    TitleComponent
    , TooltipComponent
    , LegendComponent,
    VisualMapComponent
} from 'echarts/components';
import { GraphChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { use } from 'echarts/core';
import VChart, { THEME_KEY } from 'vue-echarts';
use([TitleComponent
    , GraphChart
    , CanvasRenderer
    , TooltipComponent
    , LegendComponent
    , VisualMapComponent
]);

let nodedata = ref([])
let linkdata = ref([])

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
                large: true,
                roam: true, // 允许拖拽缩放
                layout: "force",
                symbolSize: 50, // 节点大小
                symbol: 'circle', // 节点形状
                force: {
                    repulsion: 1500, // 节点间斥力
                    gravity: 0.5,    // 向心力
                    edgeLength: 200 // 边的理想长度
                },
                data: nodedata, // 节点数据
                links: linkdata,
                label: {
                    show: true, // 显示标签
                    position: 'left', // 标签位置
                    formatter: '{c}', // 标签格式
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


//路由
const route = useRoute();
const router = useRouter();

//分页组件变量
const currentPage = ref(1);
const size = ref('default');
const pageSize = ref(10);
const background = ref(true);

//搜索组件变量
let inputText = ref('');
let total = ref(100);
let dialogFormVisible = ref(false);
let dialogFormVisibleGenus = ref(false);
let selectOps = [
    { value: '1', label: '学名' },
    { value: '2', label: '中文名' },
    { value: '3', label: '地区' }
];
let selectOp = ref();
let listData = ref([]);
let SpeciesdetailData = ref([{
    taxon_name: String,
    family: String,
    genus: String,
    genus_c: String,
    species: String,
    ch_name: String,
    area: String,
    taxon_rank: String,
    imgURL: String
}]);

let detailGenusData = ref([{
    node_id: Number,
    taxon_name: String,
    family: String,
    genus: String,
    ch_name: String,
}]);

//分页触发函数
const handleSizeChange = (val: number) => {
    SearchFunc();
    console.log(`${val} 条数据每页`)
}
const handleCurrentChange = (val: number) => {
    SearchFunc();
    console.log(`当前页码: ${val}`);
}

function seeDetail(taxon_rank: string,taxon_name: string,id: number) {
    console.log('查看详情');
    console.log(id);
    if(taxon_rank === 'Genus') {
        SearchNodesInneed(taxon_name);
        SearchLinkInneed(id);
        seeGenusDetail(id);
        console.log('属');
        console.log('查看详情');
    } else if(taxon_rank === 'Species') {
        seeSpeciesDetail(id);
        console.log('种');
        console.log('查看详情');
    }
}

//搜索详细信息
function seeSpeciesDetail(id: number) {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findSpeciesByNodeId', // Replace with your actual API endpoint
        params: {
            id: id, // Use the search query from the input field
        }
    })
        .then(response => {
            SpeciesdetailData.value = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
    console.log(id);
    console.log('查看详情');
    dialogFormVisible.value = true;
}

function seeGenusDetail(id: number) {
    console.log(id);
    console.log('查看属详情');
    axios({
        method: 'post',
        url: 'http://localhost:8080/findGenusByNodeId', // Replace with your actual API endpoint
        params: {
            id: id, // Use the search query from the input field
        }
    })
        .then(response => {
            detailGenusData.value = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });

    dialogFormVisibleGenus.value = true;
}

//搜索&条件搜索
function SearchAll() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findNodesWithPages', // Replace with your actual API endpoint
        params: {
            page: currentPage.value,
            size: pageSize.value
            // Use the search query from the input field
        }
    })
        .then(response => {
            listData.value = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching all data:', error);
        });
    return listData.value
}

function SearchByTaxonName() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findNodesByTaxonNameContainsWithPage', // Replace with your actual API endpoint
        params: {
            taxon_name: inputText.value, // Use the search query from the input field
            page: currentPage.value,
            size: pageSize.value
        }
    })
        .then(response => {
            listData.value = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching list data:', error);
        });
    return listData.value
}

function SearchByChName() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findNodesByChNameContainsWithPage', // Replace with your actual API endpoint
        params: {
            ch_name: inputText.value, // Use the search query from the input field
            page: currentPage.value,
            size: pageSize.value
        }
    })
        .then(response => {
            listData.value = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching list data:', error);
        });
    return listData.value
}

//计数
function SearchAllCounts() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/getAllListInfoCounts', // Replace with your actual API endpoint
        params: {
            // Use the search query from the input field
        }
    })
        .then(response => {
            total.value = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching allcount data:', error);
        });
    return total.value
}

function SearchCountsByTaxonName() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/getListInfoCountsByTaxonNameContains', // Replace with your actual API endpoint
        params: {
            taxon_name: inputText.value, // Use the search query from the input field
        }
    })
        .then(response => {
            total.value = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching taxonnamecount data:', error);
        });
    return total.value
}

function SearchCountsByChName() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/getListInfoCountsByChNameContains', // Replace with your actual API endpoint
        params: {
            ch_name: inputText.value, // Use the search query from the input field
        }
    })
        .then(response => {
            total.value = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching chnamecounts data:', error);
        });
    return total.value
}

//搜索功能
function SearchFunc() {
    console.log('搜索');
    console.log(inputText.value);
    console.log(selectOp.value);
    if (inputText.value === '') {
        SearchAllCounts();
        SearchAll();
    } else {
        switch (selectOp.value) {
            case '1': {
                console.log('学名');
                SearchCountsByTaxonName();
                SearchByTaxonName();
                break;
            }

            case '2': {
                console.log('中文名');
                SearchCountsByChName();
                SearchByChName();
                break;
            }

            case '3': {
                console.log('地区');
                
                break;
            }

            default:
                SearchAll();
                break;
        }
    }


}

function SearchNodesInneed(genus: string) {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findCNodesByGenus', // Replace with your actual API endpoint
        params: {
            genus: genus, // Use the search query from the input field
        }
    })
        .then(response => {
            nodedata.value = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
    return listData.value
}

function SearchLinkInneed(node_id: number) {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findCEdgesByGenus', // Replace with your actual API endpoint
        params: {
            genus_id: node_id, // Use the search query from the input field
        }
    })
        .then(response => {
            linkdata.value = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
    return linkdata.value
}



//加载函数
onMounted(() => {
    if (route.query.name) {
        console.log(route.query.name);
        inputText.value = route.query.name as string;
        selectOp.value = route.query.type as string;
        console.log('路由传参');
        console.log(inputText.value);
        SearchFunc();
    } else {
        console.log('没有路由传参');
        SearchAllCounts();
        SearchAll();
        selectOp.value = '1';
    }
    // document.title = '金三角植物物种数据可视化平台';
    // Perform any additional setup or API calls here
});

</script>

<style lang="css" scoped>
#SearchLayout {
    width: 100%;
    height: 100vh;
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

#TableContainer {
    border-radius: 10px;
    margin-top: 2%;
}
#GenusDetail{
    width: 500px;
    height: 500px;
    border-radius: 10px;
    margin-top: 2%;

}
#minichartContainer {
    width: 50%;
    height: 100%;
    border-radius: 10px;
    margin-top: 2%;
}

.pagination-block {
    width: 100%;
    height: 10vh;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>