<template lang="html">
    <div id="UserCenterLayout">
        <el-container height=100vh>
            <el-header id="nav" height="8vh">
                <el-row justify="space-between" height="100vh" align="middle">
                    <el-col :span="8" style="">
                        <h2>用户中心首页</h2>
                    </el-col>

                    <el-col :span="8">

                    </el-col>

                    <el-col :span="8" align="end">
                        <el-button type="primary">设置</el-button>
                        <el-button type="danger" @click="logout">
                            退出</el-button>
                    </el-col>
                </el-row>

            </el-header>
            <el-container>
                <el-aside width="15%">

                    <el-menu router>
                        <el-menu-item index="/">
                            主页
                        </el-menu-item>
                        <el-menu-item index="/UserCenter/UserLike">
                            用户历史点赞
                        </el-menu-item>
                        <el-menu-item index="/UserCenter/UserCollection">
                            用户收藏
                        </el-menu-item>
                        <el-menu-item index="/UserCenter/UserComment">
                            用户评论
                        </el-menu-item>

                    </el-menu>


                </el-aside>

                <el-container>
                    <el-main>

                        <el-scrollbar height="80vh">
                            <router-view></router-view>
                        </el-scrollbar>

                    </el-main>
                </el-container>

            </el-container>
            <el-footer id="foot" height="8vh">
                <el-text>
                    Powered By Vue3.0 + Element Plus + Vite + Vue-Router + Axios + Echarts
                </el-text>
                <br>
                <el-text>
                    Designed By Phobos233
                </el-text>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useRouter, useRoute, RouterView } from 'vue-router';

const router = useRouter()

function logout() {
    localStorage.removeItem('token');
    router.push('/index');
}

</script>

<style lang="css" scoped>
#UserCenterLayout {
    width: 100%;
    height: 100%;
    /* background-color: #f5f5f5; */
    display: flex;

}

#nav {
  background-color: #0f580b97;
}

#foot {
  background-color: #18171742;
  padding: 5px;
  text-align: center;
  font-size: 20px;
}
</style>