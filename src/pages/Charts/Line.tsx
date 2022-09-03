import React from 'react';
import { Helmet } from 'react-helmet';
import { ChartsHeader, LineChart } from '../../components';
import { useTranslation } from 'react-i18next';

const Line: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Helmet>
        <title>Line Chart</title>
        <meta name="line-chart-description" content="Line Chart" />
      </Helmet>
      <ChartsHeader category={t('app.chart')} title={t('line.inflationRate')} />
      <div className="w-full">
        <LineChart />
      </div>
    </div>
  );
};

export default Line;
