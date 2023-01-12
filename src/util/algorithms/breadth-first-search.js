import { Queue, explore_neighbours } from "./helpers";

const reconstructPath = (start, target, prev) => {
  let path = [];
  for (let at = target; at !== undefined; at = prev[`${at.row}:${at.col}`]) {
    path.push(at);
  }
  path.reverse();
  if (start.is_same(path[0])) return path;
  return [];
};

export function bfs(table, start, target, R, C) {
  /* Breadth-First Search Implemetation */
  let visited = [];
  let visitedOrdered = [];
  let prev = {};

  for (let i = 0; i < R; i++) {
    let curr = [];
    for (let j = 0; j < C; j++) curr.push(false);
    visited.push(curr);
  }

  let rq = new Queue();
  let cq = new Queue();

  let found = false;

  rq.enqueue(start.row);
  cq.enqueue(start.col);

  while (!rq.is_empty()) {
    const r = rq.dequeue();
    const c = cq.dequeue();

    if (!visited[r][c]) {
      visited[r][c] = true;
      visitedOrdered.push(table[r][c]);
    }

    if (table[r][c].isTarget) {
      // Stop early if the target is found
      found = true;
      break;
    }

    const neighbours = explore_neighbours(table, visited, prev, r, c, R, C);
    for (const neighbour of neighbours) {
      rq.enqueue(neighbour.row);
      cq.enqueue(neighbour.col);
      visitedOrdered.push(neighbour);
    }
  }

  if (found) {
    // There is a path from start node to target node
    return {
      path: reconstructPath(start, target, prev),
      visitedOrdered,
    };
  }

  return {
    path: [],
    visitedOrdered,
  };
}
