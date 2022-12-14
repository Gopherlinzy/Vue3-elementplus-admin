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
        // title: {
        //     text: 'Basic Radar Chart'
        // },
        legend: {
            top: '5%',
            data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: 'Sales', max: 6500 },
                { name: 'Administration', max: 16000 },
                { name: 'Information Technology', max: 30000 },
                { name: 'Customer Support', max: 38000 },
                { name: 'Development', max: 52000 },
                { name: 'Marketing', max: 25000 }
            ]
        },
        series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                // areaStyle: {},
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: 'Allocated Budget'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: 'Actual Spending'
                    }
                ]
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