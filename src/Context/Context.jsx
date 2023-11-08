// import React, { createContext, useContext, useState } from "react";

// const PlaceOrderContext = createContext();

// export function PlaceOrderProvider({ children }) {
//   const [placeOrderDetails, setPlaceOrderDetails] = useState([]);

//   return (
//     <PlaceOrderContext.Provider
//       value={{ placeOrderDetails, setPlaceOrderDetails }}
//     >
//       {children}
//     </PlaceOrderContext.Provider>
//   );
// }

// export function usePlaceOrder() {
//   return useContext(PlaceOrderContext);
// }


// Context definition
// import React, { createContext, useContext } from "react";

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const userToken = "your-user-token"; 

//   return (
//     <UserContext.Provider value={{ userToken }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   return useContext(UserContext);
// }
