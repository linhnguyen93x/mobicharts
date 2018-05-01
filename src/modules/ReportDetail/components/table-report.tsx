import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Card } from 'react-native-elements'
import { Row, Table } from 'react-native-table-component'

export interface TableReportState {
  tableHead: string[]
  widthArr: number[]
}

export interface TableReportProps {
  dynamicHeader: string[]
  data: any[][]
}

const tableStyle = [
  { backgroundColor: '#F1F1F1' },
  { backgroundColor: '#F1F1F1' },
  { backgroundColor: 'white' },
  { backgroundColor: 'white' }
]

const textStyle = [
  { color: 'red', fontWeight: 'bold', textAlign: 'left' },
  { color: 'blue', fontWeight: 'bold', textAlign: 'left' },
  { paddingLeft: 16, fontWeight: 'bold', textAlign: 'left' },
  { paddingLeft: 16, textAlign: 'left' }
]

class TableReport extends React.PureComponent<TableReportProps, TableReportState> {
  state = {
    tableHead: [
      'Địa bàn',
      'Tổng cộng'
    ],
    widthArr: [180, 120]
  }

  componentWillReceiveProps(nextProps: TableReportProps) {
    this.setState({
      ...this.state,
      tableHead: [
        ...this.state.tableHead,
        ...nextProps.dynamicHeader
      ],
      widthArr: [
        ...this.state.widthArr,
        ...nextProps.dynamicHeader.map((item) => 120)
      ]
    })
  }

  render() {
    const state = this.state
    // const tableData = []
    // for (let i = 0; i < 30; i += 1) {
    //   const rowData = []
    //   for (let j = 0; j < this.state.tableHead.length; j += 1) {
    //     rowData.push(`${i}${j}`)
    //   }
    //   tableData.push(rowData)
    // }

    // console.log(tableData)

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
                  textStyle={[styles.text, { textAlign: 'center', fontWeight: 'bold' }]}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                  {this.props.data.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[
                        tableStyle[rowData[rowData.length - 1]]
                      ]}
                      textStyle={[styles.text, textStyle[rowData[rowData.length - 1]]]}
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
  header: { height: 50, backgroundColor: '#CBCED3' },
  text: { padding: 8 },
  dataWrapper: { marginTop: -1 },
})

export default TableReport
