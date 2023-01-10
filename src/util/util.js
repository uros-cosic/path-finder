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

const rngWeight = (weighted = false, max = 100, min = 1) => {
  if (!weighted) return 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const makeTable = (tableEl, weighted) => {
  const { height, width } = calculateSize(tableEl);
  const row = Math.floor(height / Cell.CELL_SIZE);
  const col = Math.floor(width / Cell.CELL_SIZE);
  console.log(height, width);
  let res = [];
  for (let i = 0; i < row; i++) {
    let curr = [];
    for (let j = 0; j < col; j++) {
      const rngW = rngWeight(weighted);
      curr.push(new Cell(i, j, "unvisited", rngW));
    }
    res.push(curr);
  }
  return res;
};
