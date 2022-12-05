<template>

  <el-button text @click="add">Acount</el-button>
</template>

<script lang="ts" setup>
import 'element-plus/es/components/message-box/style/css'
import { ComponentInternalInstance, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const add = () => {
  proxy?.$Alert("我是linzy", "none")
}
</script>
