import { Svg } from 'expo'
import * as React from 'react'
import { StyleSheet, Text as RText, View } from 'react-native'
import { Card } from 'react-native-elements'
import { G } from 'react-native-svg'
import { PieChart, ProgressCircle } from 'react-native-svg-charts'
import Legend from 'src/components/legend'
import { scale } from 'src/shared'

import { PercentChart } from '../model'

const { Text, TSpan } = Svg
export interface Props {
  color: string[]
  legend: string[]
  data: number[]
  data2: PercentChart | null
}

interface PieChartProperty {
  svg: object
  key: any
  value: string | number
  arc?: object
}
interface State {
  pieData: PieChartProperty[]
  selectedIndex: number | null
}

class DonutReport extends React.PureComponent<Props, State> {
  state: State = {
    pieData: [],
    selectedIndex: null
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps: Props) {
    const promiseChart = new Promise((resolve, reject) => {
      resolve(this.mapDataToChart(nextProps.data))
    })

    Promise.all([promiseChart]).then((res: any) => {
      this.setState({
        pieData: res[0]
      })
    })
  }

  mapDataToChart = (data: any[]) => {
    return data.filter((value) => value > 0).map((value, index) => ({
      value,
      svg: {
        fill: this.props.color[index],
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

    this.setState({
      pieData: newPieState,
      selectedIndex: this.state.selectedIndex === index ? null : index
    })
  }

  CenterText = ({ height, width, title, subTitle }: any) => {
    if (!subTitle) {
      return (
        <Text
          x={0}
          y={-10}
          fontSize={20}
          stroke={'black'}
          fill={'black'}
          textAnchor="middle"
        >
          {title}
        </Text>
      )
    }

    const distanceLength = scale(
      Math.abs(title.length - subTitle.length) * 10
    ).toString()

    return (
      <Text
        x={0}
        y={-15}
        fontSize={12}
        stroke={'black'}
        fill={'none'}
        textAnchor="middle"
      >
        <TSpan
          x="0"
          dx={title.length >= subTitle.length ? '0' : distanceLength}
        >
          {title}
        </TSpan>
        <TSpan
          x="0"
          dx={subTitle.length < title.length ? distanceLength : '0'}
          dy={scale(34).toString()}
        >
          {subTitle}
        </TSpan>
      </Text>
    )
  }

  Labels = ({ slices }: any) => {
    return slices.map((slice: any, index: number) => {
      const { labelCentroid, data } = slice
      return (
        <G key={index}>
            <Text
            x={labelCentroid[0]}
            y={labelCentroid[1]}
            fontSize={12}
            stroke={'black'}
            fill={'none'}
            textAnchor="middle"
          >
            {data.value}
          </Text>
        </G>
      )
    })
  }

  render() {
    return (
      <Card
        title="Biểu đồ tỉ lệ:"
        titleStyle={{ textAlign: 'left' }}
        containerStyle={{ marginHorizontal: 0 }}
        dividerStyle={{ display: 'none' }}
      >
        <View style={styles.rowContainer}>
          <PieChart
            style={styles.chart}
            data={this.state.pieData}
            innerRadius={55}
            outerRadius={'70%'}
            labelRadius={85}
            animate={true}
          >
            <this.Labels />
          </PieChart>
          {this.props.data2 ? <ProgressCircle
            style={[styles.chart, { height: 130, marginTop: 5 }]}
            progress={this.props.data2 ? this.props.data2.percent : 0}
            progressColor={this.props.color[0]}
            strokeWidth={10}
          >
            <this.CenterText title="70%" />
          </ProgressCircle> : null}
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
        <Legend
          data={this.props.legend}
          color={this.props.color}
          onPress={(index) => this.triggerEvent(index)}
          selectedIndex={this.state.selectedIndex}
        />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
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
