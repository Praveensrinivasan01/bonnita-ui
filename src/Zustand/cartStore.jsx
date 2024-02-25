import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

const initialValue = {
  cart: [],
};

export const cartStore = create(
  persist(() => initialValue, {
    name: "cart",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ cart: state.cart }),
  })
);

export const increment = async (item, userId) => {
  console.log(item?.quantity, "item");
  const itemIndex = cartStore
    .getState()
    .cart.findIndex((Product) => Product?.id === item?.id);

  if (itemIndex !== -1) {
    cartStore.setState((state) => {
      if (state.cart[itemIndex].quantity > state.cart[itemIndex].cart_quantity) {
        state.cart[itemIndex].cart_quantity += 1;
        toast(
          <div>
            <FontAwesomeIcon icon={faHeart} /> {state.cart[itemIndex].name}{" "}
            Added To Your Cart
          </div>,
          { draggable: true }
        );
        console.log(
          "Cart State (after state update):",
          cartStore.getState().cart
        );
      } else {
        toast.error(
          <div>
            {state?.cart[itemIndex].name}{" "}
            Out Of Stock
          </div>,
          { draggable: true }
        );
      }
      return { cart: [...state.cart] };
    });
  }
  else {
    cartStore.setState(async (state) => {
      const data = [
        ...state.cart,
        { ...item, cart_quantity: 1, item },
      ];
      console.log(data, "updatedCart");

      cartStore.setState({ cart: data });
      toast(
        <div>
          <FontAwesomeIcon icon={faHeart} /> {item.name} Added To Your
          Cart
        </div>,
        { draggable: true }
      );

      console.log(
        "Cart State (after state update):",
        cartStore.getState().cart
      );
    });
  }
  // }
};

export const decrement = (item, loginId) => {
  const itemIndex = cartStore
    .getState()
    .cart.findIndex((Product) => Product.id === item.id);
  console.log(itemIndex);
  if (itemIndex !== -1) {
    cartStore.setState((state) => {
      const updatedCart = [...state.cart];
      updatedCart[itemIndex] = { ...updatedCart[itemIndex] };
      console.log(updatedCart[itemIndex].cart_quantity, "before");
      if (updatedCart[itemIndex].cart_quantity > 1) {
        state.cart[itemIndex].cart_quantity -= 1;
        console.log(state.cart[itemIndex].cart_quantity, "after");
        // const fetchData = async () => {
        //   const response1 = await axios.delete(
        //     `${process.env.REACT_APP_API_URL}/product/delete-cart/${loginId.id}/${item.id}`
        //   );
        //   let body = {
        //     user_id: loginId.id,
        //     product_id: item.id,
        //     quantity: state.cart[itemIndex].cart_quantity,
        //   };
        //   const response = await axios.post(
        //     `${process.env.REACT_APP_API_URL}/product/add-cart`,
        //     body
        //   );
        //   console.log(response);
        // };
        // fetchData();
        return { cart: [...state.cart] };
      } else {
        return state;
      }
    });
  }
};

export const removeAllCart = (item) => {
  cartStore.setState((state) => {
    const itemIndex = state.cart.filter((product) => product.id !== item.id);
    return { cart: itemIndex };
  });
};

// window.store=cartStore;
