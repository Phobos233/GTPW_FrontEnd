<template lang="html">
  <div class="common-layout">
    <el-container height=100vh>
      <el-header id="nav" height="8vh">
        <el-row justify="space-between" height="100vh" align="middle">
          <el-col :span="8" style="">
            <!-- <el-icon icon="../res/img/leaf.png"></el-icon> -->
            <h2>管理系统首页</h2>
          </el-col>

          <el-col :span="8">

          </el-col>

          <el-col :span="8" align="end">
            <el-button type="primary" :icon="el - icon - s - tools">设置</el-button>
            <el-button type="danger" :icon="el - icon - s - tools" @click="logout">
              退出</el-button>
          </el-col>
        </el-row>

      </el-header>
      <el-container>
        <el-aside width="15%">

          <el-menu router>
            <el-menu-item index="/manage/home">
              主页
            </el-menu-item>
            <el-menu-item index="/manage/SpeciesNode">
              植物物种节点管理
            </el-menu-item>
            <el-menu-item index="/manage/GenusNode">
              植物属节点管理
            </el-menu-item>
            <el-menu-item index="/manage/plantRelation">
              植物分类关系管理
            </el-menu-item>
            <el-menu-item index="/manage/user">
              用户管理
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

<script setup>
import { RouterView } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter()
function logout() {
  localStorage.removeItem('token');
  router.push('/index');
}
</script>

<style scoped>
#nav {
  background-color: #0f580b97;
}

#foot {
  background-color: #18171742;
  padding: 5px;
  text-align: center;
  font-size: 20px;
}

.common-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>