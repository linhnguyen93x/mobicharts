import _ from 'lodash'
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

const textStyle = [
  { paddingLeft: 4, color: 'red', fontWeight: 'bold', textAlign: 'left' },
  { paddingLeft: 4, color: 'blue', fontWeight: 'bold', textAlign: 'left' },
  { paddingLeft: 8, fontWeight: 'bold', textAlign: 'left' },
  { paddingLeft: 8, textAlign: 'left' }
]

class TableReport extends React.PureComponent<
  TableReportProps,
  TableReportState
> {
  TABLE_HEAD = ['Đơn vị']
  WIDTH_ARR = []

  state = {
    tableHead: [],
    widthArr: []
  }

  componentWillMount() {
    const cols0 = _.map(this.props.data, (item, index) => {
      return item[0]
    })
    const maxLength = Math.max(...(cols0.map((item) => item.length)))

    this.setState({
      ...this.state,
      tableHead: [...this.TABLE_HEAD, ...this.props.dynamicHeader],
      widthArr: [
        maxLength * 15,
        ...this.props.dynamicHeader.map((item) => 80)
      ]
    })
  }

  componentWillReceiveProps(nextProps: TableReportProps) {
    const cols0 = _.map(nextProps.data, (item, index) => {
      return item[0]
    })
    const maxLength = Math.max(...(cols0.map((item) => item.length)))

    this.setState({
      ...this.state,
      tableHead: [...this.TABLE_HEAD, ...nextProps.dynamicHeader],
      widthArr: [
        maxLength * 15,
        ...nextProps.dynamicHeader.map((item) => 80)
      ]
    })
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
          <ScrollView horizontal={true} directionalLockEnabled={false}>
            <View>
              <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                <Row
                  data={state.tableHead}
                  widthArr={state.widthArr}
                  style={styles.header}
                  textStyle={[
                    styles.text,
                    { textAlign: 'center', fontWeight: 'bold' }
                  ]}
                />
              </Table>
              <Table
                style={styles.dataWrapper}
                borderStyle={{ borderColor: '#C1C0B9' }}
              >
                {this.props.data.map((rowData, index) => (
                  // <TableWrapper
                  //   key={index}
                  //   style={[
                  //     styles.row,
                  //     tableStyle[rowData[rowData.length - 1]]
                  //   ]}
                  // >
                  //   {rowData
                  //     .slice(0, rowData.length - 1)
                  //     .map(
                  //       (cellData, cellIndex) =>
                  //         cellIndex !== rowData.length - 1 && (
                  //           <Cell
                  //             key={cellIndex}
                  //             data={cellData}
                  //             style={{ width: state.widthArr[cellIndex] }}
                              // textStyle={[
                              //   styles.text,
                              //   cellIndex !== 0 ? { textAlign: 'right' } : {}
                              // ]}
                  //           />
                  //         )
                  //     )}
                  // </TableWrapper>
                  <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row]}
                    />
                ))}
              </Table>
            </View>
          </ScrollView>
          <View
            pointerEvents="none"
            style={{ position: 'absolute', left: 0, top: 0 }}
          >
            <Table borderStyle={{ borderWidth: 0 }}>
              <Row
                data={[state.tableHead[0]]}
                widthArr={[state.widthArr[0]]}
                style={styles.header}
                textStyle={[
                  styles.text,
                  { textAlign: 'center', fontWeight: 'bold' }
                ]}
              />
            </Table>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              {this.props.data.map((rowData, index) => (
                <Row
                  key={index}
                  data={[rowData[0]]}
                  widthArr={[state.widthArr[0]]}
                  style={[styles.row, { backgroundColor: 'white' }]}
                  textStyle={[
                    styles.text,
                    textStyle[rowData[rowData.length - 1]]
                  ]}
                />
              ))}
            </Table>
          </View>
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 50, backgroundColor: '#CBCED3' },
  text: { fontSize: 12 },
  dataWrapper: { marginTop: -1 },
  rowCell: { flexDirection: 'row' },
  row: { height: 40 }
})

export default TableReport
