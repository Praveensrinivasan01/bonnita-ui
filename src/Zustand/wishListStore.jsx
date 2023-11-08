import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

const initialValue = {
  wishList: [],
};

export const wishList = create(
  persist(() => initialValue, {
    name: "wishList",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ wishList: state.wishList }),
  })
);

export const favourite = async (item, loginId) => {
  const itemIndex = wishList
    .getState()
    .wishList.findIndex((Product) => Product?.id === item?.id);
  console.log(itemIndex);
  if(loginId?.id){
    if (itemIndex === -1) {
      wishList.setState( (state) => {
        const fetchData = async()=>{
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/product/add-favourites/${loginId.id}/${item.id}`
            );
            if(response.data.statusCode===200){
              toast(
                <div>
                  <FontAwesomeIcon icon={faHeart} /> {item.name} Added To Your
                  Wishlist
                </div>,
                { draggable: true }
              );
            } else {
              toast("This product have been already added to your Wishlist", {
                draggable: true,
              });
            }
          }
          fetchData()
          return { wishList: [...state.wishList,{...item,fav_quantity:1}] };
      })
    } else{
        toast("This product have been already added to your Wishlist", {
          draggable: true,
        });
    }
  }else {
      toast("User Needs To Login", { draggable: true });
  }
};

export const removeFav = (item) => {
  console.log(item.id, "ITEM");
  wishList.setState((state) => {
    const updatedTable = state.wishList.filter(
      (wishList) => wishList.id !== item.id
    );
    return { wishList: updatedTable };
  });
};
