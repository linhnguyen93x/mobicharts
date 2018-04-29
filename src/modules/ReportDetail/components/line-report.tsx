import * as React from 'react'
import { MultiLineChart } from 'react-native-d3multiline-chart'
import { Card } from 'react-native-elements'

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
      y: '150',
      x: 2010
    }
  ]
]
// default data is available
const legendText = ['sales', 'year']
const minX = 2000
const maxX = 2010
const minY = 134
const maxY = 215

// since there are only two lines
const mainColor = [
  '#ff7f50',
  '#87cefa',
  '#32cd32',
  '#da70d6',
  '#6495ed',
  '#ff69b4',
  '#ba55d3',
  '#cd5c5c',
  '#ffa500',
  '#40e0d0',
  '#1e90ff',
  '#ff6347',
  '#7b68ee',
  '#00fa9a',
  '#ffd700',
  '#6b8e23',
  '#ff00ff',
  '#3cb371',
  '#b8860b',
  '#30e0e0'
]

class LineReport extends React.PureComponent<any, any> {
  render() {
    const color = mainColor.splice(0, data.length)
    console.log(color)

    return (
      <Card
        title="Biểu đồ đường DTTT theo cấu thành trong 7 ngày gần đây:"
        titleStyle={{ textAlign: 'left' }}
        containerStyle={{ marginHorizontal: 0 }}
        dividerStyle={{ display: 'none' }}
      >
        <MultiLineChart
          data={data}
          // leftAxisData={leftAxisData}
          // bottomAxisData={bottomAxisData}
          legendColor={color}
          legendText={legendText}
          showLegends={false}
          minX={minX}
          maxX={maxX}
          minY={minY}
          maxY={maxY}
          scatterPlotEnable={false}
          dataPointsVisible={true}
          Color={color}
          // axisColor={'transparent'}
          axisLabelColor={'blue'}
          chartHeight={200}
          GraphHeight={250}
          tickColorXAxis={'transparent'}
          tickColorYAxis={'transparent'}
          circleRadiusWidth={4}
          circleRadius={2}
          animation={true}
          duration={500}
          delay={0}
          speed={5}
          pointDataToShowOnGraph=""
          circleLegendType={true}
          // GraphHeight={300}
          // GraphWidth={100}
        />
      </Card>
    )
  }
}

export default LineReport
