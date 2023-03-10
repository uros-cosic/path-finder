import { Queue, explore_neighbours, reconstructPath } from "./helpers";

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
  return {
    path: reconstructPath(start, target, prev),
    visitedOrdered,
  };
}
