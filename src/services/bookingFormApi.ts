import authAxios from './AuthAxios';

class bookingFormApi {
  getListBookingForms = async () => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/forms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  getBookingForm = async (formId) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/forms/${formId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  addBookingForm = async (formData) => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    });
  };

  updateBookingForm = async (formId, formData) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/forms/${formId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      },
    );
  };

  deleteBookingForm = async (formId) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/forms/${formId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };
}

export default new bookingFormApi();
