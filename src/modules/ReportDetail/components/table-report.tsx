import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Card } from 'react-native-elements'
import { Row, Table } from 'react-native-table-component'

export interface TableReportState {
  tableHead: string[]
  widthArr: number[]
}

class TableReport extends React.PureComponent<any, any> {
  state = {
    tableHead: [
      'Head',
      'Head2',
      'Head3',
      'Head4',
      'Head5',
      'Head6',
      'Head7',
      'Head8',
      'Head9'
    ],
    widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200]
  }

  render() {
    const state = this.state
    const tableData = []
    for (let i = 0; i < 30; i += 1) {
      const rowData = []
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`)
      }
      tableData.push(rowData)
    }

    return (
      <Card
        title="Bảng số liệu chi tiết:"
        titleStyle={{ textAlign: 'left' }}
        containerStyle={{ marginHorizontal: 0, flex: 1 }}
        dividerStyle={{ display: 'none' }}
      >
        <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                <Row
                  data={state.tableHead}
                  widthArr={state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                  {tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[
                        styles.row,
                        index % 2 && { backgroundColor: '#F7F6E7' }
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
})

export default TableReport
