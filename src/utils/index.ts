import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const createOrGetUser = async (response: any) => {
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    response.credential,
  );

  const { name, picture, sub } = decoded;

  // Create user object
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };

  await axios.post(`${process.env.REACT_APP_API_LOCAL_DOMAIN}/auth`, user);
};
