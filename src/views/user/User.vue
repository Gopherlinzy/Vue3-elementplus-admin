<!--  -->
<template>
  <div>
    <div style="text-align:left; margin:5px 10px;">
      <el-button type="primary" @click="toAddUser">新增系统用户</el-button>
    </div>

    <!-- 新增用户form表单 -->
    <el-dialog v-model="state.userFormDialogVis" :title="state.tips">
      <el-form ref="userForm" :model="state.userFormData" :rules="state.rules" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="state.userFormData.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="state.userFormData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="state.userFormData.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="state.userFormData.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" prop="city">
          <el-input v-model="state.userFormData.city" placeholder="请输入所在城市"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction">
          <el-input v-model="state.userFormData.introduction" placeholder="请输入个人简介"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="role_name">
          <el-dropdown>
            <el-button type="primary" v-model="state.userFormData.role_name">{{ state.userFormData.role_name }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu v-for="item in state.roles">
                <el-dropdown-item @click="() => { state.userFormData.role_name = item.role_name }">{{ item.role_name
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="handelAddUpdateConfirm(state.userFormData.id)">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 用户表格 -->
    <div style="margin:0px 10px; text-align:left;">
      <el-table stripe :data="state.users">
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180px"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="150px"></el-table-column>
        <el-table-column prop="city" label="所在城市"></el-table-column>
        <el-table-column prop="introduction" label="用户简介" width="280px"></el-table-column>
        <el-table-column prop="created_at" label="Date" width="220px"></el-table-column>
        <el-table-column label="启用状态" width="80px">
          <template #default="scope">
            <el-switch v-model="scope.row.status" active-color="green" inactive-color="gray"
              @change="(value: string | number | boolean) => commitStatusChange(value, scope.row.id)" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220px">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="setSysUserRole(scope.row.id)">授权</el-button>
            <el-button type="primary" link size="small" @click="resetPass(scope.row.id)">重置密码</el-button>
            <el-button type="primary" link size="small" @click="updateUser(scope.row.id)">编辑</el-button>
            <el-button type="primary" link size="small" @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row style="float:right;">
        <el-pagination background layout="total, prev, pager, next, jumper" :page-count="state.usersPag.TotalPage"
          :total="state.usersPag.TotalCount" v-model:current-page="state.usersPag.CurrentPage"
          @current-change="handelCurrentChange" @prev-click="handelPrevNextPage(state.usersPag.PrevPageURL)"
          @next-click="handelPrevNextPage(state.usersPag.NextPageURL)">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script setup lang='ts'>
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
import { ComponentInternalInstance, getCurrentInstance, onMounted, reactive } from 'vue';
import {
  addSysUser,
  getAllSysUsers,
  getPaginationSysUsers,
  getPaginationPrevNextUsers,
  updateSysUser,
  deleteSysUsers,
  resetPassword,
  getUser,
  setRole,
  updateStatus
} from "@/api/system/user"
import { formatData } from "@/api/util"
import { getAllRoles } from '@/api/system/role';
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const state = reactive({
  users: [],
  roles: [] as any,
  usersPag: [] as any,
  currentPage: 1,
  userFormDialogVis: false,
  status: false,
  userFormData: {
    id: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    introduction: '',
    role_name: 'user',
  },
  rules: {
    name: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
      {
        pattern: /^[a-zA_Z0-9]{3,20}$/,
        message: '用户名格式错误，只允许数字和英文,用户名长度需在 3~20 之间',
        trigger: 'blur'
      },
    ],
    password: [
      {
        required: true,
        message: '请输入password',
        trigger: 'blur',
      },
      { whitespace: true, message: '不能为全空格', trigger: 'blur' },
      {
        min: 6,
        message: '密码长度需大于 5 位',
        trigger: 'blur',
      },
    ],
    email: [
      {
        required: true,
        message: '请输入邮箱号',
        trigger: 'blur',
      },
      {
        type: 'email',
        message: '请输入正确格式的邮箱号',
        trigger: ['blur', 'change'],
      },
    ],
    phone: [
      {
        required: true,
        message: '请输入手机号',
        trigger: 'blur',
      },
    ],
    role_name: [
      {
        required: true,
        message: '请选择用户角色',
        trigger: 'blur',
      },
    ]
  },
  UserIDInfo: {
    id: ''
  },
  UserStatusInfo: {
    id: '',
    status: '',
  },
  tips: ''
})

// 初始化
onMounted(() => {
  getUsers()
  getRoles()
})

// 获取系统角色
const getUsers = () => {
  getAllSysUsers().then(result => {
    // console.log(result);
    state.users = result.data
    state.usersPag = result.pager
  })
}

// 获取系统角色
const getRoles = () => {
  getAllRoles().then(res => {
    state.roles = res.data
  })
}

// 跳转到指定页数
const handelCurrentChange = (val: number) => {
  getPaginationSysUsers(val, "id", "asc", state.usersPag.PerPage).then(result => {
    // console.log(result);

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
  state.userFormDialogVis = true
  state.userFormData.id = ''
  state.tips = '新增用户'
}

// 修改用户信息
const updateUser = (id: string) => {
  state.userFormData.id = id.toString()
  state.UserIDInfo.id = id.toString()
  getUser(state.UserIDInfo).then(res => {
    state.userFormData.name = res.data.name
    state.userFormData.email = res.data.email
    state.userFormData.phone = res.data.phone
    state.userFormData.city = res.data.city
    state.userFormData.introduction = res.data.introduction
    state.userFormData.role_name = res.data.role_name
    state.tips = '更新用户信息'
    state.userFormDialogVis = true
  })

}

// 确认添加/修改用户
const handelAddUpdateConfirm = (id: string) => {
  // id 为空表示新增
  if (id == '') {
    // console.log(state.userFormData);
    addSysUser(state.userFormData).then(res => {
      // console.log(res);
      if (res.success) {
        state.userFormDialogVis = false
        proxy?.$Alert('添加成功', '新增系统用户')
        getUsers()
      }
    })
  } else {
    updateSysUser(state.userFormData).then(res => {
      if (res.success) {
        state.userFormDialogVis = false
        proxy?.$Alert('更新成功', '更新系统用户')
        getUsers()
      }
    })
  }
}

// 重置用户信息
const resetForm = () => {
  state.userFormData = {
    id: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    introduction: '',
    role_name: 'user',
  }
}


// 删除选定用户
const deleteUser = (id: number) => {
  proxy?.$Confirm('确认要删除此用户吗？', '删除系统用户').then(() => {
    state.UserIDInfo.id = id.toString()
    deleteSysUsers(state.UserIDInfo).then(res => {
      // console.log(res);
      handelCurrentChange(state.usersPag.CurrentPage)
    })
  })
}


// 重置密码
const resetPass = (id: number) => {
  proxy?.$Confirm('确认要将此用户密码重置为 123456 吗？', '充值系统用户密码').then(() => {
    state.UserIDInfo.id = id.toString()
    resetPassword(state.UserIDInfo).then(res => {
      // console.log(res);
      handelCurrentChange(state.usersPag.CurrentPage)
    })
  })
}

// 更新用户的状态
const commitStatusChange = (value: string | number | boolean, id: string) => {
  state.UserStatusInfo.id = id.toString()
  state.UserStatusInfo.status = value ? 'true' : "false"
  updateStatus(state.UserStatusInfo).then(res => {
    if (res.success) {
      proxy?.$Notify.success(value == false ? '冻结用户成功' : "激活用户成功")
    }
  })
}

// 给系统用户分配角色
const setSysUserRole = (id: number) => {

}
</script>
<style lang='scss' scoped>

</style>