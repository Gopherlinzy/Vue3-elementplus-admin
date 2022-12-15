<!--  -->
<template>
<<<<<<< HEAD:src/views/orders/OrderProcess.vue
  <div>OrderAction</div>
=======
  <div><button @click="add">Account</button></div>
>>>>>>> 0dadb255e225e856db3b3bd2d57bdd0041cb78e7:src/views/system/Account.vue
</template>

<script setup lang='ts'>
import { ComponentInternalInstance, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const add = () => {
  alert(proxy?.$lin)
}
</script>
<style lang='scss' scoped>

<<<<<<< HEAD:src/views/orders/OrderProcess.vue
</style> 
=======
</style>
>>>>>>> 0dadb255e225e856db3b3bd2d57bdd0041cb78e7:src/views/system/Account.vue
