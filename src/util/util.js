import { bfs } from "./algorithms/breadth-first-search";
import { dfs } from "./algorithms/depth-first-search";
import { dijkstras } from "./algorithms/dijkstras";
import { Cell } from "./Cell";

const calculateSize = (e) => {
  /* Calculates the available height & width for the element */
  const { x, y } = e.getBoundingClientRect();
  const height = window.innerHeight - y;
  const width = window.innerWidth - x;
  return {
    height,
    width,
  };
};

const rngWeight = (max = 100, min = 1) => {
  /* Return random weight in range from min to max */
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const makeTable = (tableEl) => {
  /* Make 2D array of Cells to represent the table */
  const { height, width } = calculateSize(tableEl);
  const row = Math.floor(height / Cell.CELL_SIZE);
  const col = Math.floor(width / Cell.CELL_SIZE);
  let res = [];
  for (let i = 0; i < row; i++) {
    let curr = [];
    for (let j = 0; j < col; j++) {
      curr.push(new Cell(i, j));
    }
    res.push(curr);
  }
  return res;
};

export const makeWeightedTable = (table) => {
  const T = table.table;
  for (let i = 0; i < T.length; i++) {
    for (let j = 0; j < T[i].length; j++) {
      T[i][j].weight = rngWeight();
    }
  }
  return T;
};

export const clearTable = (table, keep_walls = false) => {
  /* Clear the table nodes to default, but don't change start & target node position.

  Save walls if keep_walls is true
  */
  const T = table.table;
  for (let i = 0; i < T.length; i++) {
    for (let j = 0; j < T[i].length; j++) {
      if (keep_walls && T[i][j].type === "wall") {
        T[i][j].weight = rngWeight();
        continue;
      }
      T[i][j].type = "unvisited";
    }
  }
  return T;
};

export const getAlgorithm = (algName) => {
  /* Get appropriate functions for visualizing/animating based on current algorithm */
  const available = {
    "breadth-first search": {
      algorithm: bfs,
      weighted: false,
    },
    "depth-first search": {
      algorithm: dfs,
      weighted: false,
    },
    "dijkstra's": {
      algorithm: dijkstras,
      weighted: true,
    },
    default: {
      algorithm: null,
      weighted: null,
    },
  };
  if (available[algName]) return available[algName];
  return available.default;
};

export const tableWallToggle = (table, row, col) => {
  /* Toggle the cell type to a wall */
  table[row][col].type = "wall";
  return table;
};

export const nodeToggle = (table, row, col, type, start, target, weighted) => {
  /* Move start / target node around the table */
  const weight = weighted ? rngWeight() : 1;
  if (type === "start") {
    table[start.row][start.col] = new Cell(
      start.row,
      start.col,
      start.type,
      weight
    );
    start.row = row;
    start.col = col;
    table[row][col] = start;
  } else {
    table[target.row][target.col] = new Cell(
      target.row,
      target.col,
      target.type,
      weight
    );
    target.row = row;
    target.col = col;
    table[row][col] = target;
  }
  return table;
};
