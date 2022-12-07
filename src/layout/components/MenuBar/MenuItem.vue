<!--  -->
<template>
  <template v-for="menu in menus" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length > 1" :index="menu.path">
      <template #title>
        <el-icon>
          <component :is="menu.meta.icon" />
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <menu-item :menus="menu.children"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else @click="toPath(menu.name)" :index="menu.path">
      <el-icon>
        <component :is="menu.meta.icon" />
      </el-icon>
      <span>{{ menu.meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
defineProps(['menus'])
const router = useRouter()
const toPath = (item: string) => {
  router.push({ name: item })
}

</script>
<style lang='scss' scoped>
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

/* 导航栏点击后,左边的颜色设置 */
.el-menu-item.is-active {
  border-left: solid 3px #26a1fa;
  color: white;
  background-color: #72bbef;
}
</style>