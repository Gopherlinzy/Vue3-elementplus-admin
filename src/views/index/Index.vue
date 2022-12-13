<!-- -->
<template>
  <div class="charts">
    <el-row :gutter="3">
      <el-col :span="8">
        <!-- <basic></basic> -->
      </el-col>
      <el-col :span="12"></el-col>
      <el-col :span="4">
        <pieChart></pieChart>
        <!-- <basic></basic> -->
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup>
import basic from './components/basic.vue'
import pieChart from './components/Piechart.vue'


</script>

<style lang='scss'>
.charts {
  width: 100%;
  height: 100%;
}
</style>