import { Entypo } from '@expo/vector-icons'
import moment from 'moment'
import Echarts from 'native-echarts'
import * as React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import PieChart from 'react-native-pie-chart'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { appEpic$ } from 'src/+state/epics'
import { FilterTab } from 'src/components'
import { TimePicker } from 'src/components/time-picker'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'

import { globalStyle } from '../../../style'
import { getSummaryChartAction } from '../actions'
import { summaryChartEpic } from '../epics'
import { Chart, SummaryChartResponse } from '../model'
import { getAll } from '../selectors'

interface SummaryChartProps extends ConnectedReduxProps<SummaryChartState> {
  data: SummaryChartResponse[]
}

interface SummaryChartState {
  reportDate: string
}

enum Filter {
  DAY = 'NGÀY',
  WEEK = 'TUẦN',
  MONTH = 'THÁNG',
  YEAR = 'NĂM'
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

class ChartTab extends React.Component<SummaryChartProps, SummaryChartState> {
  state = {
    reportDate: moment().format('DD/MM/YYYY')
  }

  componentWillMount() {
    console.log('Hello Chart')
    const currentEpic = appEpic$.value

    if (currentEpic !== summaryChartEpic) {
      appEpic$.next(summaryChartEpic)
    }

    this.getData()
  }

  getData = () => {
    this.props.dispatch(
      getSummaryChartAction({
        p_issue_date: '19/03/2018',
        p_time_type: 1,
        p_report_type: 'PTM'
      })
    )
  }

  keyExtractor = (item: SummaryChartResponse, index: number) => {
    return item.label
  }

  getBarOption = (item: Chart[], color?: string) => {
    const data = item.map((item) => item.value)

    return {
      grid: {
        borderWidth: 0,
        y: 0,
        y2: 0,
        x: 0,
        x2: 0
      },
      xAxis: [
        {
          type: 'category',
          show: false,
          data: ['', '', '', '', '', '', '', '', '', '', '']
        }
      ],
      yAxis: [
        {
          type: 'value',
          show: false
        }
      ],
      series: [
        {
          name: '',
          type: 'bar',
          itemStyle: {
            normal: {
              color: color ? color : '#26C0C0'
            }
          },
          data
        }
      ]
    }
  }

  getPieOption = (item: Chart[]) => {
    const data = item.map((i) => {
      return { name: i.label, value: i.value }
    })

    return {
      color: pieColor,
      series: [
        {
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          name: 'Reference Page',
          type: 'pie',
          radius: ['30%', '50%'],
          data
        }
      ]
    }
  }

  renderItem = ({
    item,
    index
  }: {
    item: SummaryChartResponse
    index: number
  }) => {
    const barOption = this.getBarOption(
      item.bieuDoCot ? item.bieuDoCot : [],
      index % 2 === 0 ? '#B7D243' : '#D3684F'
    )
    const pieData = item.bieuDoCoCau ? item.bieuDoCoCau : []
    const pieOption = pieData.map((item) => item.value)

    return (
      <ListItem
        scaleProps={{
          friction: 90,
          tension: 100,
          activeScale: 0.95
        }}
        onPress={() => this.props.navigation.navigate('ChartDetail')}
        containerStyle={{ marginBottom: 10 }}
        title={item.label}
        titleStyle={{ fontSize: 16 }}
        subtitle={
          <View>
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
                  alignItems: 'center'
                }}
              >
                <Text
                  style={[
                    globalStyle.styles.fontWeightBold,
                    { textAlign: 'center', fontSize: 22 }
                  ]}
                >
                  {item.tongCong}
                </Text>
                <Text style={globalStyle.styles.fontWeightBold}>Tỷ đồng</Text>
              </View>
              <View style={{ flex: 0.3, alignItems: 'center' }}>
                <PieChart
                  chart_wh={90}
                  series={pieOption}
                  sliceColor={pieColor}
                  doughnut={true}
                  coverRadius={0.6}
                  coverFill={'#FFF'}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Echarts option={barOption} height={90} />
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.2 }} />
              <View
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: 'auto'
                }}
              >
                {pieData.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        marginHorizontal: 6,
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      <Entypo
                        style={{ alignSelf: 'flex-start' }}
                        name="dot-single"
                        size={40}
                        color={pieColor[index]}
                      />
                      <Text
                        style={{
                          textAlign: 'center'
                        }}
                      >
                        {item.label}
                      </Text>
                    </View>
                  )
                })}
              </View>
              <View style={{ flex: 0.2 }} />
            </View>
          </View>
        }
      />
    )
  }

  render() {
    const { data } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {`Báo cáo ngày ${this.state.reportDate}`.toUpperCase()}
        </Text>
        <FilterTab
          data={[Filter.DAY, Filter.WEEK, Filter.MONTH, Filter.YEAR]}
          onItemSelected={(item) => console.log(item)}
        />
        <TimePicker
          onDateChange={(reportDate) => {
            this.setState({ reportDate }, () => this.getData())
          }}
        />
        <FlatList
          style={{ marginTop: 8 }}
          keyExtractor={this.keyExtractor}
          data={data}
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
