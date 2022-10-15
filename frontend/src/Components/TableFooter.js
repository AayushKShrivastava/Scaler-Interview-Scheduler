import React, { useEffect } from "react";

import "../css/TableFooter.css";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="tableFooter">
      {range.map((el, index) => (
        <button
          key={index}
          className={`button ${
            page === el ? "activeButton" : "inactiveButton"
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;