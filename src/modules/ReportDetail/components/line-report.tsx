// import Echarts from 'native-echarts'
// import * as React from 'react'
// import { Card } from 'react-native-elements'

// const option = {
//   tooltip: {
//     trigger: 'axis'
//   },
//   legend: {
//     orient: 'horizontal',
//     y: 'bottom',
//     data: ['A', 'B', 'C', 'D', 'E']
//   },
//   grid: {
//     top: '10%',
//     left: '0',
//     right: '5%',
//     bottom: '10%',
//     containLabel: true
//   },
//   xAxis: {
//     type: 'category',
//     boundaryGap: false,
//     data: ['1/4', '2/4', '3/4', '4/4', '5/5', '6/4', '7/4']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       name: 'A',
//       type: 'line',
//       data: [120, 132, 101, 134, 90, 230, 210],
//       symbolSize: 8
//     },
//     {
//       name: 'B',
//       type: 'line',
//       data: [220, 182, 191, 234, 290, 330, 310],
//       symbolSize: 8
//     },
//     {
//       name: 'C',
//       type: 'line',
//       data: [150, 232, 201, 154, 190, 330, 410],
//       symbolSize: 8
//     },
//     {
//       name: 'D',
//       type: 'line',
//       data: [320, 332, 301, 334, 390, 330, 320],
//       symbolSize: 8
//     },
//     {
//       name: 'E',
//       type: 'line',
//       data: [820, 932, 901, 934, 1290, 1330, 1320],
//       symbolSize: 8
//     }
//   ]
// }

// class LineReport extends React.PureComponent<any, any> {
//   render() {
//     return (
//       <Card
//         title="Biểu đồ đường DTTT theo cấu thành trong 7 ngày gần đây:"
//         titleStyle={{ textAlign: 'left' }}
//         containerStyle={{ marginHorizontal: 0 }}
//         dividerStyle={{ display: 'none' }}
//       >
//         <Echarts option={option} height={300} />
//       </Card>
//     )
//   }
// }

// export default LineReport
