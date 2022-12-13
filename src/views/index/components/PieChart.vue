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
            text: '库存剩余',
            // subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '10%',
            left: 'left'
        },
        series: [
            {
                name: '库存',
                type: 'pie',
                radius: ['30%', '70%'],
                data: [
                    { value: 1048, name: '可乐' },
                    { value: 735, name: '咖啡' },
                    { value: 580, name: '汉堡' },
                    { value: 484, name: '薯条' },
                ],
                emphasis: {
                    label: { show: true, fontSize: '30', fontWeight: 'bold' },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    show: false,
                    position: 'center'
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