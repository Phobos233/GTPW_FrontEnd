<template>
  <el-button type="primary" size="small" @click="Add">新建</el-button>
  <div>

    <el-table :data="data" style="width: 100%" height="70vh">
      <el-table-column prop="node_id" label="属ID"></el-table-column>
      <el-table-column prop="taxon_name" label="属学名"></el-table-column>
      <el-table-column prop="family" label="分类学所属科"></el-table-column>
      <el-table-column prop="ch_name" label="中文名"></el-table-column>
      <el-table-column prop="imgURL" label="图片">图片</el-table-column>
      <el-table-column prop="label" label="类型"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
            <el-button type="primary" @click="Edit">编辑</el-button>
            <el-button type="danger" @click="deleteNode(scope.row.node_id)">删除</el-button>
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
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="500">
    <el-form :model="form">

      <el-form-item label="属学名" :label-width="formLabelWidth">
        <el-input v-model="form.taxon_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="分类学所属科" :label-width="formLabelWidth">
        <el-input v-model="form.family" autocomplete="off" />
      </el-form-item>
      <el-form-item label="中文名" :label-width="formLabelWidth">
        <el-input v-model="form.ch_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
        <el-upload action="http://localhost:8080/findAllGenus">
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

const currentPage = ref(1);
const size = ref('default');
const pageSize = ref(10);
const background = ref(true);
let total = ref(100);

const dialogFormVisible = ref(false)
const formLabelWidth = ref('120px')
const form = ref({
  id: Number,
  taxon_name: '',
  family: '',
  ch_name: '',
})
const dialogTitle = ref()
let data = ref([])

const handleSizeChange = (val: number) => {
    SearchAllNodes()
    console.log(`${val} 条数据每页`)
}
const handleCurrentChange = (val: number) => {
    SearchAllNodes()
    console.log(`当前页码: ${val}`);
}


function Edit(id: number) {
  axios({
    method: 'post',
    url: 'http://localhost:8080/findGenusById', // Replace with your actual API endpoint
    params: {
      id: id // Use the search query from the input field
    }
  })
    .then(response => {
      form.value = response.data;
      console.log(response.data);
    })
    .catch(error => {
      console.log('Error fetching plant data:', error);
    });
  dialogFormVisible.value = true
  dialogTitle.value = '编辑节点'
  console.log('edit')
}
function Add() {
  dialogFormVisible.value = true
  dialogTitle.value = '新建节点'
  console.log('add')
}

function deleteNode(id: number) {
  axios({
    method: 'post',
    url: 'http://localhost:8080/deleteGenusById', // Replace with your actual API endpoint
    params: {
      node_id: id // Use the search query from the input field
    }
  })
    .then(response => {
      console.log('Node deleted successfully:', response.data);
      SearchAllNodes(); // Refresh the list after deletion
      getAllNodesCounts(); // Refresh the count after deletion
    })
    .catch(error => {
      console.log('Error deleting node:', error);
    });
}


function SearchAllNodes() {
  axios({
    method: 'post',
    url: 'http://localhost:8080/findAllGenusWithPage', // Replace with your actual API endpoint
    params: {
        page:currentPage.value
      , size: pageSize.value // Use the search query from the input field
         // Use the search query from the input field
    }

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

function getAllNodesCounts() {
  axios({
    method: 'post',
    url: 'http://localhost:8080/countAllGenus', // Replace with your actual API endpoint
  })
    .then(response => {
      total.value = response.data;
      console.log(response.data);
    })
    .catch(error => {
      console.log('Error fetching nodes count:', error);
    });
  return total
}

onMounted(() => {
  SearchAllNodes()
  getAllNodesCounts();
  console.log('GenusNodeManage mounted')
})

</script>
<style lang="">

</style>