import React from "react";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialValue = {
  UserDetails: [],
};

export const UserDetails = create(
  persist(() => initialValue, {
    name: "UserDetails",
    storage: createJSONStorage(() => sessionStorage),
    partialize: (state) => ({ UserDetails: state.UserDetails }),
  })
);

export const setUserData = (item)=>
UserDetails.setState((state)=>{
  return{ UserDetails: item }
})

export const clearData = ()=>
UserDetails.setState((state)=>{
  return{ UserDetails: [] }
})
