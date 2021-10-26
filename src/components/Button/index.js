import React from "react";
import "./style.css";

const Button = ({ value, handleClick }) => (
  <button className="button" onClick={handleClick}>
    {value}
  </button>
);

export default Button;
