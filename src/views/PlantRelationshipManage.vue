<template lang="">
    <div>
        <el-scrollbar height="80vh" >
           <el-table :data="relations" style="width: 100%">
            <el-table-column prop="id" label="关系ID"></el-table-column>
            <el-table-column prop="type" label="关系类型"></el-table-column>
            <el-table-column prop="startNodeId" label="源节点ID"></el-table-column>
            <el-table-column prop="endNodeId" label="终节点ID"></el-table-column>
            <el-table-column label="操作">
                <el-button type="primary"  @click="">编辑</el-button>
                <el-button type="danger" >删除</el-button>
            </el-table-column>
        </el-table> 
        </el-scrollbar>
        
    </div>
</template>
<script setup lang="ts">

import { ref } from 'vue'
import axios from 'axios';
import { onMounted } from 'vue';

let relations=ref([])
function SearchAllRelations() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findAllRelationships', // Replace with your actual API endpoint
        // params: {
        //     search: this.searchQuery // Use the search query from the input field
        // }
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
onMounted(() => {
    SearchAllRelations()
})



</script>
<style lang="">
    
</style>