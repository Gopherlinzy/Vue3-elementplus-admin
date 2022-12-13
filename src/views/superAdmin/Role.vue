<template>

  <div>
    <div style="text-align:left; margin:5px 10px;">
      <el-button v-BTNVis="'/api/v1/roles:POST'" type="primary" @click="toAddRole"><el-icon>
          <Plus />
        </el-icon>&nbsp;新增</el-button>
    </div>

    <!-- 角色Form表单 -->
    <el-dialog v-model="state.roleFormDataVis" :title="state.tips" height="80">
      <el-alert title="角色默认启用状态为未启用，需要到手动启用" type="info" :closable="false" center show-icon
        style="background-color: #f8dac7  ;size: 16px; color: #dd5e58; margin-bottom: -15px; margin-top: -30px;" />
      <el-divider />
      <el-form ref="roleForm" :model="state.roleFormData" :rules="state.rules" label-width="100px">
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-if="state.tips.startsWith('新增角色')" v-model="state.roleFormData.role_name"
            placeholder="请输入角色名称"></el-input>
          <el-input v-else-if="state.tips.startsWith('更新角色信息')" disabled v-model="state.roleFormData.role_name"
            placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="des">
          <el-input v-model="state.roleFormData.des" placeholder="请输入角色描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="handelAddUpdateConfirm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 角色授权树形窗口 -->
    <el-drawer v-model="state.toSetPermissionsVis" custom-class="auth-drawer" :with-header="false" size="30%"
      title="角色配置" destroy-on-close>
      <el-tabs v-model="activePolicy" class="tabs">
        <el-tab-pane v-BTNVis="'/api/v1/roles/menus:POST'" label="角色菜单" name="menus">
          <el-form>
            <el-scrollbar height="530px" style="padding-bottom: 10px;">
              <el-form-item>
                <el-tree :data="state.permissionTree" show-checkbox :props="state.defaultProps" node-key="permission"
                  :default-checked-keys="state.permissions" highlight-current default-expand-all
                  ref="permissionRef"></el-tree>
              </el-form-item>
            </el-scrollbar>
            <el-form-item>
              <el-button @click="resetCheckedMenu">清空</el-button>
              <el-button v-BTNVis="'/api/v1/roles/menuPermissions:PUT'" type="primary"
                @click="setPermission">确定</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>
        <el-tab-pane v-BTNVis="'/api/v1/roles/apis:POST'" label="角色api" name="apis">

          <el-form>
            <el-scrollbar height="530px" style="padding-bottom: 10px;">
              <el-form-item>
                <el-tree :data="state.apiPolicyTree" show-checkbox :props="state.defaultProps" node-key="apiPolicy"
                  :default-checked-keys="state.apiPolicies" highlight-current default-expand-all
                  ref="apiPolicyRef"></el-tree>
              </el-form-item>
            </el-scrollbar>
            <el-form-item>
              <el-button @click="resetCheckedApi">清空</el-button>
              <el-button v-BTNVis="'/api/v1/roles/apiPolicy:PUT'" type="primary" @click="setApiPolicy">确定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

    </el-drawer>

    <!-- 角色表格 -->
    <div style="margin:0px 10px; text-align:left;">
      <el-table stripe :data="state.roles">
        <el-table-column prop="role_name" label="角色名称"></el-table-column>
        <el-table-column prop="des" label="描述"></el-table-column>
        <el-table-column label="启用状态" width="100px">
          <template #default="scope">
            <el-switch v-model="scope.row.status" active-color="green" inactive-color="gray"
              @change="(value: string | number | boolean) => commitStatusChange(value, scope.row.id)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="toSetPermissions(scope.row.id)"><el-icon>
                <User />
              </el-icon>&nbsp;授权</el-button>
            <el-button v-BTNVis="'/api/v1/roles:PUT'" type="primary" link size="small"
              @click="updateCurrRole(scope.row)"><el-icon>
                <Edit />
              </el-icon>&nbsp;编辑</el-button>
            <el-button v-BTNVis="'/api/v1/roles:DELETE'" type="primary" link size="small"
              @click="deleteCurrRole(scope.row.id)"><el-icon>
                <DeleteFilled />
              </el-icon>&nbsp;删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row style="float:right;">
        <el-pagination v-model:current-page="state.currentPage" background
          layout="total, sizes, prev, pager, next, jumper" v-model:page-size="state.pageSize"
          :page-sizes="[5, 10, 15, 20, 25]" :page-count="state.rolesPag.TotalPage" :total="state.rolesPag.TotalCount"
          @current-change="handelCurrentChange" @size-change="handleSizeChange">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
