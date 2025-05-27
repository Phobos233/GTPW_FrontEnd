<template>
    <v-chart id="depChart" :option="depOption" autoresize @click="detail" />

    <el-drawer v-model="species_drawer" title="植物详细信息" direction="rtl">
        <div class="plantInfo">

            <el-text>植物名称：{{ plantRawData[0].ch_name }}</el-text>
            <br />
            <el-text>植物分类（科）：{{ plantRawData[0].family }}</el-text>
            <br />
            <el-text>植物分类（属）：{{ plantRawData[0].genus }}</el-text>
            <br />
            <el-text>植物学名：{{ plantRawData[0].taxon_name }}</el-text>
            <br />
            <el-text>所属国家：{{ plantRawData[0].area }}</el-text>
            <br />

        </div>
        <div class="plantImg" align="center">

            <el-image :src="imgURL" fit="contain" style="height: 75%;width: 75%;" />

        </div>

        <div class="userDo" align="center">
            <el-button type="primary" @click="createLikeSp">点赞</el-button>
            <el-button type="primary" @click="createCollectionSp">收藏</el-button>
        </div>
        <div id="commentForm" align="center">
            <el-input v-model="textarea" style="width: 80%" :rows="5" type="textarea" placeholder="Please input" />
        </div>
        <div class="buttons" align="End">
            <el-button type="primary" @click="createCommentSp" id="commitC_btn">提交评论</el-button>
        </div>
        <div id="commentListSpecies" align="center">
            <div id="commentListSample" v-for="comment in commentList" :key="comment.commentId">
                <div align="start" id="authorDiv">
                    {{ comment.author }} 评论于 {{ comment.datetime }}

                </div>
                <div id="CContentDiv" align="start">
                    {{ comment.content }}
                </div>
            </div>

            <div class="pagination-block">

                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 30, 40, 50]" :size="size" :background="background"
                    layout="total,sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />

            </div>
        </div>

    </el-drawer>

    <el-drawer v-model="genus_drawer" title="属详细信息" direction="rtl">
        <div class="genusInfo">
            <el-text>属名称：{{ genusRawData[0].ch_name }}</el-text>
            <br />
            <el-text>植物分类（科）：{{ genusRawData[0].family }}</el-text>
            <br />
            <el-text>属学名：{{ genusRawData[0].taxon_name }}</el-text>
            <br />
        </div>
        <div class="genusImg" align="center">

            <el-image :src="imgURL" fit="contain" style="height: 75%;width: 75%;" />

        </div>
        <div class="userDo" align="center">
            <el-button :type="btnType" @click="createLikeGe">点赞</el-button>
            <el-button type="primary" @click="createCollectionGe">收藏</el-button>
        </div>
        <div id="commentForm" align="center">
            <el-input v-model="textarea" style="width: 80%" :rows="5" type="textarea" placeholder="Please input" />

        </div>
        <div class="buttons" align="End">
            <el-button type="primary" @click="createCommentGe" id="commitC_btn">提交评论</el-button>
        </div>

        <div id="commentList" align="center">
            <div id="commentListSample" v-for="comment in commentList" :key="comment.commentId">
                <div align="start" id="authorDiv">
                    {{ comment.author }} 评论于 {{ comment.datetime }}

                </div>
                <div id="CContentDiv" align="start">
                    {{ comment.content }}
                </div>
            </div>

            <div class="pagination-block">

                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 30, 40, 50]" :size="size" :background="background"
                    layout="total,sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />

            </div>
        </div>
    </el-drawer>
</template>
<script setup lang="ts">

