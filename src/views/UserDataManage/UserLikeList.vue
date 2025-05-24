<template lang="html">
    <div>
        <el-table :data="data" style="width: 100%">
            <el-table-column prop="taxon_name" label="操作用户"></el-table-column>
            <el-table-column prop="family" label="点赞对象"></el-table-column>
            <el-table-column prop="ch_name" label="点赞对象id"></el-table-column>
            <el-table-column prop="date" label="点赞时间"></el-table-column>
            <el-table-column label="操作">
                <el-button type="primary" @click="">查看</el-button>
                <el-button type="danger">取消点赞</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import axios from 'axios';
import { onMounted } from 'vue';

let listdata = ref([])

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

</script>

<style lang="css">

</style>