import React from "react";

function Cell(props) {
  return <div className={`Cell ${props.cell.type}`}></div>;
}

export default Cell;
