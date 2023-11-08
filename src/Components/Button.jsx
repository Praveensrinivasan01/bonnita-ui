import React from "react";
import { Link } from "react-router-dom";

const Button = ({ btnName, link, btnStyle, linkNeeded ,functionName,parameter }) => {
  return (
    <div>
      {linkNeeded ? (
        <Link to={`${link}`}>
          <button className={`${btnStyle}`}>{btnName}</button>
        </Link>
      ) : (
        <button className={`${btnStyle}`} onClick={()=>functionName(parameter)}>{btnName}</button>
      )}
    </div>
  );
};

export default Button;
