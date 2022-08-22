import authAxios from './AuthAxios';

class productApi {
  getListProducts = async () => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  getProduct = async (productId) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/products/${productId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  addProduct = async (productData) => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: productData,
    });
  };

  updateProduct = async (productId, productData) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/products/${productId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: productData,
      },
    );
  };

  deleteProduct = async (productId) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/products/${productId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };
}

export default new productApi();
