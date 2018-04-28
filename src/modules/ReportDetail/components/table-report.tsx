import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-elements'
import { Col, Row, Rows, Table, TableWrapper } from 'react-native-table-component'

export interface TableReportState {
  tableHead: string[]
  widthArr: number[]
}

class TableReport extends React.PureComponent<any, any> {
  state = {
    tableHead: ['', 'Head1', 'Head2', 'Head3', 'Head3', 'Head3', 'Head3'],
    tableTitle: ['Title', 'Title2', 'Title3', 'Title4', 'Title4', 'Title4'],
    tableData: [
      ['1', '2', '3', '3', '3', '3'],
      ['1', '2', '3', '3', '3', '3'],
      ['1', '2', '3', '3', '3', '3'],
      ['1', '2', '3', '3', '3', '3'],
      ['1', '2', '3', '3', '3', '3'],
    ]
  }

  render() {
    const state = this.state
    return (
      <Card
        title="Bảng số liệu chi tiết:"
        titleStyle={{ textAlign: 'left' }}
        containerStyle={{ marginHorizontal: 0, flex: 1 }}
        dividerStyle={{ display: 'none' }}
      >
        <View style={styles.container}>
        <Table>
          <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
      </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
})

export default TableReport
