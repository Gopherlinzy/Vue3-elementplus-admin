<template>

  <!-- <el-button text @click="add">Acount</el-button> -->
  <!-- 系统角色表格 -->
  <div style="margin:0px 10px; text-align:left;">
    <el-table stripe :data="state.roles">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="role_name" label="角色名"></el-table-column>
      <el-table-column prop="des" label="角色介绍"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-switch v-model="scope.row.status" active-color="green" inactive-color="gray" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220px">
        <template #default="scope">
          <el-button type="primary" link size="small">授权</el-button>
          <el-button type="primary" link size="small">编辑</el-button>
          <el-button type="primary" link size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import 'element-plus/es/components/message-box/style/css'
import { ComponentInternalInstance, getCurrentInstance, onMounted, reactive } from 'vue'
import { getAllRoles } from "@/api/system/role"
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const add = () => {
  proxy?.$Alert("我是linzy", "none")
}

const state = reactive({
  roles: []
})

// 初始化
onMounted(() => {
  getRoles()
})

// 获取系统角色
const getRoles = () => {
  getAllRoles().then(result => {
    console.log(result);
    state.roles = result.data
  })
}
</script>
