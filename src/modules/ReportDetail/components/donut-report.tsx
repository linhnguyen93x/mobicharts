import { Entypo } from '@expo/vector-icons'
import { Svg } from 'expo'
import * as React from 'react'
import { StyleSheet, Text as RText, TouchableOpacity, View } from 'react-native'
import { Card } from 'react-native-elements'
import { PieChart } from 'react-native-svg-charts'

const { Text, TSpan } = Svg
export interface Props {
  data: any[]
  data2: any[]
}

interface PieChartProperty {
  svg: object
  key: any
  value: string | number
  arc?: object
}
interface State {
  pieData: PieChartProperty[]
  pie2Data: PieChartProperty[]
  selectedIndex: number | null
}

const pieColor = [
  '#ff7f50',
  '#87cefa',
  '#32cd32',
  '#da70d6',
  '#6495ed',
  '#ff69b4',
  '#ba55d3',
  '#cd5c5c',
  '#ffa500',
  '#40e0d0',
  '#1e90ff',
  '#ff6347',
  '#7b68ee',
  '#00fa9a',
  '#ffd700',
  '#6b8e23',
  '#ff00ff',
  '#3cb371',
  '#b8860b',
  '#30e0e0'
]

class DonutReport extends React.PureComponent<Props, State> {
  state: State = {
    pieData: [],
    pie2Data: [],
    selectedIndex: null
  }

  componentWillMount() {
    const promiseChart = new Promise((resolve, reject) => {
      resolve(this.mapDataToChart(this.props.data))
    })

    const promiseChart2 = new Promise((resolve, reject) => {
      resolve(this.mapDataToChart(this.props.data2))
    })

    Promise.all([promiseChart, promiseChart2]).then((res: any) => {
      this.setState({
        pieData: res[0],
        pie2Data: res[1]
      })
    })
  }

  mapDataToChart = (data: any[]) => {
    return data.filter((value) => value > 0).map((value, index) => ({
      value,
      svg: {
        fill: pieColor[index],
        onPress: () => this.triggerEvent(index)
      },
      key: `pie-${index}`
    }))
  }

  triggerEvent = (index: number) => {
    const mapToSelected = (data: PieChartProperty[]) =>
      data.map(
        (item, pieIndex) =>
          pieIndex === index && this.state.selectedIndex !== index
            ? { ...item, arc: { outerRadius: '120%', cornerRadius: 5 } }
            : { ...item, arc: {} }
      )

    const newPieState = mapToSelected(this.state.pieData)
    const newPie2State = mapToSelected(this.state.pie2Data)

    this.setState({
      pieData: newPieState,
      pie2Data: newPie2State,
      selectedIndex: this.state.selectedIndex === index ? null : index
    })
  }

  CenterText = ({ height, width, title, subTitle }: any) => {
    const distanceLength = (
      Math.abs(title.length - subTitle.length) * 5
    ).toString()

    return (
      <Text x={0} y={-15} stroke={'black'} fill={'none'} textAnchor="middle">
        <TSpan
          x="0"
          dx={title.length >= subTitle.length ? '0' : distanceLength}
        >
          {title}
        </TSpan>
        <TSpan
          x="0"
          dx={subTitle.length < title.length ? distanceLength : '0'}
          dy="30"
        >
          {subTitle}
        </TSpan>
      </Text>
    )
  }

  render() {
    return (
      <Card
        title="Biểu đồ tỉ lệ DTTT theo cấu thành"
        titleStyle={{ textAlign: 'left' }}
        containerStyle={{ marginHorizontal: 0 }}
        dividerStyle={{ display: 'none' }}
      >
        <View style={styles.rowContainer}>
          <PieChart
            style={styles.chart}
            data={this.state.pieData}
            innerRadius={40}
            outerRadius={'70%'}
            labelRadius={90}
            animate={true}
          >
            <this.CenterText title="7 ngày" subTitle="gần đây" />
          </PieChart>
          <PieChart
            style={styles.chart}
            data={this.state.pie2Data}
            innerRadius={40}
            outerRadius={'70%'}
            labelRadius={90}
            animate={true}
            animationDuration={1000}
          >
            <this.CenterText title="Kế hoạch" subTitle="tháng" />
          </PieChart>
        </View>
        <View
          style={[
            styles.rowContainer,
            { justifyContent: 'space-between', marginHorizontal: 16 }
          ]}
        >
          <RText>Chú thích:</RText>
          <RText style={{ fontSize: 12, alignSelf: 'center' }}>
            Đơn vị: Phần trăm (%)
          </RText>
        </View>
        <View style={styles.legendContainer}>
          {this.state.pieData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: '33%'
              }}
              onPress={() => this.triggerEvent(index)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  opacity:
                    this.state.selectedIndex === null
                      ? 1
                      : this.state.selectedIndex === index
                        ? 1
                        : 0.3
                }}
              >
                <Entypo
                  style={{
                    alignSelf: 'flex-start'
                  }}
                  name="dot-single"
                  size={40}
                  color={pieColor[index]}
                />
                <RText
                  style={{
                    textAlign: 'center'
                  }}
                >
                  RM: 25
                </RText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  chart: {
    flex: 0.5,
    height: 200
  },
  legendContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 8
  }
})

export default DonutReport
