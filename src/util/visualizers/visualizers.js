import { getAlgorithm } from "../util";

export const visualize = (alg_name, table, start, target, R, C) => {
  /* Visualize the algorithm by showing visited and path nodes */
  let res = table.slice();
  let { path, visitedOrdered } = getAlgorithm(alg_name).algorithm(
    table,
    start,
    target,
    R,
    C
  );
  for (let node of visitedOrdered) {
    res[node.row][node.col].type = "visited";
  }
  for (let node of path) {
    res[node.row][node.col].type = "path";
  }
  return res;
};
