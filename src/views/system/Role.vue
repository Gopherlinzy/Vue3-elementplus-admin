<template>

  <div>
    <div style="text-align:left; margin:5px 10px;">
      <el-button type="primary" @click="toAddRole"><el-icon>
          <Plus />
        </el-icon>&nbsp;新增角色</el-button>
    </div>

    <!-- 角色Form表单 -->
    <el-dialog v-model="state.roleFormDataVis" :title="state.tips">
      <el-form ref="roleForm" :model="state.roleFormData" :rules="state.rules" label-width="100px">
        <el-form-item label="角色名" prop="role_name">
          <el-input v-if="state.tips.startsWith('新增角色')" v-model="state.roleFormData.role_name"
            placeholder="请输入角色名"></el-input>
          <el-input v-else-if="state.tips.startsWith('更新角色信息')" disabled v-model="state.roleFormData.role_name"
            placeholder="请输入角色名"></el-input>
        </el-form-item>
        <el-form-item label="角色介绍" prop="des">
          <el-input v-model="state.roleFormData.des" placeholder="请输入角色介绍"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="handelAddUpdateConfirm(state.roleFormData.id)">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!-- 角色表格 -->
    <div style="margin:0px 10px; text-align:left;">
      <el-table stripe :data="state.roles">
        <el-table-column prop="role_name" label="角色名"></el-table-column>
        <el-table-column prop="des" label="角色介绍"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template #default="scope">
            <el-switch v-model="scope.row.status" active-color="green" inactive-color="gray"
              @change="(value: string | number | boolean) => commitStatusChange(value, scope.row.id)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="updateRolePolicy(scope.row.id)"><el-icon>
                <User />
              </el-icon>&nbsp;授权</el-button>
            <el-button type="primary" link size="small"
              @click="updateCurrRole(scope.row.id, scope.row.role_name)"><el-icon>
                <Edit />
              </el-icon>&nbsp;编辑</el-button>
            <el-button type="primary" link size="small" @click="deleteCurrRole(scope.row.id)"><el-icon>
                <DeleteFilled />
              </el-icon>&nbsp;删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row style="float:right;">
        <el-pagination v-model:current-page="state.currentPage" background layout="total, prev, pager, next, jumper"
          :page-count="state.rolesPag.TotalPage" :total="state.rolesPag.TotalCount"
          @current-change="handelCurrentChange" @prev-click="handelPrevNextPage(state.rolesPag.PrevPageURL)"
          @next-click="handelPrevNextPage(state.rolesPag.NextPageURL)">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
import { ComponentInternalInstance, getCurrentInstance, onMounted, reactive } from 'vue'
import {
  getRole,
  getAllRoles,
  addRole,
  updateRole,
  updateRoleStatus,
  deleteRole
} from "@/api/system/role"
import { getPagination, getPaginationPrevNext } from '@/api/pagination'
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const state = reactive({
  roles: [],
  rolesPag: [] as any,
  roleFormDataVis: false,
  currentPage: 1,
  tips: '',
  roleFormData: {
    id: '',
    role_name: '',
    des: '',
  },
  rules: {
    role_name: [
      {
        required: true,
        message: '请输入角色名',
        trigger: 'blur',
      },
      {
        min: 3,
        max: 20,
        message: '角色名格式错误，只允许角色名长度需在 3~20 之间',
        trigger: 'blur'
      },
    ],
  },
  roleID: {
    id: ''
  },
  roleStatusInfo: {
    id: '',
    status: ''
  }
})

// 初始化
onMounted(() => {
  getRoles()
})

// 分页
// 跳转到指定页数
const handelCurrentChange = (val: number) => {
  getPagination("roles", val, "id", "asc", state.rolesPag.PerPage).then(result => {
    // console.log(result);

    state.roles = result.data
    state.rolesPag = result.pager
    state.currentPage = val
  })
}

// 跳转上一页/下一页
const handelPrevNextPage = (URL: string) => {
  getPaginationPrevNext(URL).then(result => {
    state.roles = result.data
    state.rolesPag = result.pager
    state.currentPage = result.pager.CurrentPage
  })
}

// 获取角色
const getRoles = () => {
  getAllRoles().then(result => {
    // console.log(result);
    state.roles = result.data
    state.rolesPag = result.pager
  })
}

// 新增角色
const toAddRole = () => {
  state.roleFormDataVis = true
  state.tips = '新增角色'
  resetForm()
}

// 重置信息
const resetForm = () => {
  state.roleFormData.id = ''
  state.roleFormData.role_name = ''
  state.roleFormData.des = ''
}

// 更新角色信息
const updateCurrRole = (id: string, roleName: string) => {
  resetForm()
  state.roleFormDataVis = true
  state.roleFormData.id = id.toString()
  state.roleFormData.role_name = roleName
  state.tips = '更新角色信息'
}

// 确认新增/更新角色
const handelAddUpdateConfirm = (id: string) => {
  // console.log(state.roleFormData);
  if (state.tips.startsWith('新增角色')) {
    addRole(state.roleFormData).then(res => {
      if (res.success) {
        state.roleFormDataVis = false
        getRoles()
        proxy?.$Notify.success("添加角色成功")
      }
    })
  } else if (state.tips.startsWith('更新角色信息')) {
    updateRole(state.roleFormData).then(res => {
      if (res.success) {
        state.roleFormDataVis = false
        getRoles()
        proxy?.$Notify.success("更新角色信息成功")
      }
    })
  }
}

// 删除选定角色
const deleteCurrRole = (id: string) => {
  proxy?.$Confirm('确认要删除此角色吗？', '删除角色').then(() => {
    state.roleID.id = id.toString()
    deleteRole(state.roleID).then(res => {
      // console.log(res);
      getRoles()
      handelCurrentChange(state.rolesPag.CurrentPage)
      proxy?.$Notify.success("删除角色成功")
    })
  })
}

// 更新角色的状态
const commitStatusChange = (value: string | number | boolean, id: string) => {
  state.roleStatusInfo.id = id.toString()
  state.roleStatusInfo.status = value ? 'true' : "false"
  updateRoleStatus(state.roleStatusInfo).then(res => {
    if (res.success) {
      proxy?.$Notify.success(value == false ? '冻结角色成功' : "激活角色成功")
    }
  })
}
</script>
