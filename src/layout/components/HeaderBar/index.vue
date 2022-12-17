<!--  -->
<template>
  <div>
    <el-row :gutter="20" style="width:100%" justify="start" align="middle">
      <el-col :xs="0" :sm="12" :md="12" :lg="18" :xl="18" style="display:flex; align-Items:center;">
        <!-- 面包屑 -->
        <bread-crumb />
      </el-col>
      <el-col :xs="8" :sm="3" :md="3" :lg="1" :xl="1">
        <ScreenFullBar></ScreenFullBar>
      </el-col>
      <el-col :xs="8" :sm="3" :md="3" :lg="1" :xl="1">
        <LinkBar></LinkBar>
      </el-col>
      <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
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
import LinkBar from './LinkBar.vue'
</script>
<style lang='scss' scoped>

</style>