import {
  StateContextType,
  useStateContext,
} from '../../contexts/ContextProvider';

const useAuth = () => {
  const { currentUser, setUser, accessToken } = useStateContext() as StateContextType;
  const resetCurrentUser = () => {
    setUser(undefined);
  };

  const removeStore = () => {
    resetCurrentUser();
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
  };

  const logout = () => {
    removeStore();
  };

  return { currentUser, setUser, logout, accessToken };
};

export default useAuth;
