<template>

  <div>
    <div style="text-align:left; margin:5px 10px;">
      <el-button v-BTNVis="'/api/v1/apis:POST'" type="primary" @click="toAddApi"><el-icon>
          <Plus />
        </el-icon>&nbsp;新增</el-button>
    </div>

    <!-- api form表单 -->
    <el-dialog v-model="state.apiFormDialogVis" :title="state.tips">
      <el-divider style="margin-top: -30px;" />
      <el-form ref="userForm" :model="state.apiFormData" :rules="state.rules" label-width="100px">
        <el-form-item label="Api路由" prop="path">
          <el-input v-model="state.apiFormData.path" placeholder="请输入Api路由"></el-input>
        </el-form-item>
        <el-form-item label="Api分组" prop="api_group">
          <el-input v-model="state.apiFormData.api_group" placeholder="请输入Api分组"></el-input>
        </el-form-item>
        <el-form-item label="Api描述" prop="description">
          <el-input v-model="state.apiFormData.description" placeholder="请输入Api描述"></el-input>
        </el-form-item>
        <el-form-item label="请求" prop="method">
          <el-dropdown>
            <el-button type="default" v-model="state.apiFormData.method">{{ state.apiFormData.method }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu v-for="item in state.methods">
                <el-dropdown-item @click="() => { state.apiFormData.method = item }">{{ item
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="handelAddUpdateConfirm(state.apiFormData.id)">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!-- api表格 -->
    <div style="margin:0px 10px; text-align:left;">
      <el-table stripe :data="state.apis">
        <el-table-column prop="id" label="ID" width="80px"></el-table-column>
        <el-table-column prop="path" label="API路由"></el-table-column>
        <el-table-column prop="api_group" label="API分组" width="120px"></el-table-column>
        <el-table-column prop="description" label="API描述"></el-table-column>
        <el-table-column prop="method" label="请求" width="80px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180px">
          <template #default="scope">
            <el-button v-BTNVis="'/api/v1/apis:PUT'" type="primary" link size="small"
              @click="updateCurrApi(scope.row)"><el-icon>
                <Edit />
              </el-icon>&nbsp;编辑</el-button>
            <el-button v-BTNVis="'/api/v1/apis:DELETE'" type="primary" link size="small"
              @click="deleteCurrApi(scope.row.id)"><el-icon>
                <DeleteFilled />
              </el-icon>&nbsp;删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row style="float:right;">
        <el-pagination v-model:current-page="state.currentPage" background
          layout="total, sizes, prev, pager, next, jumper" v-model:page-size="state.pageSize"
          :page-sizes="[5, 10, 15, 20, 25]" :page-count="state.apisPag.TotalPage" :total="state.apisPag.TotalCount"
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
import {
  getAllApis,
  getPagApis,
  addApi,
  updateApi,
  deleteApi,
} from "@/api/system/api"
import { getPagination } from '@/api/pagination'
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const state = reactive({
  apis: [],
  apisPag: [] as any,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  currentPage: 1,
  pageSize: 10,
  apiFormDialogVis: false,
  tips: '',
  apiFormData: {
    id: '',
    path: '',
    description: '',
    api_group: '',
    method: 'GET'
  },
  rules: {
    path: [
      {
        required: true,
        message: '请输入API路由',
        trigger: 'blur',
      },
      {
        pattern: /^[a-zA_Z//]{3,50}$/,
        message: '路由格式错误，只允许英文和 / ,路由长度需在 3~50 之间',
        trigger: 'blur'
      },
    ],
    api_group: [
      {
        required: true,
        message: '请输入API分组',
        trigger: 'blur',
      },
    ],
    method: [
      {
        required: true,
        message: '请选择API请求方法',
        trigger: 'blur',
      },
    ],
  }
})


// 初始化
onMounted(() => {
  getApis()
})

// 分页
// 跳转到指定页数
const handelCurrentChange = (val: number) => {
  getPagination("apis/pag", val, "id", "asc", state.pageSize).then(result => {
    // console.log(result);
    state.apis = result.data
    state.apisPag = result.pager
    state.currentPage = val
  })
}

// 制定每页条数
const handleSizeChange = (val: number) => {
  state.pageSize = val
  getPagination("apis/pag", 1, "id", "asc", state.pageSize).then(result => {
    // console.log(result);

    state.apis = result.data
    state.apisPag = result.pager
    state.currentPage = 1
  })
}

// 获取api
const getApis = () => {
  getPagApis().then(result => {
    // console.log(result);
    state.apis = result.data
    state.apisPag = result.pager
    handelCurrentChange(state.currentPage)
  })
}

// 重置
const resetForm = () => {
  let apiid = ''
  if (state.tips === '更新api信息') {
    apiid = state.apiFormData.id.toString()
  }
  state.apiFormData.id = apiid
  state.apiFormData.path = ''
  state.apiFormData.api_group = ''
  state.apiFormData.description = ''
  state.apiFormData.method = 'GET'
}

// 新增api
const toAddApi = () => {
  state.apiFormDialogVis = true
  state.tips = '新增api'
  resetForm()
}

// 更新 api
const updateCurrApi = (selectApi: object) => {
  state.tips = '更新api信息'
  state.apiFormDialogVis = true
  state.apiFormData = JSON.parse(JSON.stringify(selectApi))
  state.apiFormData.id = state.apiFormData.id.toString()
}

// 确认新增/修改 api
const handelAddUpdateConfirm = (id: string) => {
  // tips 为新增 api表示新增
  if (state.tips.startsWith('新增api')) {
    // console.log(state.userFormData);
    addApi(state.apiFormData).then(res => {
      // console.log(res);
      if (res.success) {
        state.apiFormDialogVis = false
        getApis()
        proxy?.$Notify.success("添加api成功")
      }
    })
  } else if (state.tips.startsWith('更新api信息')) {
    updateApi(state.apiFormData).then(res => {
      if (res.success) {
        state.apiFormDialogVis = false
        getApis()
        proxy?.$Notify.success("更新api信息成功")
      }
    })
  }
}

// 删除api
const deleteCurrApi = (id: string) => {
  proxy?.$Confirm('确认要删除此条 api 数据吗？', '删除 api').then(() => {
    resetForm()
    state.apiFormData.id = id.toString()
    deleteApi(state.apiFormData).then(res => {
      // console.log(res);
      handelCurrentChange(state.currentPage)
      proxy?.$Notify.success("删除api成功")
    })
  }).catch(() => { })
}

</script>
