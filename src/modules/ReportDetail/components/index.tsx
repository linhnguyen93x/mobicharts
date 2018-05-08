import * as React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { appEpic$ } from 'src/+state/epics'
import { FilterTab } from 'src/components'
import { SummaryChartParams } from 'src/modules/ChartTab/components'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'

import { getReportDetailAction } from '../actions'
import { reportDetail$ } from '../epic'
import { ReportDetailState } from '../model'
import { getDonuts, getLegend, getLine, getTable } from '../reducer'
import DonutReport from './donut-report'
import LineReport from './line-report'
import TableReport from './table-report'

export interface IFilter {
  CT: string
  CN: string
  LQ: string
  Q: string
}

const Filter: IFilter = {
  CT: 'CÔNG TY',
  CN: 'CHI NHÁNH',
  LQ: 'LIÊN QUẬN',
  Q: 'QUẬN'
}

interface Props extends ConnectedReduxProps<ReportDetailState> {
  legends: string[]
  donuts: {
    left: number[]
    right: number[]
  }
  line: {
    data: number[][]
    times: number[]
  }
  table: any
}

interface State {
  selectedTab: string
}

class ReportDetail extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Chi tiết báo cáo'
  }
  tab = ['CN', 'LQ', 'Q']

  state: State = {
    selectedTab: this.tab[0]
  }

  componentWillMount() {
    const currentEpic = appEpic$.value

    if (currentEpic !== reportDetail$) {
      appEpic$.next(reportDetail$)
    }

    this.getData()
  }

  getData = () => {
    const {
      params
    }: { params: SummaryChartParams } = this.props.navigation.state

    this.props.dispatch(
      getReportDetailAction({
        datereport: params.selectedTime,
        tab: params.timeType,
        reporttype: params.codeReport,
        viewtab: this.state.selectedTab
      })
    )
  }

  render() {
    const {
      params
    }: { params: SummaryChartParams } = this.props.navigation.state

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {`Báo cáo\n ${'DTTT'} theo loại khách hàng\n`.toUpperCase()}
          <Text style={styles.day}>Ngày {params.selectedTime}</Text>
        </Text>
        <FilterTab
          data={this.tab.map((item: keyof IFilter, index) => Filter[item])}
          onItemSelected={(index) =>
            this.setState({ selectedTab: this.tab[index - 1] }, () =>
              this.getData()
            )
          } // Start from 1
        />
        <ScrollView>
          <DonutReport
            color={params.colors}
            legend={this.props.legends}
            data={this.props.donuts.left}
            data2={this.props.donuts.right}
          />
          <LineReport
            color={params.colors}
            data={this.props.line.data}
            times={this.props.line.times}
            legend={this.props.legends}
          />
          <TableReport
            dynamicHeader={this.props.legends}
            data={this.props.table}
          />
        </ScrollView>
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
    fontWeight: 'bold',
    lineHeight: 34
  },
  day: {
    fontSize: 15,
    fontWeight: '500',
    color: '#555555'
  }
})

export default connect(
  createStructuredSelector({
    legends: getLegend,
    donuts: getDonuts,
    line: getLine,
    table: getTable
  })
)(ReportDetail)
