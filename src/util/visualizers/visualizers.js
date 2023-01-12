import { bfs } from "../algorithms/breadth-first-search";

export const visualizeBFS = (table, start, target, R, C) => {
  let res = table.slice();
  let { path, visitedOrdered } = bfs(table, start, target, R, C);
  for (let node of visitedOrdered) {
    res[node.row][node.col].type = "visited";
  }
  for (let node of path) {
    res[node.row][node.col].type = "path";
  }
  return res;
};
