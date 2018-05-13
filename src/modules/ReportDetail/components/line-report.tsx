import _ from 'lodash'
import * as React from 'react'
import { Dimensions } from 'react-native'
import { MultiLineChart } from 'react-native-d3multiline-chart'
import { Card } from 'react-native-elements'
import Legend from 'src/components/legend'
import { lineColors } from 'src/shared'

const deviceWidth = Dimensions.get('window').width

interface Props {
  title: string
  color: string[]
  data: number[][]
  times: number[]
  legend: string[]
  unit: string
}

class LineReport extends React.PureComponent<Props, any> {
  render() {
    const color = lineColors.slice(0, 3)
    const dataFlattern = _.flatten(this.props.data)

    const bottomAxisData = _.range(0, this.props.times.length , 1)
    const bottomAxisDataToShow = this.props.times.map((item) => item < 10 ? '0' + item : item)
    const minX = Math.floor(_.min(dataFlattern.map((rec: any) => rec.x)))
    const maxX = Math.ceil(_.max(dataFlattern.map((rec: any) => rec.x)))
    const minY = 0
    const maxY = Math.ceil(_.max(dataFlattern.map((rec: any) => rec.y)))
    const leftAxisData = _.range(minY, maxY + Math.ceil((minY + maxY) / 5), Math.ceil((minY + maxY) / 5))

    return (
      <Card
        title={`${this.props.title} (ĐVT: ${this.props.unit.toLowerCase()})`}
        titleStyle={{ textAlign: 'left' }}
        containerStyle={{ marginHorizontal: 0, paddingBottom: 0, paddingTop: 4 }}
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
          GraphHeight={200}
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
        {/* <View
          style={[
            styles.rowContainer,
            { justifyContent: 'space-between', marginHorizontal: 16 }
          ]}
        >
          <Text>Chú thích:</Text>
          <Text style={{ fontSize: 12, alignSelf: 'center' }}>
            Đơn vị: {this.props.unit.toLowerCase()}
          </Text>
        </View> */}
        <Legend data={this.props.legend} color={color}/>
      </Card>
    )
  }
}

export default LineReport
