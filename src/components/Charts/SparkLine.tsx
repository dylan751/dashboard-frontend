import React from 'react';
import {
  SparklineComponent,
  Inject,
  SparklineTooltip,
  SparklineType,
} from '@syncfusion/ej2-react-charts';

interface SparkLineProps {
  currentColor?: string;
  id: string;
  type: SparklineType;
  height?: string;
  width?: string;
  data?: { x: number; yval: number }[];
  // data?: any;
  color?: string;
}

const SparkLine = ({
  currentColor,
  id,
  type,
  height,
  width,
  data,
  color,
}: SparkLineProps) => {
  return (
    <SparklineComponent
      id={id}
      height={height}
      width={width}
      lineWidth={1}
      valueType="Numeric"
      fill={color}
      border={{ color: currentColor, width: 2 }}
      dataSource={data}
      xName="x"
      yName="yval"
      type={type}
      tooltipSettings={{
        visible: true,
        format: '${x}: data ${yval}',
        trackLineSettings: {
          visible: true,
        },
      }}
    >
      <Inject services={[SparklineTooltip]} />
    </SparklineComponent>
  );
};

export default SparkLine;
