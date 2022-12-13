<!--  -->
<template>
  <div>
    <div style="text-align:left; margin:5px 10px;">
      <el-button v-BTNVis="'/api/v1/users:POST'" type="primary" @click="toAddUser"><el-icon>
          <Plus />
        </el-icon>&nbsp;新增</el-button>
    </div>

    <!-- 用户form表单 -->
    <el-dialog v-model="state.userFormDialogVis" :title="state.tips">
      <el-alert title="用户默认启用状态为未启用，需要到手动启用" type="info" :closable="false" center show-icon
        style="background-color: #f8dac7  ;size: 16px; color: #dd5e58; margin-bottom: -15px; margin-top: -30px;" />
      <el-divider />
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
        <el-form-item label="用户描述" prop="introduction">
          <el-input v-model="state.userFormData.introduction" placeholder="请输入用户描述"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="role_name">
          <el-dropdown>
            <el-button type="default" v-model="state.userFormData.role_name">{{ state.userFormData.role_name }}
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

    <!-- 新增用户授权表单 -->
    <el-dialog v-model="state.roleInfoDialogVis" title="选择用户角色">
      <el-form ref="roleInfo" :model="state.userRoleInfo" :rules="state.rules" label-width="100px">
        <el-form-item label="用户角色" prop="role_name">
          <el-dropdown>
            <el-button type="default" v-model="state.userRoleInfo.role_name">{{ state.userRoleInfo.role_name }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu v-for="item in state.roles">
                <el-dropdown-item @click="setSysUserRole(item.role_name)">{{ item.role_name
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 用户表格 -->
    <div style="margin:0px 10px; text-align:left;">
      <el-table stripe :data="state.users">
        <el-table-column prop="name" label="用户名称" width="120px"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="150px"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180px"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="150px"></el-table-column>
        <el-table-column prop="city" label="所在城市"></el-table-column>
        <el-table-column prop="introduction" label="用户描述" width="280px"></el-table-column>
        <el-table-column prop="created_at" label="Date" width="220px"></el-table-column>
        <el-table-column label="启用状态" width="80px">
          <template #default="scope">
            <el-switch v-model="scope.row.status" active-color="green" inactive-color="gray"
              @change="(value: string | number | boolean) => commitStatusChange(value, scope.row.id)" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="230px">
          <template #default="scope">
            <el-button v-BTNVis="'/api/v1/users/role:PUT'" type="primary" link size="small"
              @click="updateUserRole(scope.row.id)"><el-icon>
                <User />
              </el-icon>&nbsp;授权</el-button>
            <el-button v-BTNVis="'/api/v1/users/reset:POST'" type="primary" link size="small"
              @click="resetPass(scope.row.id)"><el-icon>
                <MagicStick />
              </el-icon>&nbsp;重置密码</el-button>
            <el-button v-BTNVis="'/api/v1/users/reset:PUT'" type="primary" link size="small"
              @click="updateUser(scope.row)"><el-icon>
                <Edit />
              </el-icon>&nbsp;编辑</el-button>
            <el-button v-BTNVis="'/api/v1/users:DELETE'" type="primary" link size="small"
              @click="deleteUser(scope.row.id)"><el-icon>
                <DeleteFilled />
              </el-icon>&nbsp;删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row style="float:right">
        <el-pagination background layout="total,sizes,prev,pager,next,jumper" v-model:page-size="state.pageSize"
          :page-sizes="[5, 10, 15, 20, 25]" :page-count="state.usersPag.TotalPage" :total="state.usersPag.TotalCount"
          :current-page="state.currentPage" @current-change="handelCurrentChange" @size-change="handleSizeChange">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script setup lang='ts'>
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
import { ComponentInternalInstance, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import {
  addSysUser,
  getAllSysUsers,
  updateSysUser,
  deleteSysUsers,
  resetPassword,
  getUser,
  setRole,
  updateStatus
} from "@/api/system/user"
import { getAllRoles } from '@/api/system/role';
import { getPagination } from '@/api/pagination'
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const state = reactive({
  users: [],
  roles: [] as any,
  usersPag: [] as any,
  currentPage: 1,
  userFormDialogVis: false,
  roleInfoDialogVis: false,
  status: false,
  pageSize: 5,
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
  userIDInfo: {
    id: ''
  },
  userStatusInfo: {
    id: '',
    status: '',
  },
  userRoleInfo: {
    id: '',
    role_name: '',
  },
  tips: '',
})



// 初始化
onMounted(() => {
  getUsers()
})

// 分页
// 跳转到指定页数
const handelCurrentChange = (val: number) => {
  getPagination("users", val, "id", "asc", state.pageSize).then(result => {
    // console.log(result);

    state.users = result.data
    state.usersPag = result.pager
    state.currentPage = val
  })
}

// 制定每页条数
const handleSizeChange = (val: number) => {
  state.pageSize = val
  getPagination("users", 1, "id", "asc", state.pageSize).then(result => {
    // console.log(result);

    state.users = result.data
    state.usersPag = result.pager
    state.currentPage = 1
  })
}


// 获取系统用户
const getUsers = () => {
  getAllSysUsers().then(result => {
    // console.log(result);
    state.users = result.data
    state.usersPag = result.pager
    handelCurrentChange(state.currentPage)
  })
}

// 获取系统角色
const getRoles = () => {
  getAllRoles().then(res => {
    state.roles = res.data
  })
}

// 添加用户
const toAddUser = () => {
  getRoles()
  state.userFormDialogVis = true
  resetForm()
  state.tips = '新增用户'
}

// 修改用户信息
const updateUser = (selectUser: object) => {
  getRoles()
  state.tips = '更新用户信息'
  state.userFormDialogVis = true
  state.userFormData = JSON.parse(JSON.stringify(selectUser))
  state.userFormData.id = state.userFormData.id.toString()
}

// 确认添加/修改用户
const handelAddUpdateConfirm = (id: string) => {
  // tips 为新增用户表示新增
  if (state.tips.startsWith('新增用户')) {
    // console.log(state.userFormData);
    addSysUser(state.userFormData).then(res => {
      // console.log(res);
      if (res.success) {
        state.userFormDialogVis = false
        getUsers()
        proxy?.$Notify.success("添加用户成功")
      }
    })
  } else if (state.tips.startsWith('更新用户信息')) {
    updateSysUser(state.userFormData).then(res => {
      if (res.success) {
        state.userFormDialogVis = false
        getUsers()
        proxy?.$Notify.success("更新用户信息成功")
      }
    })
  }
}

// 重置用户信息
const resetForm = () => {
  let userid = ''
  if (state.tips === '更新用户信息') {
    userid = state.userFormData.id.toString()
  }
  state.userFormData = {
    id: userid,
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
    state.userIDInfo.id = id.toString()
    deleteSysUsers(state.userIDInfo).then(res => {
      // console.log(res);
      handelCurrentChange(state.currentPage)
      proxy?.$Notify.success("删除用户成功")
    })
  }).catch(() => { })
}


// 重置密码
const resetPass = (id: number) => {
  proxy?.$Confirm('确认要将此用户密码重置为 123456 吗？', '重置系统用户密码').then(() => {
    state.userIDInfo.id = id.toString()
    resetPassword(state.userIDInfo).then(res => {
      // console.log(res);
      handelCurrentChange(state.usersPag.CurrentPage)
    })
  }).catch(() => { })
}

// 更新用户的状态
const commitStatusChange = (value: string | number | boolean, id: string) => {
  state.userStatusInfo.id = id.toString()
  state.userStatusInfo.status = value ? 'true' : "false"
  updateStatus(state.userStatusInfo).then(res => {
    if (res.success) {
      proxy?.$Notify.success(value == false ? '冻结用户成功' : "激活用户成功")
    }
  })
}

// 更新用户角色
const updateUserRole = (id: string) => {
  state.userRoleInfo.id = id.toString()
  state.userRoleInfo.role_name = state.roles[0].role_name
  state.roleInfoDialogVis = true
}

// 确定更新用户角色
const setSysUserRole = (role_name: string) => {
  state.userRoleInfo.role_name = role_name
  setRole(state.userRoleInfo).then(res => {
    if (res.success) {
      state.roleInfoDialogVis = false
      getUsers()
      proxy?.$Notify.success('更新用户角色成功')
    }
  })

}
</script>
<style lang='scss' scoped>
.tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>