import { Dictionary } from 'lodash'
import * as React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { appEpic$ } from 'src/+state/epics'
import { FilterTab } from 'src/components'
import { SummaryChartParams } from 'src/modules/ChartTab/components'
import { create2DArray, formatCurrency, hashJoin } from 'src/shared'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'

import { getReportDetailAction } from '../actions'
import { reportDetail$ } from '../epic'
import { ReportDetailClient, ReportDetailState, Table } from '../model'
import { getAll } from '../reducer'
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
  all: Dictionary<ReportDetailClient>
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

  getLegend = (hashParams: string) =>
    this.props.all[hashParams] ? this.props.all[hashParams].legend : []

  getDonuts = (hashParams: string) => ({
    left:
      this.props.all[hashParams] && this.props.all[hashParams].donutLeft
        ? this.props.all[hashParams].donutLeft
        : [],
    right:
      this.props.all[hashParams] && this.props.all[hashParams].donutRight
        ? this.props.all[hashParams].donutRight
        : []
  })

  getLine = (hashParams: string) => {
    if (!this.props.all[hashParams] || !this.props.all[hashParams].line) {
      return {
        data: [],
        times: []
      }
    }

    const lineData = this.props.all[hashParams].line
    const responseData =
      lineData.length > 0 ? create2DArray(lineData[0].data.length) : []

    responseData.forEach((item, index) => {
      lineData.forEach((i, indexChild) => {
        responseData[index][indexChild] = { y: i.data[index], x: indexChild }
      })
    })

    return {
      data: responseData,
      times: lineData.map((item) => Number(item.time))
    }
  }

  mapToTable = (host: any[][], obj: Table, index: number) => {
    if (obj.hasOwnProperty('child') && obj.child.length > 0) {
      index++
      obj.child.forEach((item) => {
        const hostDetailData = item.detailType.map((item) =>
          formatCurrency(item.value)
        )
        host.push([
          item.shopName,
          formatCurrency(item.total),
          ...hostDetailData,
          index
        ])

        this.mapToTable(host, item, index)
      })
    }
  }

  getTable = (hashParams: string) => {
    if (
      !this.props.all[hashParams] ||
      !this.props.all[hashParams].tableDetail
    ) {
      return []
    }
    const tableDetail = this.props.all[hashParams].tableDetail

    if (tableDetail.length <= 0) {
      return []
    }
    const response: any[][] = []

    tableDetail.forEach((item) => {
      // console.log(JSON.stringify(item, null, 2))
      const index = 0
      const hostDetailData = item.detailType.map((item) => item.value)
      response.push([
        item.shopName,
        formatCurrency(item.total),
        ...hostDetailData,
        index
      ])
      this.mapToTable(response, item, index)
    })

    return response
  }

  render() {
    const {
      params
    }: { params: SummaryChartParams } = this.props.navigation.state
    const hashParams = hashJoin(
      params.codeReport,
      params.selectedTime,
      params.timeType,
      this.state.selectedTab
    )

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
            legend={this.getLegend(hashParams)}
            data={this.getDonuts(hashParams).left}
            data2={this.getDonuts(hashParams).right}
          />
          <LineReport
            color={params.colors}
            data={this.getLine(hashParams).data}
            times={this.getLine(hashParams).times}
            legend={this.getLegend(hashParams)}
          />
          <TableReport
            dynamicHeader={this.getLegend(hashParams)}
            data={this.getTable(hashParams)}
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
    all: getAll
  })
)(ReportDetail)
