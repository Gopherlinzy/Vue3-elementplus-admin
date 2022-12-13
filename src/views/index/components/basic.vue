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
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['30%', '70%'],
                roseType: true,
                data: [
                    { value: 1048, name: 'Search Engine', itemStyle: { color: 'gray' } },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    show: true,
                    position: 'outside'
                },
            }
        ]
    };

    // 数据源给予
    mychart.setOption(option)
}
</script>
<style lang='scss' scoped>
.pchart {
    width: 100%;
    height: 300px;
    margin: 15px 0px;
    border: 1px solid #333;
    box-shadow: 5px 5px 5px #888888;
}
</style>