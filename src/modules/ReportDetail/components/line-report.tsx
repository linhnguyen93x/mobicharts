import _ from 'lodash'
import * as React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { MultiLineChart } from 'react-native-d3multiline-chart'
import { Card } from 'react-native-elements'
import Legend from 'src/components/legend'
import { colors } from 'src/shared'

const deviceWidth = Dimensions.get('window').width

interface Props {
  data: number[][]
  times: string[]
  legend: string[]
}

class LineReport extends React.PureComponent<Props, any> {
  render() {
    const color = colors.slice(0, 3)
    const dataFlattern = _.flatten(this.props.data)

    console.log(this.props.times)

    const bottomAxisData = this.props.times
    const bottomAxisDataToShow = this.props.times
    const minX = Math.floor(_.min(dataFlattern.map((rec: any) => rec.x)))
    const maxX = Math.ceil(_.max(dataFlattern.map((rec: any) => rec.x)))
    const minY = Math.floor(_.min(dataFlattern.map((rec: any) => rec.y)))
    const maxY = Math.ceil(_.max(dataFlattern.map((rec: any) => rec.y)))
    const leftAxisData = _.range(minY, maxY + Math.ceil((minY + maxY) / 5), Math.ceil((minY + maxY) / 5))

    console.log(leftAxisData)

    return (
      <Card
        title="Biểu đồ đường DTTT theo cấu thành trong 7 ngày gần đây:"
        titleStyle={{ textAlign: 'left' }}
        containerStyle={{ marginHorizontal: 0 }}
        dividerStyle={{ display: 'none' }}
      >
        <MultiLineChart
          data={this.props.data}
          leftAxisData={leftAxisData}
          leftAxisDataToShow={leftAxisData}
          bottomAxisData={bottomAxisData}
          minX={minX}
          maxX={maxX}
          minY={minY}
          maxY={maxY}
          scatterPlotEnable={false}
          dataPointsVisible={true}
          Color={color}
          bottomAxisDataToShow={bottomAxisDataToShow}
          circleLegendType={true}
          fillArea={false}
          yAxisGrid={true}
          xAxisGrid={false}
          hideXAxis={true}
          hideYAxis={true}
          inclindTick={false}
          pointDataToShowOnGraph="Y"
          animation={false}
          duration={1500}
          delay={1000}
          GraphHeight={250}
          chartHeight={200}
          GraphWidth={deviceWidth}
          chartWidth={deviceWidth - 48}
          staggerLength={220}
          speed={50}
          showTicks={true}
          tickColorYAxis={'rgba(192,192,192,0.3)'}
          tickColorXAxis={'transparent'}
          axisColor={'rgba(192,192,192,0.3)'}
        />
        <View
          style={[
            styles.rowContainer,
            { justifyContent: 'space-between', marginHorizontal: 16 }
          ]}
        >
          <Text>Chú thích:</Text>
          <Text style={{ fontSize: 12, alignSelf: 'center' }}>
            Đơn vị: Tỷ VND
          </Text>
        </View>
        <Legend data={this.props.legend} />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  legendContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 8
  }
})

export default LineReport
