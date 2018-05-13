import { Svg } from 'expo'
import _ from 'lodash'
import * as React from 'react'
import { StyleSheet, Text as RText, View } from 'react-native'
import { Card } from 'react-native-elements'
import { PieChart, ProgressCircle } from 'react-native-svg-charts'
import Legend from 'src/components/legend'
import { formatCurrency, scale } from 'src/shared'

import { PercentChart } from '../model'

const { Text, TSpan } = Svg
export interface Props {
  title: string
  color: string[]
  legend: string[]
  data: number[]
  data2: PercentChart | null
  unit: string
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

  componentWillMount() {
    const maxValue: any = _.sum(this.props.data)

    this.setState({
      pieData: this.mapDataToChart(this.props.data.map((value) => _.round((value / maxValue) * 100), 2))
    })
  }

  componentWillReceiveProps(nextProps: Props) {
    const maxValue: any = _.sum(nextProps.data)

    this.setState({
      pieData: this.mapDataToChart(nextProps.data.map((value) => _.round((value / maxValue) * 100), 2))
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
          y={0}
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
            <Text
            key={index}
            x={labelCentroid[0]}
            y={labelCentroid[1]}
            fontSize={12}
            stroke={'black'}
            fill={'none'}
            textAnchor="middle"
          >
            {data.value}%
          </Text>
      )
    })
  }

  render() {
    return (
      <Card
        title={`${this.props.title} (ĐVT: ${this.props.unit.toLowerCase()})`}
        titleStyle={{ textAlign: 'left', marginBottom: 0 }}
        containerStyle={{ marginHorizontal: 0, paddingBottom: 0, paddingTop: 4 }}
        dividerStyle={{ display: 'none' }}
      >
        <View style={styles.rowContainer}>
          <PieChart
            style={[styles.chart, { flex: .5, height: 165 }]}
            data={this.state.pieData}
            innerRadius={45}
            outerRadius={'70%'}
            labelRadius={30}
            animate={true}
          >
            <this.Labels />
          </PieChart>
          {this.props.data2 ? <ProgressCircle
            style={[styles.chart, { height: 115, flex: .5 }]}
            progress={this.props.data2.percent ? this.props.data2.percent : 1}
            progressColor={this.props.color[0]}
            strokeWidth={10}
          >
            <this.CenterText title={`${this.props.data2.percent ? this.props.data2.percent * 100 : 100}%`} />
          </ProgressCircle> : null}
        </View>
        <View
          style={[
            styles.rowContainer,
            { justifyContent: 'space-between', marginHorizontal: 16 }
          ]}
        >
          <RText style={{ flex: .5 }}></RText>
          <RText style={{ flex: .45, fontSize: 12, alignSelf: 'center', textAlign: 'center' }}>
            {this.props.data2 ? formatCurrency(this.props.data2.using) : ''}
          </RText>
        </View>
        <Legend
          data={this.props.legend.map(((item, index) => `${item}: ${formatCurrency(this.props.data[index])}`))}
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
