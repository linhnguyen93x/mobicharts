import { Entypo } from '@expo/vector-icons'
import * as scale from 'd3-scale'
import { Svg } from 'expo'
import { Dictionary } from 'lodash'
import moment from 'moment'
import * as React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Divider, ListItem, normalize } from 'react-native-elements'
import { BarChart, PieChart, XAxis } from 'react-native-svg-charts'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { appEpic$ } from 'src/+state/epics'
import { FilterTab } from 'src/components'
import { TimePicker } from 'src/components/time-picker'
import { formatCurrency, groupColors } from 'src/shared'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'

import { globalStyle } from '../../../style'
import { getSummaryChartAction } from '../actions'
import { summaryChartEpic } from '../epics'
import { SummaryChartResponse } from '../model'
import { getAll } from '../selectors'

const { LinearGradient, Stop, Defs } = Svg

interface SummaryChartProps extends ConnectedReduxProps<SummaryChartState> {
  data: Dictionary<SummaryChartResponse[]>
}

interface SummaryChartState {
  reportDate: string
  timeType: number
}

export interface SummaryChartParams {
  codeReport: string
  timeType: number
  colors: string[]
  selectedTime: string
}

enum Filter {
  DAY = 'NGÀY',
  WEEK = 'TUẦN',
  MONTH = 'THÁNG',
  YEAR = 'NĂM'
}

class ChartTab extends React.Component<SummaryChartProps, SummaryChartState> {
  state = {
    reportDate: moment()
      .subtract(7, 'days')
      .format('DD/MM/YYYY'),
    timeType: 1
  }

  componentWillMount() {
    const currentEpic = appEpic$.value

    if (currentEpic !== summaryChartEpic) {
      appEpic$.next(summaryChartEpic)
    }

    this.getData()
  }

  getData = () => {
    this.props.dispatch(
      getSummaryChartAction({
        datereport: this.state.reportDate,
        tab: this.state.timeType
      })
    )
  }

  keyExtractor = (item: SummaryChartResponse, index: number) => {
    return item.label
  }

  Gradient = () => (
    <Defs key={'gradient'}>
      <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
        <Stop offset={'0%'} stopColor={'rgba(183,210,67,1)'} />
        <Stop offset={'100%'} stopColor={'rgb(163, 197, 46)'} />
      </LinearGradient>
    </Defs>
  )

  renderItem = ({
    item,
    index
  }: {
    item: SummaryChartResponse
    index: number
  }) => {
    const groupColor = groupColors[index % groupColors.length]
    const barColor = groupColor[0]
    const barOption = item.bieuDoCot
      ? item.bieuDoCot.map((item) => item.value)
      : []
    const barLegend = item.bieuDoCot
      ? item.bieuDoCot.map((item) => item.label)
      : []

    const pieData = item.bieuDoCoCau ? item.bieuDoCoCau : []
    const pieOption = pieData.map((item, index) => ({
      value: item.value,
      svg: { fill: groupColor[index % groupColor.length] },
      key: `pie-${index}`
    }))

    return (
      <ListItem
        scaleProps={{
          friction: 90,
          tension: 100,
          activeScale: 0.95
        }}
        onPress={() => {
          const params: SummaryChartParams = {
            codeReport: item.codeReport,
            timeType: this.state.timeType,
            colors: groupColor,
            selectedTime: this.state.reportDate
          }
          return this.props.navigation.navigate('ChartDetail', params)
        }}
        title={
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginBottom: 16,
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 13, marginRight: 4, fontWeight: '500' }}>
              {item.label}
            </Text>
            <Divider style={{ flex: 1 }} />
          </View>
        }
        subtitle={
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 24
              }}
            >
              <Text
                style={[
                  globalStyle.styles.fontWeightBold,
                  { textAlign: 'center', fontSize: 18 }
                ]}
              >
                {item.tongCong ? formatCurrency(item.tongCong) : '-'}
              </Text>
              <Text
                style={[
                  globalStyle.styles.fontWeightBold,
                  globalStyle.styles.textAlignCenter,
                  { fontSize: 12 }
                ]}
              >
                {item.unit}
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                alignItems: 'center',
                alignSelf: 'flex-start'
              }}
            >
              <PieChart
                style={{ height: 89, width: '100%' }}
                data={pieOption}
                spacing={0}
                outerRadius={'90%'}
                padAngle={0}
              />
              <View
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: 5
                }}
              >
                {pieData.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        width: '50%',
                        paddingHorizontal: 4
                      }}
                    >
                      <Entypo
                        style={{
                          alignSelf: 'flex-start'
                        }}
                        name="controller-record"
                        size={16}
                        color={groupColor[index % groupColor.length]}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          alignSelf: 'flex-start'
                        }}
                      >
                        {' ' + item.label}
                      </Text>
                    </View>
                  )
                })}
              </View>
            </View>
            <View style={{ flex: 0.3, alignSelf: 'flex-start' }}>
              <BarChart
                style={{ height: 85 }}
                data={barOption}
                contentInset={{ top: 5, bottom: 5 }}
                spacingInner={0.25}
                svg={{
                  strokeWidth: 2,
                  fill: barColor
                }}
              >
                <this.Gradient />
              </BarChart>
              <XAxis
                style={{ marginTop: 11 }}
                data={barOption}
                scale={scale.scaleBand}
                spacingInner={0.25}
                formatLabel={(value: any, index: number) => barLegend[index]}
                labelStyle={{ color: 'black' }}
                svg={{
                  fontSize: normalize(8)
              }}
              />
            </View>
          </View>
        }
      />
    )
  }

  render() {
    const { data } = this.props
    const renderData = data[`${this.state.reportDate}_${this.state.timeType}`]

    // console.log(renderData)

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {`Báo cáo ngày ${this.state.reportDate}`.toUpperCase()}
        </Text>
        <FilterTab
          data={[Filter.DAY, Filter.WEEK, Filter.MONTH, Filter.YEAR]}
          onItemSelected={(item) =>
            this.setState({ timeType: item }, () => this.getData())
          }
        />
        <TimePicker
          defaultValue={this.state.reportDate}
          onDateChange={(reportDate) => {
            this.setState({ reportDate }, () => this.getData())
          }}
        />
        <FlatList
          style={{ marginTop: 8 }}
          keyExtractor={this.keyExtractor}
          data={renderData}
          renderItem={this.renderItem}
        />
        {/* <Button title="Add" onPress={() => { dispatch(addTodo('Hello Bi')) }} />
        {todos.map((t) => <Text key={t.id}>{t.text}</Text>)} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE9E6'
  },
  header: {
    padding: 15,
    textAlign: 'center',
    backgroundColor: '#EAE9E6',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default connect(
  createStructuredSelector({
    data: getAll
  })
)(ChartTab)
