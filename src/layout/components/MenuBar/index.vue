<template>
  <el-menu default-active="2" active-text-color="#409EFF" text-color="#fff" class="el-menu" :collapse="collapsed"
    :collapse-transition="false">
    <menu-item :menus="menus"></menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import { useStore } from '@/store'

const store = useStore()

defineProps({
  collapsed: {
    type: Boolean
  }
})

const menus = store.getters['menuStore/getMenus']

</script>

<style lang="scss">
.el-menu {
  background-color: $menuBg;
  border: none;

  .el-sub-menu {
    .el-menu-item {
      background-color: $subMenuBg;
      color: rgb(175, 178, 175);
    }

    // 二级菜单
    /* 修改导航菜单栏悬浮时的背景颜色 */
    .el-sub-menu__title:hover,
    .el-menu-item:focus,
    .el-menu-item:hover {
      color: white;
    }

    /* 导航二级菜单栏点击之后的一像素边的问题 */
    .el-menu {
      border-right: none;
    }
  }
}

/* 修改导航菜单栏悬浮时的背景颜色 */
.el-sub-menu__title:hover,
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: rgba(77, 177, 135, 0.933);
}


/* 导航二级菜单栏点击之后的一像素边的问题 */
.el-menu {
  border-right: none;
}

/* 导航栏点击后,左边的颜色设置 */
.el-menu-item.is-active {
  border-left: solid 3px #26a1fa;
  color: white;
  background-color: #38a5f3;
}
</style>