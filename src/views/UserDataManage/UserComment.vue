<template lang="html">
    <div>
        <el-table :data="listdata" style="width: 100%">
            <el-table-column prop="author" label="发表用户"></el-table-column>
            <el-table-column prop="commentTo" label="发表对象"></el-table-column>
            <el-table-column prop="content" label="发表内容"></el-table-column>
            <el-table-column prop="commentId" label="评论id"></el-table-column>
            <el-table-column prop="datetime" label="发表时间"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" @click="deleteComment(scope.row.commentId)">删除</el-button>
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
    commentId: Number,
    content: String,
    datetime: String,
    author: String,
    authorId: Number,
    commentTo: String,
    commentToId: Number,
}])

let data = ref([
    {
        taxon_name: '学名',
        family: '分类学所属科',
        genus: '分类学所属属',
        species: '分类学所属种',
        commentId: '中文名',
        country: '所属国家',
        imgURL: '图片'
    }
]);

//分页触发函数
const handleSizeChange = (val: number) => {
    // SearchFunc();
    console.log(`${val} 条数据每页`)
}
const handleCurrentChange = (val: number) => {
    // SearchFunc();
    console.log(`当前页码: ${val}`);
}


function getCommentByUser() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/comment/find/authorId/Page', // Replace with your actual API endpoint
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
    return data.value
}

function seeDetail() {
    console.log('查看详情');
    // dialogFormVisible.value = true;
}

function deleteComment(id: number) {
    console.log('删除评论');
    // dialogFormVisible.value = true;
    axios({
        method: 'post',
        url: 'http://localhost:8080/deleteComment', // Replace with your actual API endpoint
        params: {
            commentId: id,
            // Use the search query from the input field
        }

    })
        .then(response => {
            listdata.value = response.data;
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
}

function getCommentCount() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/comment/count/authorId', // Replace with your actual API endpoint
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
    return total.value
}

onMounted(() => {
    getCommentByUser();
    getCommentCount();
    console.log(listdata.value)
    console.log(data.value)
})


</script>

<style lang="css"></style>