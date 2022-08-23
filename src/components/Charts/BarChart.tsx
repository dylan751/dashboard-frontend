import React, { useEffect, useState } from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  Legend,
  Tooltip,
  AxisModel,
  DataLabel,
  Category,
  ColumnSeries,
} from '@syncfusion/ej2-react-charts';
import {
  StateContextType,
  useStateContext,
} from '../../contexts/ContextProvider';
import chartApi from '../../services/chartApi';
import { useTranslation } from 'react-i18next';

//   const barChartData = [
//     [
//       { x: '$0-$200', y: 46 },
//       { x: '$200-$400', y: 27 },
//       { x: '$400-$600', y: 26 },
//       { x: '$600-$800', y: 32 },
//       { x: '$800-$1000', y: 32 },
//       { x: '$1000-$1200', y: 32 },
//       { x: '$1200-$1400', y: 32 },
//       { x: '$1400-$1600', y: 32 },
//     ],
//   ];

const BarChart: React.FC = () => {
  const { t } = useTranslation();
  const { currentMode } = useStateContext() as StateContextType;
  const [barChartData, setBarChartData] = useState([]);

  const barPrimaryXAxis = {
    valueType: 'Category',
    interval: 1,
    majorGridLines: { width: 0 },
  };
  const barPrimaryYAxis = {
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: { color: 'transparent' },
  };

  useEffect(() => {
    const getBarChartData = async () => {
      const barChartData = await chartApi.getTourPriceBarChart();
      setBarChartData(barChartData.data.data);
    };
    getBarChartData();
  }, []);

  const barCustomSeries = [
    {
      dataSource: barChartData,
      xName: 'x',
      yName: 'y',
      name: t('bar.tourPrice'),
      type: 'Column',
      marker: {
        dataLabel: {
          visible: true,
          position: 'Top',
          font: { fontWeight: '600', color: '#ffffff' },
        },
      },
    },
  ];

  return (
    <ChartComponent
      id="bar-chart"
      height="420px"
      primaryXAxis={barPrimaryXAxis as AxisModel}
      primaryYAxis={barPrimaryYAxis as AxisModel}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === 'Dark' ? '#33373E' : '#FFF'}
    >
      <Inject
        services={[
          ColumnSeries,
          DateTime,
          Legend,
          Tooltip,
          DataLabel,
          Category,
        ]}
      />
      <SeriesCollectionDirective>
        {barCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default BarChart;
