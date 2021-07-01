import React, { useState, useEffect, useRef } from "react";

const Pagination = (props) => {
  const { options, filters, selectFilter } = props;

  return (
    <div className="dropdown_container">
      {options.map((option) => (
        <p onClick={() => selectFilter(option)}>
          {" "}
          <input type="checkbox" checked={filters.includes(option)} />
          {option}
        </p>
      ))}
    </div>
  );
};
export default Pagination;
