import React from "react";

const Button = ({ value, handleClick }) => (
  <button className="button" onClick={handleClick}>
    {value}
  </button>
);

export default Button;
