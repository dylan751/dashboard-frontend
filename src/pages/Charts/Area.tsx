import React from 'react';
import { Helmet } from 'react-helmet';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  Legend,
  SplineAreaSeries,
  AxisModel,
} from '@syncfusion/ej2-react-charts';
import { ChartsHeader } from '../../components';
import {
  StateContextType,
  useStateContext,
} from '../../contexts/ContextProvider';
import { useTranslation } from 'react-i18next';

import {
  areaCustomSeries,
  areaPrimaryYAxis,
  areaPrimaryXAxis,
} from '../../data/dummy';

const Area: React.FC = () => {
  const { currentMode } = useStateContext() as StateContextType;
  const { t } = useTranslation();

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Helmet>
        <title>Area Chart</title>
        <meta name="area-chart-description" content="Area Chart" />
      </Helmet>
      <ChartsHeader
        category={t('app.chart')}
        title={t('area.inflationRateInPercentage')}
      />
      <ChartComponent
        id="area-chart"
        height="420px"
        primaryXAxis={areaPrimaryXAxis as AxisModel}
        primaryYAxis={areaPrimaryYAxis as AxisModel}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        background={currentMode === 'Dark' ? '#33373E' : '#FFF'}
      >
        <Inject services={[SplineAreaSeries, DateTime, Legend]} />
        <SeriesCollectionDirective>
          {areaCustomSeries.map((item, index) => (
            <SeriesDirective key={index} {...item} />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default Area;
