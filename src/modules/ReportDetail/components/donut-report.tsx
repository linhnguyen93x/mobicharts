import Echarts from 'native-echarts'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-elements'

export interface Props {
  data: any[]
}

const options = {
  title: {
    text: '7 ngày gần đây',
    left: 'center'
  },
  legend: {
    formatter: '{name}',
    orient: 'horizontal',
    y: 'bottom',
    data: ['A', 'B', 'C', 'D', 'E']
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  calculable: true,
  series: [
    {
      name: 'Pie chart',
      type: 'pie',
      radius: ['30%', '50%'],
      avoidLabelOverlap: false,
      // label: {
      //   normal: {
      //     show: false,
      //     position: 'center'
      //   },
      //   emphasis: {
      //     show: false,
      //     textStyle: {
      //       fontSize: '30',
      //       fontWeight: 'bold'
      //     }
      //   }
      // },
      // labelLine: {
      //   normal: {
      //     show: false
      //   }
      // },
      data: [
        { value: 335, name: 'A' },
        { value: 310, name: 'B' },
        { value: 234, name: 'C' },
        { value: 135, name: 'D' },
        { value: 1548, name: 'E' }
      ]
    }
  ]
}

const options2 = {
  title: {
    text: 'Kế hoạch tháng',
    left: 'center'
  },
  legend: {
    formatter: '{name}',
    orient: 'horizontal',
    y: 'bottom',
    data: ['A', 'B', 'C', 'D', 'E']
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  calculable: true,
  series: [
    {
      name: 'Pie chart',
      type: 'pie',
      radius: ['30%', '50%'],
      avoidLabelOverlap: false,
      // label: {
      //   normal: {
      //     show: false,
      //     position: 'center'
      //   },
      //   emphasis: {
      //     show: false,
      //     textStyle: {
      //       fontSize: '30',
      //       fontWeight: 'bold'
      //     }
      //   }
      // },
      // labelLine: {
      //   normal: {
      //     show: false
      //   }
      // },
      data: [
        { value: 335, name: 'A' },
        { value: 310, name: 'B' },
        { value: 234, name: 'C' },
        { value: 135, name: 'D' },
        { value: 1548, name: 'E' }
      ]
    }
  ]
}

class DonutReport extends React.PureComponent<Props> {
  render() {
    return (
      <Card
        title="Biểu đồ tỉ lệ DTTT theo cấu thành"
        titleStyle={{ textAlign: 'left' }}
        containerStyle={{ marginHorizontal: 0 }}
        dividerStyle={{ display: 'none' }}
      >
        <View style={styles.chartContainer}>
          <View>
            <Echarts option={options} height={200} />
          </View>
          <View style={{ marginTop: 16 }}>
            <Echarts option={options2} height={200} />
          </View>
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1
  }
})

export default DonutReport
