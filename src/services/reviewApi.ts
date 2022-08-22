import authAxios from './AuthAxios';

class reviewApi {
  getListReviews = async () => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  getReview = async (reviewId) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/reviews/${reviewId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  addReview = async (reviewData) => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: reviewData,
    });
  };

  updateReview = async (reviewId, reviewData) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/reviews/${reviewId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: reviewData,
      },
    );
  };

  deleteReview = async (reviewId) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/reviews/${reviewId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };
}

export default new reviewApi();
