<template lang="">
    <div id="ChartLayout">

        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <RouterView></RouterView>
            </el-main>
        </el-container>
        
    </div>
</template>
<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>
<style>
</style>