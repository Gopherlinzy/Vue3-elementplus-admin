<!--  -->
<template>
  <div class="table-box">
    <router-view v-slot="{ Component }">
      <keep-alive :include="includeList">
        <transition :name="transtionName">
          <component :is="Component"></component>
        </transition>
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang='ts'>
import { Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const transtionName = ref('slide-left')
const includeList: Ref<string[]> = ref([])

// watch监控路由的meta
watch(() => route.meta.id, (to, from) => {
  // console.log(to, from);
  transtionName.value = to < from ? "slide-right" : "slide-left"
})

// 监控keepAlive为true的页面
watch(() => route, (newVal: any, oldVal: any) => {
  if (newVal.name && newVal.meta.keepAlive && includeList.value.indexOf(newVal.name) === -1) {
    includeList.value.push(newVal.name)
  }
  // console.log(includeList.value);
}, { deep: true })

</script>
<style lang='scss' scoped>
.table-box {
  // width: 100%;
  // height: 100%;
  padding: 20px;
  background-color: rgb(240, 242, 245);
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  width: 100vw;
  will-change: transform;
  transition: all 200ms;
  // position: absolute; 
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>