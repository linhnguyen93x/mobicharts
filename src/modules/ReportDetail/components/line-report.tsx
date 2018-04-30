import * as React from 'react'
import { Dimensions } from 'react-native'
import { MultiLineChart } from 'react-native-d3multiline-chart'
import { Card } from 'react-native-elements'
import Legend from 'src/components/legend'
import { colors } from 'src/shared'

const deviceWidth = Dimensions.get('window').width

const data = [
  [
    {
      y: '202',
      x: 2000
    },
    {
      y: '215',
      x: 2001
    },
    {
      y: '179',
      x: 2002
    },
    {
      y: '199',
      x: 2003
    },
    {
      y: '134',
      x: 2003
    },
    {
      y: '176',
      x: 2010
    }
  ],
  [
    {
      y: '152',
      x: 2000
    },
    {
      y: '189',
      x: 2002
    },
    {
      y: '179',
      x: 2004
    },
    {
      y: '199',
      x: 2006
    },
    {
      y: '134',
      x: 2008
    },
    {
      y: '176',
      x: 2010
    }
  ],
  [
    {
      y: '200',
      x: 2000
    },
    {
      y: '200',
      x: 2001
    },
    {
      y: '200',
      x: 2002
    },
    {
      y: '200',
      x: 2003
    },
    {
      y: '134',
      x: 2003
    },
    {
      y: '176',
      x: 2010
    }
  ]
]

// default data is available
const leftAxisData = [134, 144, 154, 164, 174, 184, 194, 204, 215]
const bottomAxisData = [2000, 2002, 2004, 2006, 2008, 2010]
const minX = 2000
const maxX = 2010
const minY = 134
const maxY = 215

// general data to represent ticks in y-axis and it doesn't take part in calculation
const bottomAxisDataToShow = [
  'Jan 2017',
  'Feb 2017',
  'Mar 2017',
  'Apr 2017',
  'May 2017',
  'Jun 2017',
  'Jul 2017',
  'Aug 2017'
]
// general data to represent ticks in y-axis and it doesn't take part in calculation
const leftAxisDataToShow = [
  '10%',
  '20%',
  '30%',
  '40%',
  '50%',
  '60%',
  '70%',
  '80%',
  '90%'
]

class LineReport extends React.PureComponent<any, any> {
  render() {
    const color = colors.slice(0, 3)

    return (
      <Card
        title="Biểu đồ đường DTTT theo cấu thành trong 7 ngày gần đây:"
        titleStyle={{ textAlign: 'left' }}
        containerStyle={{ marginHorizontal: 0 }}
        dividerStyle={{ display: 'none' }}
      >
        <MultiLineChart
          data={data}
          leftAxisData={leftAxisData}
          // bottomAxisData={bottomAxisData}
          minX={minX}
          maxX={maxX}
          minY={minY}
          maxY={maxY}
          scatterPlotEnable={false}
          dataPointsVisible={true}
          Color={color}
          // bottomAxisDataToShow={bottomAxisDataToShow}
          circleLegendType={true}
          fillArea={true}
          yAxisGrid={true}
          xAxisGrid={false}
          hideXAxis={false}
          hideYAxis={false}
          inclindTick={false}
          pointDataToShowOnGraph=""
          animation={true}
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
        <Legend data={data} />
      </Card>
    )
  }
}

export default LineReport
