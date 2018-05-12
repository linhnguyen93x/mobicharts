import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { appEpic$ } from 'src/+state/epics'
import { FilterTab } from 'src/components'
import { TabInfo } from 'src/modules/Account/+model'
import { getCompanyTab } from 'src/modules/Account/+state/reducers'
import { SummaryChartParams } from 'src/modules/ChartTab/components'
import { create2DArray, formatCurrency, textColor } from 'src/shared'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'

import { getReportDetailAction } from '../actions'
import { reportDetail$ } from '../epic'
import { DetailColumn, DonutPartClient, Line, LinePart, ReportDetailState, Table } from '../model'
import { getDonuts, getLines, getTables } from '../reducer'
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
  donuts: DonutPartClient[]
  lines: LinePart[]
  companyTab: TabInfo[]
  tableInfo: {
    tables: Table[],
    tableCodes: string[]
  } | null
}

interface State {
  selectedTab: string,
  refreshing: boolean
}

class ReportDetail extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {
    const { state } = navigation
    return {
      title: state.params.title ? `${state.params.title}` : null,
      // headerRight: (<Text>Menu</Text>)
    }
  }

  tab = this.props.companyTab.map((item) => item.code)

  state: State = {
    selectedTab: this.tab[0],
    refreshing: false
  }

  componentDidMount() {
    const currentEpic = appEpic$.value

    if (currentEpic !== reportDetail$) {
      appEpic$.next(reportDetail$)
    }

    this.getData()
  }

  componentDidUpdate(notUsed: any, prevState: State) {
    if (prevState.selectedTab !== this.state.selectedTab) {
      this.getData()
    }
  }

  changeHeaderTitle = (titleText: string) => {
    const { setParams } = this.props.navigation
    setParams({ title: titleText })
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

  getLine = (lineData: Line[]) => {
    if (!lineData) {
      return {
        data: [],
        times: []
      }
    }

    const responseData =
      lineData.length > 0 ? create2DArray(lineData[0].data.length) : []

    responseData.forEach((item, index) => {
      lineData.forEach((i, indexChild) => {
        responseData[index][indexChild] = { y: i.data[index] ? i.data[index] : 0, x: indexChild }
      })
    })

    return {
      data: responseData,
      times: lineData.map((item) => Number(item.time))
    }
  }

  getTable = (tableDetail: Table[]) => {

    if (
      !tableDetail
    ) {
      return []
    }

    if (tableDetail.length <= 0) {
      return []
    }
    const response: any[][] = []

    tableDetail.forEach((item) => {
      const index = 0
      const hostDetailData = item.detailColumn.map((item) => this.mapToDetailData(item))
      response.push([
        item.shopName,
        ...hostDetailData,
        index
      ])
      this.mapToTable(response, item, index)
    })

    return response
  }

  mapToTable = (host: any[][], obj: Table, index: number) => {
    if (obj.hasOwnProperty('child') && obj.child.length > 0) {
      index++
      obj.child.forEach((item) => {
        const hostDetailData = item.detailColumn.map((item) => this.mapToDetailData(item))
        host.push([
          item.shopName,
          ...hostDetailData,
          index
        ])

        this.mapToTable(host, item, index)
      })
    }
  }

  mapToDetailData = (item: DetailColumn) => {
    if (item.showPercent) {
      const color = item.value > 0 ? textColor.increase : item.value < 0 ? textColor.decrease : textColor.equal
      const iconName = item.value > 0 ? 'arrow-up' : item.value < 0 ? 'arrow-down' : null

      return <Text style={[styles.cellNumber, { color }]}>
        {formatCurrency(Math.abs(item.value))}
        {iconName && <MaterialCommunityIcons name={iconName} size={14} color={color} />}
      </Text>
    }

    return formatCurrency(item.value)
  }

  render() {
    const {
      params
    }: { params: SummaryChartParams } = this.props.navigation.state
    const { donuts, lines, tableInfo } = this.props

    return (
      <View style={styles.container}>
        <FilterTab
          data={this.tab.map((item, index) => Filter[item])}
          onItemSelected={(index) => {
            this.setState({ selectedTab: this.tab[index - 1], refreshing: true })}
          } // Start from 1
        />
        <ScrollView>
          { donuts.map((item, index) => <DonutReport
            key={index}
            title={item.title}
            color={params.colors}
            legend={item.legend}
            data={item.pie}
            data2={item.percent}
          />) }
          { lines.map((item, index) => <LineReport
            key={index}
            title={item.title}
            color={params.colors}
            data={this.getLine(item.line).data}
            times={this.getLine(item.line).times}
            legend={donuts[index].legend}
          />)}
          {tableInfo ? <TableReport
            dynamicHeader={tableInfo.tableCodes}
            data={this.getTable(tableInfo.tables)}
          /> : null }
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
  },
  cellNumber: {
    textAlign: 'right',
    paddingHorizontal: 8,
  }
})

export default connect(
  createStructuredSelector({
    donuts: getDonuts,
    lines: getLines,
    tableInfo: getTables,
    companyTab: getCompanyTab
  })
)(ReportDetail)
