import authAxios from './AuthAxios';

class AuthApi {
  login = async (data: object) => {
    console.log(data);
    return await authAxios(
      `${process.env.REACT_APP_API_DOMAIN}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      },
    );
  };

  signup = async (data: object) => {
    return await authAxios(`${process.env.REACT_APP_API_DOMAIN}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });
  };
}

export default new AuthApi();
