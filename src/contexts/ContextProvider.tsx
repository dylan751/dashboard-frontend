import React, { createContext, ReactNode, useContext, useState } from 'react';

type ContextProviderProps = {
  children: ReactNode;
};

export type StateContextType = {
  activeMenu: boolean;
  setActiveMenu: any;
};

export const StateContext = createContext<StateContextType | null>(null);

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [activeMenu, setActiveMenu] = useState(true);

  return (
    <StateContext.Provider value={{ activeMenu, setActiveMenu }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
