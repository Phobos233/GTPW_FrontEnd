<template lang="html">
    <div>
        <el-table :data="data" style="width: 100%" height="80%">
            <el-table-column prop="Collector" label="操作用户"></el-table-column>
            <el-table-column prop="Collection" label="收藏对象"></el-table-column>
            <el-table-column prop="CollectId" label="收藏操作id"></el-table-column>
            <el-table-column prop="datetime" label="收藏时间"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    
                    <el-button type="danger" @click="deleteCollect(scope)">取消收藏</el-button>

                </template>

            </el-table-column>
        </el-table>
    </div>
    <div>
        <div class="pagination-block">

            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40, 50]" :size="size" :background="background"
                layout="total,sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />

        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import axios from 'axios';
import { onMounted } from 'vue';

const currentPage = ref(1);
const size = ref('default');
const pageSize = ref(10);
const background = ref(true);
let total = ref(100);

let listdata = ref([{
    CollectId: Number,
    Collector: String,
    CollectorId: Number,
    Collection: String,
    CollectionId: Number,
    datetime: String,
}])
let data = ref([
    {
        taxon_name: '学名',
        family: '分类学所属科',
        genus: '分类学所属属',
        species: '分类学所属种',
        ch_name: '中文名',
        country: '所属国家',
        imgURL: '图片'
    }
]);

const handleSizeChange = (val: number) => {
    getCollectList()
    console.log(`${val} 条数据每页`)
}
const handleCurrentChange = (val: number) => {
    getCollectList()
    console.log(`当前页码: ${val}`);
}

function deleteCollect(collectId: number) {
    axios({
        method: 'post',
        url: 'http://localhost:8080/collect/delete', // Replace with your actual API endpoint
        params: {
            CollectId: collectId,
        }
    })
        .then(response => {
            console.log('Delete response:', response.data);
            getCollectList();
            getCollectListCount()
        })
        .catch(error => {
            console.log('Error deleting collect:', error);
        });
}

function getCollectList() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/collect/find/collectorId/Page', // Replace with your actual API endpoint
        params: {
            CollectorId: 19939,
            page: currentPage.value,
            size: pageSize.value// Use the search query from the input field
        }

    })
        .then(response => {
            listdata.value = response.data;
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
    return listdata.value
}

function getCollectListCount() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/collect/count/collectorId', // Replace with your actual API endpoint
        params: {
            CollectorId: 19939,
            // Use the search query from the input field
        }

    })
        .then(response => {
            total.value = response.data;
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
    return total.value
}

onMounted(() => {
    getCollectListCount();
    getCollectList();
    console.log('mounted')
})


</script>

<style lang="css"></style>