<!--  -->
<template>
    <div>
        <div ref="main" class="pchart">

        </div>
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue';

const main = ref()

onMounted(() => {
    init()
})

const init = () => {
    // 1.通过 dom 初始化 charts
    // let mychart = echarts.init(document.getElementById('main') as HTMLElement)
    // 2.ref虚拟化dom
    let mychart = echarts.init(main.value)
    // 数据源
    var option = {

    };

    // 数据源给予
    mychart.setOption(option)

    //图形宽度随屏幕宽度改变而改变
    window.addEventListener("resize", () => {
        mychart.resize();
    })
}
</script>
<style lang='scss' scoped>
.pchart {
    width: 100%;
    height: 400px;
    margin: 15px 0px;
    // border: 1px solid #333;
    // box-shadow: 5px 5px 5px #888888;
}
</style>