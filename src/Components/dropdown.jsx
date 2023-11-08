import React, { useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDropdown, setSelectedDropDown] = useState('Select ');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectValue = (value) => {
    setSelectedDropDown(value);
    setIsOpen(false);
  };

  return (
    <div className="container">
      <span className="choose"></span>

      <div className={`dropdown ${isOpen ? 'active' : ''}`}>
        <div className="select" onClick={toggleDropdown}>
          <span>{selectedDropdown}</span>
          <i className="fa fa-chevron-left"></i>
        </div>
        <input type="hidden" name="gender" />
        <ul className="dropdown-menu">
          <li id="Products" onClick={() => selectValue('top_products')}>
            Top Products
          </li>
          <li id="location" onClick={() => selectValue('sales_by_location')}>
            Sales By Location
          </li>
          <li id="customers" onClick={() => selectValue('top_customers')}>
            Top Customers
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
