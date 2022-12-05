<!--  -->
<template>

  <div style="text-align:left; margin:5px 10px;">
    <el-button type="primary" @click="toAddUser">新增系统用户</el-button>
  </div>

  <!-- 用户表格 -->
  <div style="margin:0px 10px; text-align:left;">
    <el-table stripe :data="state.users">
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="city" label="所在城市"></el-table-column>
      <el-table-column prop="introduction" label="用户简介"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-switch v-model="scope.row.status" active-color="green" inactive-color="gray" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220px">
        <template #default="scope">
          <el-button type="primary" link size="small">授权</el-button>
          <el-button type="primary" link size="small">重置密码</el-button>
          <el-button type="primary" link size="small">编辑</el-button>
          <el-button type="primary" link size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row style="float:right;">
      <el-pagination background layout="total, prev, pager, next, jumper" :total="state.usersPag.TotalCount"
        v-model:current-page.sync="state.usersPag.CurrentPage" @current-change="handelCurrentChange"
        @prev-click="handelPrevNextPage(state.usersPag.PrevPageURL)"
        @next-click="handelPrevNextPage(state.usersPag.NextPageURL)">
      </el-pagination>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import 'element-plus/es/components/message-box/style/css'
import { ComponentInternalInstance, getCurrentInstance, onMounted, reactive } from 'vue';
import {
  addSysUser,
  getAllSysUsers,
  getPaginationSysUsers,
  getPaginationPrevNextUsers,
  updateSysUser,
  deleteSysUsers,
  resetPassword,
  setRole
} from "@/api/system/user"
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const state = reactive({
  users: [],
  usersPag: [] as any,
  currentPage: 1,
})

// 初始化
onMounted(() => {
  getUsers()
})

// 获取系统角色
const getUsers = () => {
  getAllSysUsers().then(result => {
    console.log(result);
    state.users = result.data
    state.usersPag = result.pager
  })
}

// 跳转到指定页数
const handelCurrentChange = (val: number) => {
  getPaginationSysUsers(val, "id", "asc", state.usersPag.PerPage).then(result => {
    console.log(result);

    state.users = result.data
    state.usersPag = result.pager
    state.currentPage = val
  })
}

// 跳转上一页/下一页
const handelPrevNextPage = (URL: string) => {
  getPaginationPrevNextUsers(URL).then(result => {
    state.users = result.data
    state.usersPag = result.pager
    state.currentPage = result.pager.CurrentPage
  })
}

// 添加用户
const toAddUser = () => {

}
</script>
<style lang='scss' scoped>

</style>