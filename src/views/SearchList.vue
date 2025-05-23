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
                            <el-button type="primary" @click="seeDetail">查看</el-button>
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
    <el-dialog v-model="dialogFormVisible">
        <el-row>
            <el-col :span="12" align="center">
                1
            </el-col>
            <el-col :span="12" align="center">
                2
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
let selectOps = [
    { value: '1', label: '学名' },
    { value: '2', label: '中文名' },
    { value: '3', label: '地区' }
];
let selectOp = ref();
let listData = ref([]);

//分页触发函数
const handleSizeChange = (val: number) => {
    SearchFunc();
    console.log(`${val} 条数据每页`)
}
const handleCurrentChange = (val: number) => {
    SearchFunc();
    console.log(`当前页码: ${val}`);
}

//搜索详细信息
function seeDetail() {
    console.log('查看详情');
    dialogFormVisible.value = true;
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


.pagination-block {
    width: 100%;
    height: 10vh;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>