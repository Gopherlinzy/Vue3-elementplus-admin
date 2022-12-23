<template>

  <div class="table-box">
    <div style="text-align:left; margin:5px 10px;">
      <el-button v-BTNVis="'/api/v1/menus:POST'" type="primary" @click="toAddMenu" icon="Plus">&nbsp;新增</el-button>
      <el-button plain icon="Sort" type="primary" @click="toggleExpandAll">展开/折叠</el-button>
    </div>

    <!-- api form表单 -->
    <el-dialog v-model="state.menuFormDialogVis" :title="state.tips" width="680px">
      <el-divider style="margin-top: -30px;" />
      <el-form ref="userForm" :model="state.menuFormData" :rules="state.rules" label-width="100px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="state.menuFormData.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="permission">
          <el-input v-model="state.menuFormData.permission" placeholder="请输入权限"></el-input>
        </el-form-item>
        <el-form-item label="路由名称" prop="router_name">
          <el-input v-model="state.menuFormData.router_name" placeholder="请输入路由名称"></el-input>
        </el-form-item>
        <el-form-item label="路由路径" prop="router_path">
          <el-input v-model="state.menuFormData.router_path" placeholder="请输入路由路径"></el-input>
        </el-form-item>
        <el-form-item label="父节点" prop="father_id">
          <el-cascader v-model="state.menuFormData.father_id" :options="state.menuOptions" :props="{
            checkStrictly: true, value: 'id', label: 'name', disabled: 'disabled', emitPath: false
          }" :show-all-levels="false" filterable placeholder="请选择父节点">
          </el-cascader>
        </el-form-item>
        <el-form-item label="icon图标" prop="icon" width="30px">
          <el-col :span="8">
            <el-popover placement="bottom-start" :width="540" v-model:visible="state.showSelectIconVis" trigger="click"
              @show="showSelectIcon">
              <template #reference>
                <el-input v-model="state.menuFormData.icon" placeholder="点击选择icon图标" v-click-outside="hideSelectIcon"
                  readonly>
                  <template #prefix>
                    <el-icon style="height:32px;width:16px" v-if="state.menuFormData.icon">
                      <component :is="state.menuFormData.icon"></component>
                    </el-icon>
                    <el-icon style="height:32px;width:16px" v-else>
                      <Search />
                    </el-icon>
                  </template>
                </el-input>
              </template>
              <IconsSelect @selected="selected"></IconsSelect>
            </el-popover>
          </el-col>
        </el-form-item>
        <el-form-item label="文件路径" prop="vue_path">
          <el-input v-model="state.menuFormData.vue_path" placeholder="请输入文件路径"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-dropdown>
            <el-button type="default" v-model="state.menuFormData.status"> {{
                state.menuFormData.status === 'true' ? '显示' : '隐藏'
            }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu v-for="item in state.status">
                <el-dropdown-item @click="() => { state.menuFormData.status = item === '显示' ? 'true' : 'false' }">{{
                    item
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="handelAddUpdateConfirm()">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 菜单表格 -->
    <div style="margin:0px 10px; text-align:left;">
      <el-table v-if="refreshTable" :data="state.menus" row-key="id" :default-expand-all="isExpandAll">
        <el-table-column prop="id" label="ID" width="150px">
          <template #default="scope">
            <el-tag :type="scope.row.father_id === 0 ? '' : 'success'">
              {{ scope.row.father_id === 0 ? '目录' : '菜单' }}
            </el-tag>
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="菜单名称" width="120px"></el-table-column>
        <el-table-column prop="permission" label="权限" width="220px"></el-table-column>
        <el-table-column prop="icon" label="Icon图标" width="180px">
          <template #default="scope">
            <div v-if="scope.row.icon" class="icon-column">
              <el-icon>
                <component :is="scope.row.icon" />
              </el-icon>
              <span>{{ scope.row.icon }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="router_name" label="路由名称" width="120px"></el-table-column>
        <el-table-column prop="router_path" label="路由路径" width="120px"></el-table-column>
        <el-table-column prop="father_id" label="父节点"></el-table-column>
        <el-table-column prop="vue_path" label="文件路径" width="250px"></el-table-column>
        <el-table-column prop="status" label="是否显示" width="80px">
          <template #default="scope">
            <span>{{ scope.row.status ? "显示" : "隐藏" }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150px">
          <template #default="scope">
            <el-button v-BTNVis="'/api/v1/menus:PUT'" type="primary" link size="small"
              @click="updateCurrMenu(scope.row)" icon="Edit">编辑</el-button>
            <el-button v-BTNVis="'/api/v1/menus:DELETE'" type="primary" link size="small"
              @click="deleteCurrMenu(scope.row)" icon="DeleteFilled">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
import { ComponentInternalInstance, getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue'
import {
  getAllMenus,
  getAllBaseMenus,
  addmenu,
  updatemenu,
  deletemenu
} from "@/api/system/menu"
import { ClickOutside as vClickOutside } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import IconsSelect from '@/components/iconSelect/iconSelect.vue'
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const state = reactive({
  menus: [],
  status: ['显示', '隐藏'],
  currentPage: 1,
  menuFormDialogVis: false,
  showSelectIconVis: false,
  tips: '',
  menuFormData: {
    id: '',
    name: '',
    permission: '',
    icon: '',
    router_name: '',
    router_path: '',
    father_id: '',
    vue_path: '',
    status: 'true'
  },
  menuOptions: [],
  tableData: [],
  rules: {
    name: [
      {
        required: true,
        message: '请输入菜单名称',
        trigger: 'blur',
      },
    ],
    permission: [
      {
        required: true,
        message: '请输入权限',
        trigger: 'blur',
      },
      {
        pattern: /^[a-zA_Z:]{3,50}$/,
        message: '权限格式错误，只允许英文和冒号,权限长度需在 3~50 之间',
        trigger: 'blur'
      },
    ],
    router_name: [
      {
        required: true,
        message: '请输入路由名称',
        trigger: 'blur',
      },
    ],
    router_path: [
      {
        required: true,
        message: '请输入路由路径',
        trigger: 'blur',
      },
      {
        pattern: /^[a-zA_Z//]{3,50}$/,
        message: '路由格式错误，只允许英文和 / ,路由长度需在 3~50 之间',
        trigger: 'blur'
      },
    ],
    vue_path: [
      {
        required: true,
        message: '请输入文件路径',
        trigger: 'blur',
      },
      {
        pattern: /^[a-zA_Z//@]{3,100}$/,
        message: '文件路径格式错误，只允许英文、/ 和 @,文件路径长度需在 3~100 之间',
        trigger: 'blur'
      },
    ],
  }
})
// 是否展开
const isExpandAll = ref(true)
// 刷新表格
const refreshTable = ref(true)

// 初始化
onMounted(() => {
  getMenus()
})

// 获取菜单
const getMenus = () => {
  getAllMenus().then(result => {
    state.menus = result.data
  })
}

const setOptions = async () => {
  state.menuOptions = [
    {
      id: '0',
      name: '根目录',
      disabled: '',
    } as never
  ]
  await getAllBaseMenus().then(res => {
    state.tableData = res.data
  })
  // console.log(state.tableData);

  setMenuOptions(state.tableData, state.menuOptions, false)
}

// 获取菜单目录列表
const setMenuOptions = (menuData: any[], optionsData: any[], disabled: boolean) => {
  // console.log(state.menuFormData);

  menuData && menuData.forEach(menu => {
    // console.log(menu);

    if (menu.children && menu.children.length) {
      const option = {
        name: menu.name,
        id: String(menu.id),
        disabled: disabled || menu.id.toString() === state.menuFormData.id,
        children: [] as any,
      }
      setMenuOptions(
        menu.children,
        option.children,
        disabled || menu.id.toString() === state.menuFormData.id
      )
      optionsData.push(option)
    } else {
      const option = {
        name: menu.name,
        id: String(menu.id),
        disabled: disabled || menu.id.toString() === state.menuFormData.id,
      }
      optionsData.push(option)
    }
  })
  // console.log(optionsData);
}

// 新增菜单
const toAddMenu = () => {
  resetForm()
  state.menuFormDialogVis = true
  state.tips = '新增菜单'
  setOptions()
}

// 更新菜单
const updateCurrMenu = (selectMenu: object) => {
  state.tips = '更新菜单信息'
  state.menuFormDialogVis = true
  state.menuFormData = JSON.parse(JSON.stringify(selectMenu))
  state.menuFormData.father_id = selectMenu.father_id.toString()
  state.menuFormData.id = state.menuFormData.id.toString()
  state.menuFormData.status = selectMenu.status === true ? 'true' : 'false'
  // console.log(selectMenu);
  setOptions()
}

// 确认新增/更新菜单
const handelAddUpdateConfirm = () => {
  // console.log(state.menuFormData);
  state.menuFormData.father_id = state.menuFormData.father_id.toString()
  // tips 为新增 api表示新增
  if (state.tips.startsWith('新增菜单')) {
    // console.log(state.userFormData);
    addmenu(state.menuFormData).then(res => {
      // console.log(res);
      if (res.success) {
        state.menuFormDialogVis = false
        getMenus()
        proxy?.$Notify.success("添加菜单成功")
      }
    })
  } else if (state.tips.startsWith('更新菜单信息')) {
    // console.log(state.menuFormData);
    // state.menuFormData.status = state.menuFormData.status === true ? 'true' : 'false'
    updatemenu(state.menuFormData).then(res => {
      if (res.success) {
        state.menuFormDialogVis = false
        getMenus()
        proxy?.$Notify.success("更新菜单信息成功")
      }
    })
  }
}

// 删除菜单
const deleteCurrMenu = (menu: API.menuForm) => {
  let msg: string
  let title: string
  if (menu.father_id === '0') {
    title = '删除目录'
    msg = "确认要删除目录名为: <" + menu.name + '> 的数据以及他的子菜单吗？'
  } else {
    title = '删除菜单'
    msg = "确认要删除菜单名为: <" + menu.name + '> 的数据吗？'
  }
  proxy?.$Confirm(msg, title).then(() => {
    resetForm()
    state.menuFormData.id = id.toString()
    deletemenu(state.menuFormData).then(res => {
      // console.log(res);
      getMenus()
      proxy?.$Notify.success("删除成功")
    })
  }).catch(() => { })
}

// 清空 form
const resetForm = () => {
  let menuid = ''
  if (state.tips === '更新menu信息') {
    menuid = state.menuFormData.id.toString()
  }
  state.menuFormData.id = menuid
  state.menuFormData.name = ''
  state.menuFormData.permission = ''
  state.menuFormData.icon = ''
  state.menuFormData.router_name = ''
  state.menuFormData.router_path = ''
  state.menuFormData.father_id = ''
  state.menuFormData.status = 'true'
  state.menuFormData.vue_path = ''
}

// 展开/折叠事件
const toggleExpandAll = () => {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    refreshTable.value = true
  })
}

// 展开icon的弹窗
const showSelectIcon = () => {
  state.showSelectIconVis = true
}

// 隐藏起泡卡片
const hideSelectIcon = () => {
  state.showSelectIconVis = false
}

// 选择图标
const selected = (name: string) => {
  state.menuFormData.icon = name
  state.showSelectIconVis = false
}
</script>

<style lang="scss" scoped>
.table-box {
  padding: 24px;
  background-color: #fff;
  border-radius: 2px;
  // position: relative;
}

.pagination {
  display: flex;
  justify-content: flex-end;

  .el-pagination {
    padding-top: 20px;
  }
}

.icon-column {
  display: flex;
  align-items: center;

  .el-icon {
    margin-right: 8px;
  }
}
</style>