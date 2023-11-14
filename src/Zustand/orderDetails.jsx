import {create} from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialValue = {
  orderDetails: [],
};

export const orderDetails = create(
  persist((set) => initialValue, {
    name: "orderDetails",
  })
);

export const addorderDetails = (item) =>
orderDetails.setState((state) => {
    return { orderDetails:item };
  });
