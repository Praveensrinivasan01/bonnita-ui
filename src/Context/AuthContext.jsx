import axios from "axios";
import { createContext } from "react";
// import { API_URL } from "../env/env";
import { loginStore } from "../Zustand/loginStore";
import { cartStore } from "../Zustand/cartStore";
import { wishList } from "../Zustand/wishListStore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const state2 = loginStore((state) => state?.login);
    const favData = wishList((state) => state?.wishList);
    const state = cartStore((state) => state?.cart);

    const fetchData = async () => {

        try {
            let cartResponse;
            if (state2?.id) {
                cartResponse = await axios.get(
                    `${process.env.REACT_APP_API_URL}/product/get-all-cart/${state2?.id}`
                );
                // const state = cartStore((state) => state?.cart);
                if (cartResponse && cartResponse?.data?.data?.length > 0) {
                    if (state?.length !== cartResponse.data.data?.length) {
                        localStorage.setItem("cart", JSON.stringify({ state: { cart: cartResponse?.data?.data } }));
                        window.location.reload();
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };


    const fetchDataFav = async () => {
        try {
            let response1;
            if (state2?.id) {
                response1 = await axios.get(
                    `${process.env.REACT_APP_API_URL}/product/get-all-favourites/${state2?.id}`
                );
                if (response1 && response1?.data?.data?.length > 0) {
                    if (favData.length !== response1.data.data?.length) {
                        localStorage.setItem(
                            "wishList",
                            JSON.stringify({ state: { wishList: response1?.data?.data } })
                        );
                    }
                }

            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    return (
        <AuthContext.Provider value={{ fetchData, fetchDataFav }}>
            {children}
        </AuthContext.Provider>
    );
};
