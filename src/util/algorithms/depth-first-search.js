import { explore_neighbours, reconstructPath } from "./helpers";

export function dfs(table, start, target, R, C) {
  /* Depth-First Search Implemetation */
  const visited = [];
  const visitedOrdered = [];
  const prev = {};
  let found = false;
  const stack = [];

  for (let i = 0; i < R; i++) {
    let curr = [];
    for (let j = 0; j < C; j++) curr.push(false);
    visited.push(curr);
  }

  stack.push(start);
  visited[start.row][start.col] = true;

  while (stack.length) {
    let curr = stack.pop();
    let r = curr.row;
    let c = curr.col;
    if (!visited[r][c]) {
      visited[r][c] = true;
      visitedOrdered.push(table[r][c]);
    }
    if (table[r][c].isTarget) {
      found = true;
      break;
    }
    const neighbours = explore_neighbours(table, visited, prev, r, c, R, C);
    for (const neighbour of neighbours) {
      stack.push(neighbour);
      visitedOrdered.push(neighbour);
    }
  }
  return {
    path: reconstructPath(start, target, prev),
    visitedOrdered,
  };
}
