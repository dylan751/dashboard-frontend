import authAxios from './AuthAxios';

class chartApi {
  getTourPriceBarChart = async () => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/charts/tour-bar-chart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  getProductCategoryPieChart = async () => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/charts/product-pie-chart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}

export default new chartApi();
