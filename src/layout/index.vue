<template>
  <div class="layout">
    <el-container>
      <el-aside :style="'width:' + autoWidth">
        <logo-bar :collapsed="collapsed" />
        <menu-bar :collapsed="collapsed" />
      </el-aside>
      <el-container>
        <el-header>
          <el-row :gutter="24" style="width: 100%;display:flex; align-Items:center;">
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <!-- 侧边栏展开折叠按钮 -->
              <el-icon style="font-size: 20px; margin-right: 15px;cursor: pointer;"
                @click="() => (collapsed = !collapsed)">
                <component :is="collapsed ? Expand : Fold" />
              </el-icon>
            </el-col>
            <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
              <!-- header业务 -->
              <header-bar />
            </el-col>
          </el-row>
        </el-header>

        <el-divider style="margin-top:-10px; margin-bottom: -1px;" />
        <el-main class="elmain">
          <!-- tabList -->
          <tab-bar />
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import LogoBar from './components/LogoBar/index.vue'
import MenuBar from './components/MenuBar/index.vue'
import AppMain from './components/AppMain/AppMain.vue'
import HeaderBar from './components/HeaderBar/index.vue'
import TabBar from './components/TabBar/TabBar.vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import { computed, ref } from 'vue';
import { isMobile } from '../utils/isMobile';

const collapsed = ref<boolean>(false)

const autoWidth = computed(() => {
  // console.log(isMobile(), collapsed.value);
  if (!collapsed.value && isMobile()) {
    return "0px"
  } else if (collapsed.value) {
    return "64px"
  } else {
    return "200px"
  }
})

</script>

<style scoped lang="scss">
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .el-header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #fff;
    color: var(--el-text-color-primary);
    height: 70px;

  }

  .el-footer {
    line-height: 60px;
  }

  .el-main {
    padding: 0;
    height: calc(100vh - 70px); // 设置主体 main 高度
    background-color: #f0f2f5;
  }

  .el-aside {
    background-color: $menuBg;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
    width: 200px;
    height: calc(100vh); // 设置左侧 aside 高度
    overflow: hidden;
  }
}
</style>