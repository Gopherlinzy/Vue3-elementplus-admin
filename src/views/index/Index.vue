<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <el-row>
      <el-col :span="23" :xs="24" :sm="8" :lg="23">
        <div class="chart-wrapper">
          <lineChart />
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-bottom: 15px;">
      <el-col :span="23" :xs="24" :sm="8" :lg="23">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>快捷入口</span>
            </div>
          </template>
          <el-row :gutter="32">
            <el-col v-for="(card, key) in toolCards" :key="key" :span="8" :xs="8" class="quick-entrance-items"
              @click="toTarget(card.name)">
              <div class="quick-entrance-item">
                <div class="quick-entrance-item-icon" :style="{ backgroundColor: card.bg }">
                  <el-icon style="padding-top: 12px;">
                    <component :is="card.icon" :style="{ color: card.color }" />
                  </el-icon>
                </div>
                <p>{{ card.label }}</p>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

    </el-row>

    <el-row :gutter="24">
      <el-col :xs="8" :lg="7">
        <div class="chart-wrapper">
          <pieChart />
        </div>
      </el-col>
      <el-col :xs="8" :lg="8">
        <div class="chart-wrapper">
          <radarChart />
        </div>
      </el-col>
      <el-col :xs="8" :lg="8">
        <div class="chart-wrapper">
          <!-- <bar-chart /> -->
          <stackedChart />
        </div>
      </el-col>
    </el-row>

    <!-- <el-row :gutter="8">
      <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 24 }" :lg="{ span: 12 }" :xl="{ span: 12 }"
        style="padding-right:8px;margin-bottom:30px;">

      </el-col>
      <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 6 }" :xl="{ span: 6 }"
        style="margin-bottom:30px;">

      </el-col>
      <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 6 }" :xl="{ span: 6 }"
        style="margin-bottom:30px;">

      </el-col>
    </el-row> -->
  </div>
</template>

<script setup lang="ts">
import basic from './components/basic.vue'
import pieChart from './components/Piechart.vue'
import lineChart from './components/LineChart.vue'
import stackedChart from './components/StackedChart.vue'
import radarChart from './components/RadarChart.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const toolCards = ref([
  {
    label: '用户管理',
    icon: 'monitor',
    name: 'users',
    color: '#ff9c6e',
    bg: 'rgba(255, 156, 110,.3)'
  },
  {
    label: '角色管理',
    icon: 'setting',
    name: 'roles',
    color: '#69c0ff',
    bg: 'rgba(105, 192, 255,.3)'
  },
  {
    label: '菜单管理',
    icon: 'menu',
    name: 'menus',
    color: '#b37feb',
    bg: 'rgba(179, 127, 235,.3)'
  },
  {
    label: 'Api管理',
    icon: 'cpu',
    name: 'apis',
    color: '#ffd666',
    bg: 'rgba(255, 214, 102,.3)'
  },
  // {
  //   label: '表单生成器',
  //   icon: 'document-checked',
  //   name: 'formCreate',
  //   color: '#ff85c0',
  //   bg: 'rgba(255, 133, 192,.3)'
  // },
  // {
  //   label: '关于我们',
  //   icon: 'user',
  //   name: 'about',
  //   color: '#5cdbd3',
  //   bg: 'rgba(92, 219, 211,.3)'
  // }
])
const router = useRouter()
const toTarget = (name: string) => {
  router.push({ name })
}
</script>


<style lang="scss" scoped>
.dashboard-editor-container {
  width: 100%;
  height: 100%;
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.quick-entrance-items {
  flex: auto;
  justify-content: center;
  text-align: center;
  color: #333;

  .quick-entrance-item {
    padding: 16px 28px;
    margin-top: -16px;
    margin-bottom: -16px;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
      box-shadow: 0px 0px 7px 0px rgba(217, 217, 217, 0.55);
    }

    cursor: pointer;
    height: auto;
    text-align: center;

    align-items: center;
  }

  .quick-entrance-item-icon {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    flex: auto;
    justify-content: center;
    margin: 0 auto;

    i {
      font-size: 24px;
    }
  }

  p {
    margin-top: 10px;
  }
}
</style>