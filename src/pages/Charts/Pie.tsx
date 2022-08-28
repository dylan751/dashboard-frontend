import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ChartsHeader, Pie as PieChart } from '../../components';
import chartApi from '../../services/chartApi';

// Sample pie chart data
// export const pieChartData = [
//   { x: 'Valie', y: 100, text: '100' },
//   { x: 'Shirt', y: 150, text: '150' },
//   { x: 'Bag', y: 30, text: '30' },
//   { x: 'Shoes', y: 45, text: '45' },
// ];

const Pie: React.FC = () => {
  const { t } = useTranslation();
  const [pieChartData, setPieChartData] = useState([]);
  useEffect(() => {
    const getPieChartData = async () => {
      const pieChartData = await chartApi.getProductCategoryPieChart();
      setPieChartData(pieChartData.data.data);
    };
    getPieChartData();
  }, []);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader
        category={t('pie.productPieChart')}
        title={t('pie.productCategoryPieChart')}
      />
      <div className="w-full">
        <PieChart
          id="chart-pie"
          data={pieChartData}
          legendVisiblity
          height="full"
        />
      </div>
    </div>
  );
};

export default Pie;
