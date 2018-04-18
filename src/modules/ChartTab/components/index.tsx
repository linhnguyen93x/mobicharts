import Echarts from 'native-echarts'
import * as React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FilterTab } from 'src/components'
import { TimePicker } from 'src/components/time-picker'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'

import { globalStyle } from '../../../style'
import { ITodo, State } from '../model'
import { getAll } from '../selectors'

interface TodosProps extends ConnectedReduxProps<State> {
  todos: ITodo[]
}

enum Filter {
  DAY = 'NGÀY',
  WEEK = 'TUẦN',
  MONTH = 'THÁNG',
  YEAR = 'NĂM'
}

const list: List[] = [
  {
    code: '1',
    name: 'DTTT THEO LOẠI KHÁCH HÀNG',
    price: 2309
  },
  {
    code: '2',
    name: 'DTTT THEO CÂU THÀNH',
    price: 239
  },
  {
    code: '3',
    name: 'THUÊ BAO PHÁT TRIỂN MỚI',
    price: 2309
  }
]

interface List {
  code: string
  name: string
  price: number
}

const ChartTab: React.SFC<TodosProps> = (props) => {
  const { todos, dispatch } = props

  const keyExtractor = (item: List, index: number) => {
    return item.code
  }

  const optionBarChart = {
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
        name: 'ECharts例子个数统计',
        type: 'bar',
        itemStyle: {
          normal: {
            color(params: any) {
              // build a color map as your need.
              const colorList = [
                '#C1232B',
                '#B5C334',
                '#FCCE10',
                '#E87C25',
                '#27727B',
                '#FE8463',
                '#9BCA63',
                '#FAD860',
                '#F3A43B',
                '#60C0DD',
                '#D7504B',
                '#C6E579',
                '#F4E001',
                '#F0805A',
                '#26C0C0'
              ]
              return colorList[params.dataIndex]
            }
          }
        },
        data: [12, 21, 10, 4, 12, 5, 6, 5, 25, 23, 7]
      }
    ]
  }

  const optionChart = {
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
        data: [
          { value: 400, name: 'Searching Engine' },
          { value: 335, name: 'Direct' },
          { value: 310, name: 'Email' },
          { value: 274, name: 'Alliance Advertisement' },
          { value: 235, name: 'Video Advertisement' }
        ]
      }
    ]
  }

  const renderItem = ({ item }: { item: List }) => {
    return (
      <ListItem
        containerStyle={{ marginBottom: 10 }}
        title={item.name}
        titleStyle={{ fontSize: 14 }}
        subtitle={
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[globalStyle.styles.fontWeightBold, { textAlign: 'center', fontSize: 26 }]}>{item.price}</Text>
              <Text style={globalStyle.styles.fontWeightBold}>Tỷ đồng</Text>
            </View>
            <View style={{ flex: 0.4 }}>
              <Echarts option={optionBarChart} height={75} />
            </View>
            <View style={{ flex: 0.3 }}>
              <Echarts option={optionChart} height={100} />
            </View>
          </View>
        }
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {'Báo cáo ngày 22/04/2018'.toUpperCase()}
      </Text>
      <FilterTab
        data={[Filter.DAY, Filter.WEEK, Filter.MONTH, Filter.YEAR]}
        onItemSelected={(item) => console.log(item)}
      />
      <TimePicker onDateChange={(date) => console.log(date)} />
      <FlatList
        style={{ marginTop: 8 }}
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />
      {/* <Button title="Add" onPress={() => { dispatch(addTodo('Hello Bi')) }} />
      {todos.map((t) => <Text key={t.id}>{t.text}</Text>)} */}
    </View>
  )
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
    todos: getAll
  })
)(ChartTab)
