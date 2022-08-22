import authAxios from './AuthAxios';

class destinationApi {
  getListDestinations = async () => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/destinations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  getDestination = async (destinationId) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/destinations/${destinationId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  addDestination = async (destinationData) => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/destinations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: destinationData,
    });
  };

  updateDestination = async (destinationId, destinationData) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/destinations/${destinationId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: destinationData,
      },
    );
  };

  deleteDestination = async (destinationId) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/destinations/${destinationId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };
}

export default new destinationApi();
