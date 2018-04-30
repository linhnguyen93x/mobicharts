import * as React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { appEpic$ } from 'src/+state/epics'
import { FilterTab } from 'src/components'

import { reportDetail$ } from '../epic'
import DonutReport from './donut-report'
import LineReport from './line-report'
import TableReport from './table-report'

enum Filter {
  COMPANY = 'CÔNG TY',
  BRANCH = 'CHI NHÁNH',
  UD = 'LIÊN QUẬN',
  DISTRICT = 'QUẬN'
}

class ReportDetail extends React.Component<{}, {}> {
  static navigationOptions = {
    title: 'Chi tiết báo cáo'
  }

  componentWillMount() {
    const currentEpic = appEpic$.value

    if (currentEpic !== reportDetail$) {
      appEpic$.next(reportDetail$)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {`Báo cáo\n ${'DTTT'} theo loại khách hàng\n`.toUpperCase()}
          <Text style={styles.day}>Ngày {'22/04/2018'}</Text>
        </Text>
        <FilterTab
          data={[Filter.COMPANY, Filter.BRANCH, Filter.UD, Filter.DISTRICT]}
          onItemSelected={(item) => console.log(item)}
        />
        <ScrollView>
          <DonutReport data={[50, 10, 40, 95, 85, 91]} data2={[5, 10, 30, 45, 115, 31]} />
          <LineReport />
          <TableReport />
        </ScrollView>

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
    fontWeight: 'bold',
    lineHeight: 34
  },
  day: {
    fontSize: 15,
    fontWeight: '500',
    color: '#555555'
  }
})

export default ReportDetail
