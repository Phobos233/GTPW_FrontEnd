<template lang="">
    <div id="indexLayout">

    <el-container height="100vh">
      <el-header>门户首页</el-header>
      <el-main>Main</el-main>
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
<script setup lang="ts">

</script>
<style scoped>
#indexLayout{
  height:100vh;
  display: flex;
  flex-direction: column;
}
#foot {
  background-color: #18171742;
  padding: 10px;
  text-align: center;
  font-size: 24px;
}


</style>