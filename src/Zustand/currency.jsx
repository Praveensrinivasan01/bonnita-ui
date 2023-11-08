import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const initialValues = {
    AllCurrencies: [ 
        {name: "INR", symbol: "₹", Url: "https://www.worldometers.info/img/flags/in-flag.gif"} , 
        {name: "USD", symbol: "$", Url: "https://www.worldometers.info/img/flags/us-flag.gif"} ,
        {name: "RUB", symbol: "₽", Url: "https://www.worldometers.info/img/flags/rs-flag.gif"} ,
        {name: "EUR", symbol: "€", Url: "https://www.worldometers.info/img/flags/fr-flag.gif"} ,
        {name: "AED", symbol: "د.إ", Url: "https://www.worldometers.info/img/flags/ae-flag.gif"} ,
    ],
    currencyValue: 1,
    currencyCode: {name: "INR", symbol: "₹", Url: "https://www.worldometers.info/img/flags/in-flag.gif"} , 

} 

let currencyStore = (set, get) => ({
    ...initialValues,
    setCurrency: async ( currency ) => {
        const response = await axios.get("https://open.er-api.com/v6/latest/INR")
        const newValue = response?.data?.rates[currency]
        const filtered = initialValues.AllCurrencies.find((e) => e.name == currency)
        set({ currencyValue: newValue, currencyCode: filtered})
    },
    currencyConversion: (money) => {
        const response = Math.ceil(Number(money) * Number(get().currencyValue))
        // console.log("CHECK KAR", money, get().currencyValue, Number(money) * Number(initialValues.currencyValue))
        return response
    }
});

currencyStore = devtools(currencyStore);

export const useCurrencyStore = create(currencyStore);