import axios from 'axios';
import { onMounted, provide, ref, toRaw, toRef, toRefs } from 'vue';
import VChart, { THEME_KEY } from 'vue-echarts';
import { use } from 'echarts/core';
import {
    TitleComponent
    , TooltipComponent
    , LegendComponent,
    VisualMapComponent
} from 'echarts/components';
import { GraphChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import imgURL from '@/res/img/sample.png';
import { useRoute } from 'vue-router';
import { el } from 'element-plus/es/locales.mjs';

let imgsrc = ref('https://d2seqvvyy3b8p2.cloudfront.net/622052744475889b8937d26ae387aecb.jpg')

use([TitleComponent
    , GraphChart
    , CanvasRenderer
    , TooltipComponent
    , LegendComponent
    , VisualMapComponent
]);

// provide(THEME_KEY, 'dark');
let btnType = ref('primary')
let textarea = ref('')
let data = ref([])
let linkdata = ref([])
let commentList = ref([{
    commentId: Number,
    author: String,
    authorId: Number,
    commentTo: String,
    commentToId: Number,
    content: String,
    datetime: String,
}])

let plantRawData = ref([{
    node_id: Number,
    taxon_rank: '',
    taxon_name: '',
    ch_name: String,
    family: '',
    area: '',
    genus: '',
}])
let genusRawData = ref([{
    node_id: Number,
    taxon_rank: '',
    taxon_name: '',
    ch_name: String,
    family: '',
}])



const species_drawer = ref(false)
const genus_drawer = ref(false)
const route = useRoute()

const depOption = ref(
    {
        title: {
            text: '植物分类点状图',
            left: 'center',
            top: '20px',
        },
        tooltip: {
            trigger: 'item', // 触发类型
            formatter: '{b} <br/> {c}', // 标签格式
        },

        series: [
            {
                name: '植物分类点状图',
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                type: 'graph',
                large: true,
                roam: true, // 允许拖拽缩放
                layout: "force",
                symbolSize: 50, // 节点大小
                symbol: 'circle', // 节点形状
                force: {
                    repulsion: 1500, // 节点间斥力
                    gravity: 0.5,    // 向心力
                    edgeLength: 200 // 边的理想长度
                },
                data: data, // 节点数据
                links: linkdata,
                label: {
                    show: true, // 显示标签
                    position: 'left', // 标签位置
                    formatter: '{c}', // 标签格式
                    fontSize: 12, // 字体大小
                    color: '#000000' // 字体颜色
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 10
                    }
                }
            }
        ]
    }
)

const currentPage = ref(1);
const size = ref('default');
const pageSize = ref(10);
const background = ref(true);
let total = ref(100);
let likeData = ref([])

//分页触发函数
const handleSizeChange = (val: number) => {
    // SearchFunc();
    console.log(`${val} 条数据每页`)
}
const handleCurrentChange = (val: number) => {
    // SearchFunc();
    console.log(`当前页码: ${val}`);
}

function SearchAllNodes() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findNodesByAreaInNeed', // Replace with your actual API endpoint
        params: {
            area: route.query.name // Use the search query from the input field
        }

    })
        .then(response => {
            data.value = response.data;
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
    return data.value
}

function SearchAllEdges() {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findAllEdges', // Replace with your actual API endpoint
        // params: {
        //     search: this.searchQuery // Use the search query from the input field
        // }

    })
        .then(response => {
            linkdata.value = response.data;
            console.log(linkdata.value)
        })
        .catch(error => {
            console.log('Error fetching edge data:', error);
        });
    return linkdata.value
}

function SearchPlantRawData(node_id: number) {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findSpeciesByNodeId', // Replace with your actual API endpoint
        params: {
            id: node_id // Use the search query from the input field
        }

    })
        .then(response => {
            plantRawData.value = response.data;
            console.log(plantRawData.value)
        })
        .catch(error => {
            console.log('Error fetching node data:', error);
        });
    return plantRawData.value

}
function SearchGenusRawData(node_id: number) {
    axios({
        method: 'post',
        url: 'http://localhost:8080/findGenusByNodeId', // Replace with your actual API endpoint
        params: {
            id: node_id // Use the search query from the input field
        }

    })
        .then(response => {
            genusRawData.value = response.data;
            console.log(genusRawData.value)
        })
        .catch(error => {
            console.log('Error fetching node data:', error);
        });
    return genusRawData.value

}


function detail(params: any) {
    console.log(params.data)
    if (params.data.type == 'Genus') {
        genus_drawer.value = true
        SearchGenusRawData(params.data.id)
        getCommentCount(params)
        getCommentList(params)
        console.log(genusRawData.value)
    }
    else if (params.data.type == 'Species') {
        species_drawer.value = true
        getCommentCount(params)
        getCommentList(params)
        SearchPlantRawData(params.data.id)
        console.log(plantRawData.value)
    }
    else {
        console.log('error')
    }

}

