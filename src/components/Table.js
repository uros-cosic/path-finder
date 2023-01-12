import { useState, useEffect } from "react";
import { FaPlay, FaTrash, FaWeightHanging } from "react-icons/fa";
import "./styles/Table.css";
import "./styles/nodes.css";

import {
  clearTable,
  makeTable,
  getAlgorithm,
  tableWallToggle,
  nodeToggle,
  makeWeightedTable,
} from "../util/util.js";
import { Cell as CellUtil } from "../util/Cell.js";
import { visualize } from "../util/visualizers/visualizers.js";

import Cell from "./Cell";
import { animate } from "../util/animators/animators";

function Table(props) {
  const [table, setTable] = useState({
    table: [],
    start: null,
    target: null,
    row_len: 0,
    col_len: 0,
  });

  const [isVisualizing, setIsVisualizing] = useState(false);
  const [visualized, setVisualized] = useState(false);
  const [showWeights, setShowWeights] = useState(false);

  const [mousePressed, setMousePressed] = useState(false);
  const [nodesChanging, setNodesChanging] = useState({
    node: null,
    changing: false,
  });

  useEffect(() => {
    /* Create path finder table on page load and update table */
    const newTable = makeTable(document.querySelector(".table"));
    const row = newTable.length;
    const col = newTable[0].length;
    const start = new CellUtil(1, 1);
    const target = new CellUtil(row - 2, col - 2);
    start.isStart = true;
    target.isTarget = true;
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

  const updateTable = (new_table) => {
    /* Update table property of table */
    setTable({
      ...table,
      table: new_table,
    });
  };

  const visualizeVizualized = (alg_name, T) => {
    /* Handle visualize after the table is already visualized */
    updateTable(
      visualize(
        alg_name,
        T,
        table.start,
        table.target,
        table.row_len,
        table.col_len
      )
    );
  };

  const animateVisualized = (alg_name, T) => {
    /* Handle animate after the table is already visualized */
    animate(
      alg_name,
      T,
      table.start,
      table.target,
      table.row_len,
      table.col_len,
      updateTable,
      setIsVisualizing,
      setVisualized
    );
  };

  const handleVisualize = () => {
    /* Handle Visualize Button Click */
    let errorEl = document.querySelector(".error-text");
    if (!props.algorithm) {
      errorEl.innerText = "Select an Algorithm From Navbar to Visualize It";
      return;
    }
    errorEl.innerText = "";

    if (isVisualizing) return;
    if (visualized) {
      const tempTable = clearTable(table, true);
      animateVisualized(props.algorithm, tempTable);
    } else {
      setIsVisualizing(true);
      animateVisualized(props.algorithm, table.table);
    }
  };

  const handleClear = () => {
    /* Handle Clear Button Click*/
    if (isVisualizing) return;
    updateTable(clearTable(table));
    setVisualized(false);
  };

  const handleAddWeights = () => {
    /* Add weights when the button is clicked */
    const tempTable = makeWeightedTable(table);
    updateTable(tempTable);
    setShowWeights(true);
  };

  const handleMousePress = (row, col) => {
    /* Handle what happens when mouse is pressed on Cell component */
    if (isVisualizing) return;
    setMousePressed(true);
    if (table.start.row === row && table.start.col === col) {
      setNodesChanging({
        node: "start",
        changing: true,
      });
    } else if (table.target.row === row && table.target.col === col) {
      setNodesChanging({
        node: "target",
        changing: true,
      });
    } else {
      table.table[row][col].weight = 1;
      updateTable(tableWallToggle(table.table, row, col));
      if (visualized) {
        let tempTable = clearTable(table, true);
        visualizeVizualized(props.algorithm, tempTable);
      }
    }
  };

  const handleMouseEnter = (row, col) => {
    /* Handle what happens when mouse enters on Cell component */
    if (!mousePressed) return;
    if (!nodesChanging.changing) {
      let temp = new CellUtil(row, col);
      if (!table.start.is_same(temp) && !table.target.is_same(temp)) {
        table.table[row][col].weight = 0;
        updateTable(tableWallToggle(table.table, row, col));
        if (visualized) {
          let tempTable = clearTable(table, true);
          visualizeVizualized(props.algorithm, tempTable);
        }
      }
    } else {
      let nodeType = nodesChanging.node;
      if (nodeType === "start") {
        if (!table.target.is_same(new CellUtil(row, col))) {
          updateTable(
            nodeToggle(
              table.table,
              row,
              col,
              nodeType,
              table.start,
              table.target,
              showWeights
            )
          );
          if (visualized) {
            let tempTable = clearTable(table, true);
            visualizeVizualized(props.algorithm, tempTable);
          }
        }
      }
      if (nodeType === "target") {
        if (!table.start.is_same(new CellUtil(row, col))) {
          updateTable(
            nodeToggle(
              table.table,
              row,
              col,
              nodeType,
              table.start,
              table.target,
              showWeights
            )
          );
          if (visualized) {
            let tempTable = clearTable(table, true);
            visualizeVizualized(props.algorithm, tempTable);
          }
        }
      }
    }
  };

  const handleMouseUp = () => {
    /* Handle what happens when mouse is up after being pressed on Cell component */
    setMousePressed(false);
    setNodesChanging({
      node: null,
      changing: false,
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
        <button onClick={handleClear}>
          <FaTrash />
          <div className="clear">Clear</div>
        </button>
        {getAlgorithm(props.algorithm).weighted && (
          <>
            <hr className="line" />
            <button>
              <FaWeightHanging />
              <div className="weights" onClick={handleAddWeights}>
                Add Weights
              </div>
            </button>
          </>
        )}
        <p className="error-text"></p>
      </div>
      <div className="table">
        {table.table.map((row, idx) => (
          <div className="tableRow" key={idx}>
            {row.map((cell, idx) => (
              <Cell
                key={idx}
                cell={cell}
                showWeights={showWeights}
                onMousePress={(row, col) => {
                  handleMousePress(row, col);
                }}
                onMouseEnter={(row, col) => {
                  handleMouseEnter(row, col);
                }}
                onMouseUp={() => {
                  handleMouseUp();
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
