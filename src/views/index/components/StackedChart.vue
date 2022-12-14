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
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'Email',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Others',
                type: 'bar',
                stack: 'ad',
                emphasis: {
                    focus: 'series'
                },
                label: {
                    show: true
                },
                data: [62, 82, 91, 84, 109, 110, 120]
            }
        ]
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