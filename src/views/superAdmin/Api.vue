<template>

  <div>
    <div style="text-align:left; margin:5px 10px;">
      <el-button type="primary" @click="toAddRole"><el-icon>
          <Plus />
        </el-icon>&nbsp;新增</el-button>
    </div>
    <!-- api表格 -->
    <div style="margin:0px 10px; text-align:left;">
      <el-table stripe :data="state.apis">
        <el-table-column prop="id" label="ID" width="50px"></el-table-column>
        <el-table-column prop="api_path" label="API路由" width="180px"></el-table-column>
        <el-table-column prop="api_group" label="API分组" width="100px"></el-table-column>
        <el-table-column prop="description" label="API描述" width="220px"></el-table-column>
        <el-table-column prop="method" label="请求" width="80px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="220px">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="updateCurrRole(scope.row)"><el-icon>
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
} from "@/api/system/api"
import { getPagination } from '@/api/pagination'
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const state = reactive({
  apis: [],
  apisPag: [] as any,
  currentPage: 1,
  pageSize: 10,
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



// 获取角色
const getApis = () => {
  getPagApis().then(result => {
    // console.log(result);
    state.apis = result.data
    state.apisPag = result.pager
    handelCurrentChange(state.currentPage)
  })
}


</script>
