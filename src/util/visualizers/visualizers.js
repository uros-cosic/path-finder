import { bfs } from "../algorithms/breadth-first-search";
import { dfs } from "../algorithms/depth-first-search";
import { dijkstras } from "../algorithms/dijkstras";

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

export const visualizeDFS = (table, start, target, R, C) => {
  let res = table.slice();
  let { path, visitedOrdered } = dfs(table, start, target, R, C);
  for (let node of visitedOrdered) {
    res[node.row][node.col].type = "visited";
  }
  for (let node of path) {
    res[node.row][node.col].type = "path";
  }
  return res;
};

export const visualizeDijkstras = (table, start, target, R, C) => {
  let res = table.slice();
  let { path, visitedOrdered } = dijkstras(table, start, target, R, C);
  for (let node of visitedOrdered) {
    res[node.row][node.col].type = "visited";
  }
  for (let node of path) {
    res[node.row][node.col].type = "path";
  }
  return res;
};
