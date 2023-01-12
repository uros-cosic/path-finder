import { useState, useEffect } from "react";
import { FaPlay, FaTrash } from "react-icons/fa";
import "./styles/Table.css";

import { makeTable } from "../util/util.js";
import { Cell as CellUtil } from "../util/Cell.js";
import {
  visualizeBFS,
  visualizeDFS,
  visualizeDijkstras,
} from "../util/visualizers/visualizers.js";

import Cell from "./Cell";

function Table(props) {
  const [table, setTable] = useState({
    table: [],
    start: null,
    target: null,
    row_len: 0,
    col_len: 0,
  });

  useEffect(() => {
    /* Create path finder table on page load and update table */
    const newTable = makeTable(document.querySelector(".table"));
    const row = newTable.length;
    const col = newTable[0].length;
    const start = new CellUtil(1, 1);
    const target = new CellUtil(row - 2, col - 2);
    start.isStart = true;
    start.type = "start";
    target.isTarget = true;
    target.type = "target";
    newTable[1][1] = start;
    newTable[row - 2][col - 2] = target;
    setTable({
      table: newTable,
      start,
      target,
      row_len: row,
      col_len: col,
    });
  }, []);

  const getAlgorithm = (algName) => {
    const available = {
      "breadth-first search": {
        visualize: visualizeBFS,
      },
      "depth-first search": {
        visualize: visualizeDFS,
      },
      "dijkstra's": {
        visualize: visualizeDijkstras,
      },
    };
    return available[algName];
  };

  const handleVisualize = () => {
    const res = getAlgorithm(props.algorithm)["visualize"](
      table.table,
      table.start,
      table.target,
      table.row_len,
      table.col_len
    );
    setTable({
      table: res,
    });
  };

  return (
    <div className="Table">
      <div className="table-buttons">
        <button onClick={handleVisualize}>
          <FaPlay />
          <div className="visualize">Visualize</div>
        </button>
        <hr className="line" />
        <button>
          <FaTrash />
          <div className="clear">Clear</div>
        </button>
        <p className="error-text"></p>
        {/* Dodaj za Speed (imas u sorting vis)*/}
      </div>
      <div className="table">
        {table.table.map((row, idx) => (
          <div className="tableRow" key={idx}>
            {row.map((cell, idx) => (
              <Cell key={idx} cell={cell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