function getCommentCount(params: any) {
    axios({
        method: 'post',
        url: 'http://localhost:8080/comment/count/commentToId', // Replace with your actual API endpoint
        params: {
            commentToId: params.data.id,
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

function getCommentList(params: any) {
    axios({
        method: 'post',
        url: 'http://localhost:8080/comment/find/commentToId', // Replace with your actual API endpoint
        params: {
            commentToId: params.data.id,
            // Use the search query from the input field
        }

    })
        .then(response => {
            commentList.value = response.data;
            console.log(commentList.value)
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
    return commentList.value
}

function createCommentGe(params: any) {
    console.log('提交评论')
    console.log(textarea.value)
    axios({
        method: 'post',
        url: 'http://localhost:8080/comment/create', // Replace with your actual API endpoint
        params: {
            authorId: 19939, // Replace with the actual author ID
            commentToId: genusRawData.value[0].node_id,
            content: textarea.value,
            // Use the search query from the input field
        }

    })
        .then(response => {
             getCommentList(genusRawData.value[0].node_id)
            console.log(commentList.value)
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
}

function createCommentSp(params: any) {
    console.log('提交评论')
    console.log(textarea.value)
    axios({
        method: 'post',
        url: 'http://localhost:8080/comment/create', // Replace with your actual API endpoint
        params: {
            authorId: 19939, // Replace with the actual author ID
            commentToId: plantRawData.value[0].node_id,
            content: textarea.value,
            // Use the search query from the input field
        }

    })
        .then(response => {
            getCommentList(genusRawData.value[0].node_id)
            console.log(commentList.value)
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
}

function getLike(params: any) {
    console.log('获取点赞')
    axios({
        method: 'post',
        url: 'http://localhost:8080/like/find/authorIdAndLikeToId', // Replace with your actual API endpoint
        params: {
            likeToId: params.data.id,
            authorId: 19939, // Replace with the actual author ID
            // Use the search query from the input field
        }

    })
        .then(response => {
            likeData.value = response.data;
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });

}

function createLikeSp(authorid: number,likeToId: number) {

    console.log('点赞')
    console.log(genusRawData.value[0].node_id)
    axios({
        method: 'post',
        url: 'http://localhost:8080/like/create', // Replace with your actual API endpoint
        params: {
            likeToId: plantRawData.value[0].node_id,
            authorId: 19939, // Replace with the actual author ID
            // Use the search query from the input field
        }

    })
        .then(response => {
            console.log(response.data)
            likeData.value = response.data;
        })
        .catch(error => {
            console.log('Error fetching like data:', error);
        });
}
function createLikeGe(authorid: number,likeToId: number) {
    console.log('点赞')
    console.log(genusRawData.value[0].node_id)
    axios({
        method: 'post',
        url: 'http://localhost:8080/like/create', // Replace with your actual API endpoint
        params: {
            likeToId: genusRawData.value[0].node_id,
            authorId: 19939, // Replace with the actual author ID
            // Use the search query from the input field
        }

    })
        .then(response => {

            likeData.value = response.data;
        })
        .catch(error => {
            console.log('Error fetching like data:', error);
        });
}

function deleteLikeGe() {
    console.log('取消点赞')
    axios({
        method: 'post',
        url: 'http://localhost:8080/like/delete', // Replace with your actual API endpoint
        params: {
            likeToId: genusRawData.value[0].node_id,
            authorId: 19939, // Replace with the actual author ID
            // Use the search query from the input field
        }

    })
        .then(response => {
            likeData.value = response.data;
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
}
function deleteLikeSp(params: any) {
    console.log('取消点赞')
    axios({
        method: 'post',
        url: 'http://localhost:8080/like/delete', // Replace with your actual API endpoint
        params: {
            likeToId: plantRawData.value[0].node_id,
            authorId: 19939, // Replace with the actual author ID
            // Use the search query from the input field
        }

    })
        .then(response => {
            likeData.value = response.data;
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });
}

function getCollection(params: any) {
    console.log('获取收藏')
    axios({
        method: 'post',
        url: 'http://localhost:8080/collect/find/authorIdAndCollectionToId', // Replace with your actual API endpoint
        params: {
            collectionToId: params.data.id,
            authorId: 19939, // Replace with the actual author ID
            // Use the search query from the input field
        }

    })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('Error fetching nodes data:', error);
        });

}

function createCollectionSp(){
    console.log('收藏')
    axios({
        method: 'post',
        url: 'http://localhost:8080/collect/create', // Replace with your actual API endpoint
        params: {
            collectionToId: plantRawData.value[0].node_id,
            authorId: 19939, // Replace with the actual author ID
            // Use the search query from the input field
        }

    })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('Error fetching like data:', error);
        });

}

function createCollectionGe(){
    console.log('收藏')
    axios({
        method: 'post',
        url: 'http://localhost:8080/collect/create', // Replace with your actual API endpoint
        params: {
            collectionToId: genusRawData.value[0].node_id,
            authorId: 19939, // Replace with the actual author ID
            // Use the search query from the input field
        }

    })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('Error fetching like data:', error);
        });

}

onMounted(() => {
    SearchAllNodes()
    SearchAllEdges()
})

</script>
<style lang="css" scoped>
#depChart {
    height: 100vh;
}
.plantInfo {
    margin-bottom: 20px;
}

.userDo {
    margin: 20px;
}
.SpeciesImg {
    margin: 20px;
}
.genusImg {
    margin: 20px;
}

#commentListSample {
    width: 85%;
    height: 10vh;
    margin: 20px;
    padding: 10px;
    background-color: #6d696956;
    border: 1px solid #716d6df9;
    border-radius: 15px;
    box-sizing: border-box;
    box-shadow: 10px 10px 10px #000000ac;
}

#authorDiv {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}

/* .genusInfo {
    margin: 20px;
} */
#commentForm {
    margin: 16px;
}
</style>