import {
  StateContextType,
  useStateContext,
} from '../../contexts/ContextProvider';

const useAuth = () => {
  const { currentUser, setUser } = useStateContext() as StateContextType;
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

  return { currentUser, setUser, logout };
};

export default useAuth;
