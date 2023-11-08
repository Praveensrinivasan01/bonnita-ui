import React, { createContext, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const userToken = "your-user-token"; 

  return (
    <UserContext.Provider value={{ userToken }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}