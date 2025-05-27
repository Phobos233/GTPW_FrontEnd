<template lang="html">
  <div id="indexLayout">

    <el-container height="100vh">
      <el-header id="nav" height="10vh">
        <el-row justify="space-between" align="middle">
          <el-col :span="4" align="start">
            <router-link to="/index">
              <el-image :src="icon" style="height: 50px;width: 50px; margin:10px" />
            </router-link>
          </el-col>
          <el-col id="menuContainer" :span="4" justify="end">
            <el-menu mode="horizontal" default-active="/index" router>
              <el-menu-item index="/index">主页</el-menu-item>
              <el-menu-item index="/UserCenter">个人中心</el-menu-item>
              <el-menu-item index="/login">后台登录</el-menu-item>
            </el-menu>

          </el-col>
        </el-row>
      </el-header>

      <el-main id="ContentContainer" height="80vh">
        <el-row justify="space-between">
          <el-col :span="4">
          </el-col>
          <el-col :span="16" align="center">
            <div id="Title">
              金三角植物物种数据可视化平台
            </div>
            <div id="Content">
              东南亚地区是世界三大热带雨林分布区之一和生物多样性最高的区域之一，
              以约占全球陆地5%的面积分布着全球20%～25%的高等植物，
              “金三角”也是该地区的一部分。“金三角”地区属于亚热带季风气候，
              年平均气温在18～28℃之间，年降水量在1000～2500毫米。
              每年11月至次年4月为干季，5月至10月为雨季。
              该地区地形复杂，有许多逶迤交错的山脉，主要有横断山脉、扁都山脉、达克莱山脉等。
              主要河流有湄公河及其支流南披河、东披河、南岭河等。
              独特的气候环境和地理因素造就了这里独有的生态系统和植物种类。
            </div>
            <el-button id="BTN_EXPL" @click="goToChart">
              探索更多</el-button>
          </el-col>
          <el-col :span="4">

          </el-col>
        </el-row>


      </el-main>

      <el-footer id="foot" height="10vh">
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
<script lang="ts" setup>

import { onMounted } from 'vue';
import icon from '../res/img/leaf.png';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const route= useRoute()

const router = useRouter()

function goToChart() {
  router.push('/chartsindex');
}
onMounted(() => {
  console.log(route.query.name);
  document.title = '金三角植物物种数据可视化平台';
});
</script>
<style scoped>
#indexLayout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(../res/img/Background.png);
  background-repeat: no-repeat;
  background-size: cover;
}

#nav {
  background-color: #ffffff7c;
  padding: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #000000;
}

#menuContainer {
  font-size: 24px;
  justify-content: flex-end;
  --el-menu-bg-color: #ffffff00;
}

#ContentContainer {
  padding: 24px;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: #ffffff2b;
}

#Title {
  font-size: 42px;
  font-weight: bold;
  margin: 5% 0;
}

#Content {
  font-size: 24px;
  margin: 5%;
  padding: 0 10%;
  line-height: 1.6;
}

#BTN_EXPL {
  width: 40%;
  height: 10%;
  padding: 20px;
  font-size: 24px;
  background-color: #0f580b97;
  color: white;
  border-radius: 20px;
}

#foot {
  background-color: #181717c0;
  padding: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #000000;
}
</style>