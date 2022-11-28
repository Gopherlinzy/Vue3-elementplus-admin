<script setup lang="ts">
    import { ref } from 'vue';
    const msg = ref('Child msg')
    const num = ref(123)
    const handle = ()=>{
        console.log("暴怒的子组件");
        
    }

    defineExpose({
        msg,
        num,
        handle
    })
</script>

<template>
   <h1>{{msg}}</h1>
   <h1>{{num}}</h1>
</template>

<style>
</style>