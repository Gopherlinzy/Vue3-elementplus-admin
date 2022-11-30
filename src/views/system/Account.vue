<!--  -->
<template>
  <div><button @click="add">Account</button></div>
</template>

<script setup lang='ts'>
import { ComponentInternalInstance, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const add = () => {
  alert(proxy?.$lin)
}
</script>
<style lang='scss' scoped>

</style>