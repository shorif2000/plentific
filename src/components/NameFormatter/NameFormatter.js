import React from "react";

const nameFormatter = (cell, row) => {
  const name = cell.substring(0, cell.lastIndexOf(" "));
  return <>{name}</>;
};

export default nameFormatter;
