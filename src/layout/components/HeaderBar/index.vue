<!--  -->
<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="19" :offset="0" style="display:flex; align-Items:center;">
        <!-- 面包屑 -->
        <bread-crumb />
      </el-col>
      <el-col :span="1">
        <ScreenFullBar></ScreenFullBar>
      </el-col>
      <el-col :span="4">
        <!-- 头像框 -->
        <user-bar />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue'
import UserBar from './UserBar.vue';
import ScreenFullBar from './ScreenFullBar.vue';
</script>
<style lang='scss' scoped>

</style>