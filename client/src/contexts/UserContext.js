import React, { createContext, useContext } from 'react';

// Create a new context
const UserContext = createContext(null);

// Create a provider component to wrap your app and provide the user data
export const UserProvider = ({ user, children }) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

// Create a custom hook to access the user data
export const useUser = () => useContext(UserContext);
