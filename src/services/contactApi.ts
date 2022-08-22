import authAxios from './AuthAxios';

class contactApi {
  getListContacts = async () => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/contacts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  getContact = async (contactId) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/contacts/${contactId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  addContact = async (contactData) => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: contactData,
    });
  };

  updateContact = async (contactId, contactData) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/contacts/${contactId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: contactData,
      },
    );
  };

  deleteContact = async (contactId) => {
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/contacts/${contactId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };
}

export default new contactApi();
