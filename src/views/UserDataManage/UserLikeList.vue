<template lang="html">
    <div>
        <el-table :data="listdata" style="width: 100%">
            <el-table-column prop="author" label="操作用户"></el-table-column>
            <el-table-column prop="likeTo" label="点赞对象"></el-table-column>
            <el-table-column prop="likeId" label="点赞操作id"></el-table-column>
            <el-table-column prop="datetime" label="点赞时间"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" @click="deleteLike(scope.row.likeId)">取消点赞</el-button>
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
    author: String,
    likeTo: String,
    likeId: Number,
    datetime: String,
    authorId: Number,
    likeToId: Number,
}])

let data = ref([
    {
        author: '学名',
        family: '分类学所属科',
        genus: '分类学所属属',
        species: '分类学所属种',
        ch_name: '中文名',
        country: '所属国家',
        imgURL: '图片'
    }
]);

function getLikeList() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/like/find/authorId/Page', // Replace with your actual API endpoint
        params: {
            authorId: 19939,
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

function deleteLike(id: number) {
    axios({
        method: 'post',
        url: 'http://localhost:8080/like/delete', // Replace with your actual API endpoint
        params: {
            likeId: 19939,
            // Use the search query from the input field
        }

    })
        .then(response => {
            getLikeList();
            getLikeListCount();
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });


    return listdata.value
}

function getLikeListCount() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/like/count/authorId', // Replace with your actual API endpoint
        params: {
            authorId: 19939,
            // Use the search query from the input field
        }

    })
        .then(response => {
            total.value = response.data;
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
    return listdata.value
}

const handleSizeChange = (val: number) => {
    getLikeList();
    console.log(`${val} 条数据每页`)
}
const handleCurrentChange = (val: number) => {
    getLikeList();
    console.log(`当前页码: ${val}`);
}

onMounted(() => {
    getLikeListCount();
    getLikeList();
    console.log(listdata.value)
})


</script>

<style lang="css"></style>