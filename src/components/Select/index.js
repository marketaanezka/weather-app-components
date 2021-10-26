import React from "react";
import { cities } from "../../utils/cities";

const Select = (value, handleChangeCity) => {
  return (
    <select
      className="select"
      name="cityselect"
      id="cityselect"
      value={value}
      onChange={(e) => handleChangeCity(e.target.value)}
    >
      {cities.map((listedCity) => (
        <option key={listedCity} value={listedCity}>
          {listedCity}
        </option>
      ))}
    </select>
  );
};

export default Select;
