<template>
    <el-button type="primary" size="small" @click="Add">新建</el-button>
    <div>

        <el-table :data="data" style="width: 100%">
            <el-table-column prop="taxon" label="植物学名"></el-table-column>
            <el-table-column prop="family" label="分类学所属"></el-table-column>
            <el-table-column prop="region" label="发现地区"></el-table-column>
            <el-table-column prop="country" label="所属国家"></el-table-column>
            <el-table-column prop="imgURL" label="图片">图片</el-table-column>
            <el-table-column label="操作">
                <el-button type="primary" @click="Edit">编辑</el-button>
                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>

    </div>
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="500">
    <el-form :model="form">
      <el-form-item label="学名" :label-width="formLabelWidth">
        <el-input v-model="form.taxon" autocomplete="off" />
      </el-form-item>
      <el-form-item label="分类学所属" :label-width="formLabelWidth">
        <el-input v-model="form.family" autocomplete="off" />
      </el-form-item>
      <el-form-item label="发现区域" :label-width="formLabelWidth">
        <el-input v-model="form.region" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所属国家" :label-width="formLabelWidth">
        <el-input v-model="form.country" autocomplete="off" />
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
        <el-upload action="http://localhost:8080/findAll" >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">

import { ref } from 'vue'
import axios from 'axios';
import { onMounted } from 'vue';
import { count } from 'echarts/types/src/component/dataZoom/history.js';

const dialogFormVisible = ref(false)
const formLabelWidth = ref('120px')
const form = ref({
    taxon: '',
    family: '',
    region: '',
    country: '',
})
const dialogTitle = ref()
let data = ref([])

function Edit() {
    dialogFormVisible.value = true
    dialogTitle.value = '编辑节点'
    console.log('edit')
}
function Add() {
    dialogFormVisible.value = true
    dialogTitle.value = '新建节点'
    console.log('add')
}

function SearchAllNodes() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findAll', // Replace with your actual API endpoint
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

onMounted(() => {
    SearchAllNodes()
})

</script>
<style lang="">

</style>