<!-- -->
<template>
    <div @click="To('https://github.com/Gopherlinzy/gin-vue3-admin')" style="cursor: pointer;">
        <img src="../../../assets/images/github.png" style="margin-top: 10px;width:30px;height:30px">
    </div>
</template>

<script lang='ts' setup>
const To = (url: string) => {
    window.location.href = url
}
</script>

<style lang='scss'>

</style>