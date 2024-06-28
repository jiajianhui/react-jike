// 柱状图组件
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

// 1、把功能代码都放到这个组件中
// 2、把可变的部分抽象成prop参数

const BarChart = ({xData, sData, title}) => {

    const chartRef = useRef(null)

    // dom渲染完毕后，才进行图表的渲染
    useEffect(() => {
        // 1、获取渲染图表的dom节点
        const chartDom = chartRef.current

        // 2、图表初始化生成图表实例对象
        const myChart = echarts.init(chartDom)

        // 3、准备图表参数
        const option = {

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            title: {
                text: title
            },
            xAxis: [
                {
                    type: 'category',
                    data: xData,
                    axisTick: {
                        alignWithLabel: true
                    }
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
                    barWidth: '60%',
                    data: sData
                }
            ]
        };

        // 4、使用图表参数完成图表的渲染
        myChart.setOption(option);
    }, [])

    return <div ref={chartRef} style={{width: '500px', height: '400px'}}></div>
}

export default BarChart