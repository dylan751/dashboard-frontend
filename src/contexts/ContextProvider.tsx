import React, { createContext, ReactNode, useContext, useState } from 'react';

type ContextProviderProps = {
  children: ReactNode;
};

export type StateContextType = {
  activeMenu: boolean;
  setActiveMenu: any;
  isClicked: NavbarInterface;
  setIsClicked: any;
  handleClick: (clicked: string) => void;
  screenSize: number | undefined;
  setScreenSize: any;
};

interface NavbarInterface {
  chat: boolean;
  cart: boolean;
  userProfile: boolean;
  notification: boolean;
}

export const StateContext = createContext<StateContextType | null>(null);

const initialState: NavbarInterface = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined); // To auto closing Sidebar if on Mobile

  const handleClick = (clicked: string) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
