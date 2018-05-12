import { Dictionary } from 'lodash'
import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { appEpic$ } from 'src/+state/epics'
import { FilterTab } from 'src/components'
import { getCompanyTab } from 'src/modules/Account/+state/reducers'
import { SummaryChartParams } from 'src/modules/ChartTab/components'
import { create2DArray, formatCurrency, hashJoin } from 'src/shared'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'

import { getReportDetailAction } from '../actions'
import { reportDetail$ } from '../epic'
import { Line, ReportDetailClient, ReportDetailState, Table } from '../model'
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
  companyTab: string[]
}

interface State {
  selectedTab: string
}

class ReportDetail extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {
    const { state } = navigation
    return {
      title: state.params.title ? `${state.params.title}` : null,
      // headerRight: (<Text>Menu</Text>)
    }
  }

  tab = ['CT', 'CN', 'LQ', 'Q']

  state: State = {
    selectedTab: this.tab[0]
  }

  componentWillMount() {
    const currentEpic = appEpic$.value

    if (currentEpic !== reportDetail$) {
      appEpic$.next(reportDetail$)
    }
  }

  componentDidMount() {
    this.getData()
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
        const hostDetailData = item.detailColumn.map((item) => formatCurrency(item.value))
        host.push([
          item.shopName,
          ...hostDetailData,
          index
        ])

        this.mapToTable(host, item, index)
      })
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
      // console.log(item)
      const index = 0
      const hostDetailData = item.detailColumn.map((item) => {
        // console.log(item.value)
        return formatCurrency(item.value)
      })
      response.push([
        item.shopName,
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
    const { all } = this.props

    return (
      <View style={styles.container}>
        <FilterTab
          data={this.tab.map((item: keyof IFilter, index) => Filter[item])}
          onItemSelected={(index) =>
            this.setState({ selectedTab: this.tab[index - 1] }, () =>
              this.getData()
            )
          } // Start from 1
        />
        {all[hashParams] ? <ScrollView>
          { all[hashParams].donutParts.map((item, index) => <DonutReport
            key={index}
            title={item.title}
            color={params.colors}
            legend={item.legend}
            data={item.pie}
            data2={item.percent}
          />) }
          { all[hashParams].lineParts.map((item, index) =>  <LineReport
            key={index}
            title={item.title}
            color={params.colors}
            data={this.getLine(item.line).data}
            times={this.getLine(item.line).times}
            legend={all[hashParams].donutParts[index].legend}
          />)}
          <TableReport
            dynamicHeader={all[hashParams].labellistCodeColumn}
            data={this.getTable(all[hashParams].tableDetail)}
          />
        </ScrollView> : null}
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
    all: getAll,
    companyTab: getCompanyTab
  })
)(ReportDetail)
