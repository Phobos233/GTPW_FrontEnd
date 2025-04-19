<template>
    <div>
        <el-scrollbar height="80vh" >
           <el-table :data="data" style="width: 100%">
            <el-table-column prop="id" label="用户ID"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="region" label="发现地区"></el-table-column>
            <el-table-column prop="country" label="所属国家"></el-table-column>
            <el-table-column prop="imgURL" label="图片">图片</el-table-column>
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
import { Edit } from '@element-plus/icons-vue';

let data = ref([])
function SearchAll() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findAllUser', // Replace with your actual API endpoint
        // params: {
        //     search: this.searchQuery // Use the search query from the input field
        // }
    })
        .then(response => {
            data.value = response.data;
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error fetching plant data:', error);
        });
    return data
}
</script>
<style lang="">
    
</style>