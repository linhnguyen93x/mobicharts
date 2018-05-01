import { Entypo } from '@expo/vector-icons'
import * as scale from 'd3-scale'
import { Svg } from 'expo'
import moment from 'moment'
import * as React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { BarChart, PieChart, XAxis } from 'react-native-svg-charts'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { appEpic$ } from 'src/+state/epics'
import { FilterTab } from 'src/components'
import { TimePicker } from 'src/components/time-picker'
import { colors } from 'src/shared'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'

import { globalStyle } from '../../../style'
import { getSummaryChartAction } from '../actions'
import { summaryChartEpic } from '../epics'
import { SummaryChartResponse } from '../model'
import { getAll } from '../selectors'

const { LinearGradient, Stop, Defs } = Svg

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
  '#ff69b4'
]

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
    const barOption = item.bieuDoCot
      ? item.bieuDoCot.map((item) => item.value)
      : []
    const pieData = item.bieuDoCoCau ? item.bieuDoCoCau : []
    const pieOption = pieData.map((item, index) => ({
      value: item.value,
      svg: { fill: colors[index] },
      key: `pie-${index}`
    }))

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
                  alignItems: 'center',
                  marginBottom: 24
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
                        style={{ flexDirection: 'row', width: '50%', paddingHorizontal: 4 }}
                      >
                        <Entypo
                          style={{
                            alignSelf: 'flex-start'
                          }}
                          name="controller-record"
                          size={16}
                          color={colors[index]}
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
                  svg={{
                    strokeWidth: 2,
                    fill: 'url(#gradient)'
                  }}
                >
                  {/* <Grid /> */}
                  <this.Gradient />
                </BarChart>
                <XAxis
                  style={{ marginTop: 11 }}
                  data={[1, 2, 3, 4, 5, 6, 7, 8]}
                  scale={scale.scaleBand}
                  formatLabel={(value: any, index: number) => value}
                  labelStyle={{ color: 'black'}}
                />
              </View>
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
