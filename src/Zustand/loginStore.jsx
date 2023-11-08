import React from "react";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialValue = {
  login: [],
};

export const loginStore = create(
  persist(() => initialValue, {
    name: "login",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ login: state.login }),
  })
);

export const setLoginData = (item)=>
loginStore.setState((state)=>{
  return{ login: item }
})

export const logout = ()=>
loginStore.setState((state)=>{
  return{ login: [] }
})
