import moment from 'moment'
import Echarts from 'native-echarts'
import * as React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
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

class ChartTab extends React.Component<SummaryChartProps, SummaryChartState> {
  state = {
    reportDate: moment().format('DD/MM/YYYY')
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
        x: 16,
        x2: 4
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
    const data = item.map((item) => item.value)

    return {
      grid: {
        borderWidth: 0,
        y: 0,
        y2: 0,
        x: 16,
        x2: 4
      },
      series: [
        {
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          name: 'Reference Page',
          type: 'pie',
          radius: ['50%', '70%'],
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
      index % 2 === 0 ? '#D3684F' : '#B7D243'
    )
    const pieOption = this.getPieOption(
      item.bieuDoCoCau ? item.bieuDoCoCau : []
    )

    return (
      <ListItem
        containerStyle={{ marginBottom: 10 }}
        title={item.label}
        titleStyle={{ fontSize: 16 }}
        subtitle={
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
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
            <View style={{ flex: 0.4 }}>
              <Echarts option={barOption} height={75} />
            </View>
            <View style={{ flex: 0.3 }}>
              <Echarts option={pieOption} height={100} />
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
