import * as echarts from 'echarts';
import { useEffect } from 'react';




const Home = () => {

    // dom渲染完毕后，才进行图表的渲染
    useEffect(() => {
        // 1、获取渲染图表的dom节点
        const chartDom = document.getElementById('main');

        // 2、图表初始化生成图表实例对象
        const myChart = echarts.init(chartDom);

        // 3、准备图表参数
        const option = {
        xAxis: [
            {
            type: 'category',
            data: ['Vue', 'Angular', 'React'],
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
            data: [10, 40, 60]
            }
        ]
        };

        // 4、使用图表参数完成图表的渲染
        option && myChart.setOption(option);
    }, [])

    return <div><div id='main' style={{width: '500px', height: '400px'}}></div></div>
}

export default Home