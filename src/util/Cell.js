export class Cell {
  static CELL_SIZE = 25;

  constructor(row, col, type = "unvisited", weight = 1) {
    /* Create Cell */
    this.row = row; // row position
    this.col = col; // col position
    this.type = type; // cell type
    this.weight = weight; // cell weight
    this.isStart = false; // cell is start node
    this.isTarget = false; // cell is target node
  }

  is_same(other) {
    /* Return true if cell is the same as the other cell */
    if (typeof other !== typeof this) return false;
    if (other.row === this.row && other.col === this.col) return true;
    return false;
  }
}
