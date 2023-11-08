import {create} from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialValue = {
  placeOrder: [],
};

export const placeOrder = create(
  persist((set) => initialValue, {
    name: "placeOrder",
  })
);

export const addToPlaceOrder = (item) =>
  placeOrder.setState((state) => {
    return { placeOrder:item };
  
  });
