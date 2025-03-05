import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ initialState, children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated);
  const [user, setUser] = useState(initialState.user);
  const [constants, setConstants] = useState(initialState.constants);

  return (
    <GlobalContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, constants, setConstants }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
