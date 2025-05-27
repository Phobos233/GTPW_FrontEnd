<template lang="html">
    <div>
        <el-scrollbar height="75vh">
            <el-table :data="relations" style="width: 100%" height="70vh">
                <el-table-column prop="id" label="关系ID"></el-table-column>
                <el-table-column prop="type" label="关系类型"></el-table-column>
                <el-table-column prop="startNodeId" label="源节点ID"></el-table-column>
                <el-table-column prop="endNodeId" label="终节点ID"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="danger" @click="deleteRelation(scope.row.id)">删除</el-button>
                    </template>


                </el-table-column>
            </el-table>

            <div>
                <div class="pagination-block">

                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 30, 40, 50]" :size="size" :background="background"
                        layout="total,sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" />

                </div>
            </div>
        </el-scrollbar>

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

let relations = ref([])

const handleSizeChange = (val: number) => {
    SearchAllRelations()
    console.log(`${val} 条数据每页`)
}
const handleCurrentChange = (val: number) => {
    SearchAllRelations()
    console.log(`当前页码: ${val}`);
}

function SearchRelCount() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/getAllRelationshipCount', // Replace with your actual API endpoint
        // params: {
        //     search: this.searchQuery // Use the search query from the input field
        // }
    })
        .then(response => {
            total.value = response.data;
            console.log(total.value);
        })
        .catch(error => {
            console.log('Error fetching Relcount data:', error);
        });
    return relations
}

function SearchAllRelations() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/getRelationshipWithPages', // Replace with your actual API endpoint
        params: {
            page: currentPage.value,
            size: pageSize.value,
            // Use the search query from the input field
        }
    })
        .then(response => {
            relations.value = response.data;
            console.log(relations.value);
        })
        .catch(error => {
            console.log('Error fetching plant data:', error);
        });
    return relations
}

function deleteRelation(id: number) {
    axios({
        method: 'post',
        url: 'http://localhost:8080/deleteRelationshipById', // Replace with your actual API endpoint
        params: {
            id: id // Use the search query from the input field
        }
    })
        .then(response => {
            console.log('删除成功');
            SearchRelCount()
            SearchAllRelations() // Refresh the list after deletion
        })
        .catch(error => {
            console.log('Error deleting relation:', error);
        });
}
onMounted(() => {
    SearchRelCount()
    SearchAllRelations()
})



</script>
<style lang="css" scoped></style>