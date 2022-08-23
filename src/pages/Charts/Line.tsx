import React from 'react';
import { Header, LineChart } from '../../components';
import { useTranslation } from 'react-i18next';

const Line: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category={t('app.chart')} title={t('line.inflationRate')} />
      <div className="w-full">
        <LineChart />
      </div>
    </div>
  );
};

export default Line;
