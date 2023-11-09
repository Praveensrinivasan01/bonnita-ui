import React, { useState } from "react";
import '../Styles/CurrencySwitcher.css'
import { useCurrencyStore } from "../Zustand/currency";

const CurrencySwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedCurrency, setSelectedCurrency] = useState("INR");

  const currencies = useCurrencyStore((state) => state?.AllCurrencies)
  const selectedCurrency = useCurrencyStore((state) => state?.currencyCode)
  const setSelectedCurrency = useCurrencyStore((state) => state?.setCurrency)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCurrency = (currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
    console.log(currency); // You can handle the selected currency here
  };

  const handleDropdownClose = (evt) => {
    if (!evt.target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div className="currency-switcher" >
        <div className={`dropdown currency ${isOpen ? "open" : ""}`}>
          <div className="caption d-flex gap-3" onClick={toggleDropdown}>
            <img  src={selectedCurrency?.Url} alt={selectedCurrency.name}/>
            <span>{selectedCurrency.name}</span>
          </div>
          <div className="list" >
            {currencies.map((currency) => (
              <div
                key={currency.name}
                className={`item d-flex gap-3 ${
                  selectedCurrency === currency.name ? "selected" : ""
                }`}
                data-item={currency.name}
                onClick={() => selectCurrency(currency.name)}
              >
                <img src={currency?.Url} alt={currency.name}/>
                <span>{currency.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencySwitcher;
