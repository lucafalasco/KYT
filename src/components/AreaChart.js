import React from 'react'
import { observer, inject } from 'mobx-react'
import { withParentSize } from '@vx/responsive'
import { LinePath } from '@vx/shape'
import { curveMonotoneX } from '@vx/curve'
import { Group } from '@vx/group'
import { Spring, config } from 'react-spring'
import { scaleLinear, scaleTime } from '@vx/scale'
import numeral from 'numeral'
import { extent } from 'd3-array'

function xAccessor(d) {
  return d.x
}
function yAccessor(d) {
  return d.y
}

@inject('state')
@withParentSize
@observer
export class AreaChart extends React.Component {
  render() {
    const {
      parentWidth: width,
      parentHeight: height,
      currency: { color, label },
      data,
    } = this.props

    const [minY, maxY] = [Math.min(...data.map(yAccessor)), Math.max(...data.map(yAccessor))]

    const xScale = scaleTime({
      domain: extent(data, xAccessor),
      range: [0, width],
    })
    const yScale = scaleLinear({
      domain: [minY, maxY],
      range: [height, 0],
    })

    function scaledX(d) {
      return xScale(d.x)
    }

    function scaledY(d) {
      return yScale(d.y)
    }

    return (
      <svg width={width} height={height} className="overflow-visible">
        <Spring
          config={{ ...config.default }}
          to={{
            yValues: data.map(scaledY),
            color,
          }}
        >
          {props => {
            const interpolateData = data.map((d, i) => ({
              ...d,
              y: props.yValues[i],
            }))

            return (
              <>
                <LinePath
                  data={interpolateData}
                  x={scaledX}
                  y={yAccessor}
                  strokeWidth={3}
                  stroke={color}
                  curve={curveMonotoneX}
                />

                <Group transform={`translate(${width * 0.97}, 0)`}>
                  <text
                    className="f3 f2-ns fw7"
                    x={0}
                    y={0}
                    fill={color}
                    textAnchor="end"
                    alignmentBaseline="baseline"
                  >
                    {`€ ${numeral(maxY).format('0.00')}`}
                  </text>
                  <text
                    className="f3 f2-ns fw7"
                    x={0}
                    y={height}
                    fill={color}
                    textAnchor="end"
                    alignmentBaseline="hanging"
                  >
                    {`€ ${numeral(minY).format('0.00')}`}
                  </text>
                </Group>
              </>
            )
          }}
        </Spring>
      </svg>
    )
  }
}