import { ComponentInternalInstance, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import permissionTree from "@/router/permissionTree"
import apiPolicyTree from "@/router/apiPolicyTree"
import {
  getRole,
  getRoleAllPolicies,
  getRoleMenus,
  getRoleApis,
  getAllRoles,
  addRole,
  updateRole,
  updateRoleMenuPermissions,
  updateRoleApiPolicies,
  updateRoleStatus,
  deleteRole,
} from "@/api/system/role"
import type { ElTree } from 'element-plus'
import { getPagination, getPaginationPrevNext } from '@/api/pagination'
import { tr } from 'element-plus/es/locale'
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const state = reactive({
  roles: [],
  rolesPag: [] as any,
  roleFormDataVis: false,
  toSetPermissionsVis: false,
  currentPage: 1,
  pageSize: 5,
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
  },
  permissionTree: permissionTree,
  apiPolicyTree: apiPolicyTree,
  defaultProps: {
    id: "title",
    label: "title",
    children: "children"
  },
  permissions: [],
  apiPolicies: [],
})

const permissionRef = ref<InstanceType<typeof ElTree>>()
const apiPolicyRef = ref<InstanceType<typeof ElTree>>()
const activePolicy = ref('')

// 初始化
onMounted(() => {
  getRoles()
})

// 分页
// 跳转到指定页数
const handelCurrentChange = (val: number) => {
  getPagination("roles", val, "id", "asc", state.pageSize).then(result => {
    // console.log(result);
    state.roles = result.data
    state.rolesPag = result.pager
    state.currentPage = val
  })
}

// 制定每页条数
const handleSizeChange = (val: number) => {
  state.pageSize = val
  getPagination("roles", 1, "id", "asc", state.pageSize).then(result => {
    // console.log(result);

    state.roles = result.data
    state.rolesPag = result.pager
    state.currentPage = 1
  })
}

// 获取角色
const getRoles = () => {
  getAllRoles().then(result => {
    // console.log(result);
    state.roles = result.data
    state.rolesPag = result.pager
    handelCurrentChange(state.currentPage)
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
  if (state.tips === '新增角色') {
    state.roleFormData.id = ''
    state.roleFormData.role_name = ''
  }
  state.roleFormData.des = ''
}

// 更新角色信息
const updateCurrRole = (selectRole: object) => {
  state.roleFormDataVis = true
  state.roleFormData = JSON.parse(JSON.stringify(selectRole))
  state.roleFormData.id = state.roleFormData.id.toString()
  // console.log(state.roleFormData);

  state.tips = '更新角色信息'
}

// 确认新增/更新角色
const handelAddUpdateConfirm = () => {
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
  }).catch(() => { })
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

// 点击授权按钮
const toSetPermissions = (id: string) => {
  // console.log(id);
  state.roleFormData.id = id.toString()
  state.permissions = []
  state.apiPolicies = []
  let menu = false
  let api = false
  getRoleMenus(state.roleFormData).then(res => {
    for (let i of res.data) {
      state.permissions.push(i.permission as never)
    }
    activePolicy.value = 'menus'
    menu = true
    if (api == true) {
      state.toSetPermissionsVis = true
    }
  })
  getRoleApis(state.roleFormData).then(res => {
    for (let i of res.data) {
      state.apiPolicies.push(i.path + ":" + i.method as never)
    }
    // console.log(state.apiPolicies);
    api = true
    if (menu == true) {
      state.toSetPermissionsVis = true
    }
  })
}

// 清空 checked-box
const resetCheckedMenu = () => {
  permissionRef.value!.setCheckedKeys([], false)
}

// 清空 checked-box
const resetCheckedApi = () => {
  apiPolicyRef.value!.setCheckedKeys([], false)
}

// 设置 角色菜单权限
const setPermission = () => {
  let nodes = permissionRef.value!.getCheckedNodes(false, false)
  let permissions = <any>[]
  nodes.forEach(node => {
    if (node.id) {
      permissions.push(node.id.toString())
    }
  })
  // console.log(permissions);
  let vo = {
    id: state.roleFormData.id.toString(),
    permissions: permissions,
  }
  // console.log(vo);
  updateRoleMenuPermissions(vo).then(res => {
    proxy?.$Notify.success("更新成功")
    state.toSetPermissionsVis = false
  })
}

// 设置 角色api权限
const setApiPolicy = () => {
  let nodes = apiPolicyRef.value!.getCheckedNodes(false, false)
  let apiPolicies = <any>[]
  nodes.forEach(node => {
    if (node.id) {
      apiPolicies.push(node.id.toString())
    }
  })
  // console.log(permissions);
  let vo = {
    id: state.roleFormData.id.toString(),
    api_policies: apiPolicies,
  }
  // console.log(vo);
  updateRoleApiPolicies(vo).then(res => {
    proxy?.$Notify.success("更新成功")
    state.toSetPermissionsVis = false
  })
}
</script>

<style lang="scss">
.auth-drawer {
  .el-drawer__body {
    overflow: hidden;
  }
}
</style>