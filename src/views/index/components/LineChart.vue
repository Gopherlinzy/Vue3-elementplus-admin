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
        title: {
            text: '访问趋势',
            // subtext: 'Fake Data',
            left: 'center'
        },
        legend: {
            top: '5%',
        },
        tooltip: {
            trigger: 'item',
            showContent: false
        },
        dataset: {
            source: [
                ['mon', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                ['PC', 256, 182, 388, 370, 453, 585, 654, 412, 388, 322, 628, 848],
                ['IOS', 51, 351, 255, 253, 373, 268, 489, 567, 325, 257, 489, 635],
                ['安卓', 240, 262, 369, 236, 345, 232, 437, 589, 357, 188, 311, 480],
                ['其他', 125, 137, 141, 118, 133, 149, 178, 154, 166, 240, 133, 233],
            ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: [
            {
                type: 'line',
                // smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series', label: { show: true, } },
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' }]
                }
            },
            {
                type: 'line',
                // smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series', label: { show: true, } },
            },
            {
                type: 'line',
                // smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series', label: { show: true, } }
            },
            {
                type: 'line',
                // smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series', label: { show: true, } },
            },
            {
                type: 'pie',
                id: 'pie',
                radius: ['15%', '30%'],
                center: ['50%', '30%'],
                emphasis: {
                    focus: 'self',
                    label: { show: true, fontSize: '30', fontWeight: 'bold' },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    formatter: '{b}:({d}%)',
                    position: 'outside',
                },
                encode: {
                    itemName: 'mon',
                    value: '12月',
                    tooltip: '12月'
                },
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                }
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
    height: 580px;
    margin: 15px 3px;
    border: 1px solid #333;
    box-shadow: 5px 5px 5px #888888;
}
</style>