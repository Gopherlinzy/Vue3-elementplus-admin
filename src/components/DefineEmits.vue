<script setup lang="ts">
    const emits = defineEmits<{
        (e:"parentClick",data:string):void
    }>()
    const clickEmits = ()=> {
        emits('parentClick',"我是子组件,小明")
    }

</script>

<template>
    <button @click="clickEmits">子传父</button>
</template>

<style>
</style>