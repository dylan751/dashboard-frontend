import axios from 'axios';

class AuthApi {
  login = async (data: object) => {
    return await axios(`${process.env.REACT_APP_API_LOCAL_DOMAIN}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });
  };

  signup = async (data: object) => {
    return await axios(`${process.env.REACT_APP_API_LOCAL_DOMAIN}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });
  }
}

export default new AuthApi();