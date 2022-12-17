<!-- -->
<template>
    <div @click="onToggle" style="cursor: pointer;">
        <img v-if="isFullScreen" src="../../../assets/images/isFull.png"
            style="margin-top: 15px;width:22px;height:22px">
        <img v-else src="../../../assets/images/notFull.png" style="margin-top: 15px;width:28px;height:28px">
    </div>
</template>

<script lang='ts' setup>
import screenfull from 'screenfull'
import { onMounted, ref, onUnmounted } from 'vue';

const isFullScreen = ref(true)

const change = (vis: boolean) => {
    isFullScreen.value = vis
}

const onToggle = () => {
    screenfull.toggle()
    change(!isFullScreen.value)
}

// // 设置我们的监听器 onMounted
// onMounted(() => {
//     screenfull.on('change', change)
// })

// // 删除监听
// onUnmounted(() => {
//     screenfull.off('change', change)
// })
</script>

<style lang='scss'>

</style>