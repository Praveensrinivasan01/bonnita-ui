import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/customNavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faCog, faEnvelope, faFileAlt, faHeart, faHome, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CustomNavBar = () => {

  useEffect(() => {
    // feather.replace();
    document.querySelector(".customNavBar").focus();
  }, []);

  return (
    <div className="customNavBarFooter d-md-none">
       <Link to="/wishlist" className="customNavBar">
        <FontAwesomeIcon icon={faHeart} /><span className='ms-2'>WishList</span>
      </Link>

      <Link to="/cart" className="customNavBar">
        <FontAwesomeIcon icon={faShoppingCart} /><span className='ms-2'>Cart</span>
      </Link>
      <Link className="customNavBar">
        <FontAwesomeIcon icon={faFileAlt} /><span className='ms-2'>Order Details</span>
      </Link>
      
    </div>
  );
}

export default CustomNavBar;
