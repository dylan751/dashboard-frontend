import React from 'react';
import { Helmet } from 'react-helmet';
import { BarChart, ChartsHeader } from '../../components';
import { useTranslation } from 'react-i18next';

const Bar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Helmet>
        <title>Bar Chart</title>
        <meta name="bar-chart-description" content="Bar Chart" />
      </Helmet>
      <ChartsHeader category={t('app.chart')} title={t('bar.tourPriceChart')} />
      <div className="w-full">
        <BarChart />
      </div>
    </div>
  );
};

export default Bar;
