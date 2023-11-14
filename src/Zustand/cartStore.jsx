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
  console.log(item,"item");
  const itemIndex = cartStore
    .getState()
    .cart.findIndex((Product) => Product?.id === item?.id);
  // console.log(userId, "itemm");

  if (userId?.id && userId) {
    if (itemIndex !== -1) {
      cartStore.setState((state) => {
        state.cart[itemIndex].cart_quantity += 1;
        const fetchData = async () => {
          let body = {
            user_id: userId.id,
            product_id: item.id,
            quantity: state.cart[itemIndex].cart_quantity,
          };
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/product/add-cart`,
            body
          );
          if (response.status === 200) {
            toast(
              <div>
                <FontAwesomeIcon icon={faHeart} /> {state.cart[itemIndex].name}{" "}
                Added To Your Cart
              </div>,
              { draggable: true }
            );
          } else {
            toast("This product have been already added to your Cart", {
              draggable: true,
            });
          }
        };
        fetchData();
        return { cart: [...state.cart] };
      });
    } else {
      cartStore.setState(async (state) => {
        if (userId) {
          const fetchData1 = async () => {
            let body = {
              user_id: userId.id,
              product_id: item.id,
              quantity: 1,
            };
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/product/add-cart`,
              body
            );
            let response1 = await axios.get(
              `${process.env.REACT_APP_API_URL}/product/get-all-cart/${userId.id}`
            );
            const data = [
              ...state.cart,
              { ...item, cart_quantity: 1, response1 },
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
          };

          await fetchData1();
        }
      });
    }
  }
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
        const fetchData = async () => {
          const response1 = await axios.delete(
            `${process.env.REACT_APP_API_URL}/product/delete-cart/${loginId.id}/${item.id}`
          );
          let body = {
            user_id: loginId.id,
            product_id: item.id,
            quantity: state.cart[itemIndex].cart_quantity,
          };
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/product/add-cart`,
            body
          );
          console.log(response);
        };
        fetchData();
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
