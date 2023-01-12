import { PriorityQueue, convertToAdjList, reconstructPath } from "./helpers";

export function dijkstras(table, start, target, R, C) {
  let adjList = convertToAdjList(table, R, C);
  let visited = {};
  let dist = {};
  let prev = {};
  let found = false;
  let visitedOrdered = [];
  let s = `${start.row}:${start.col}`;
  dist[s] = 0;
  let pq = new PriorityQueue();
  pq.add([s, 0]);

  while (!pq.isEmpty()) {
    const [id, minVal] = pq.poll();
    visited[id] = true;
    let [id_x, id_y] = id.split(":");
    visitedOrdered.push(table[id_x][id_y]);
    if (dist[id] < minVal) continue;
    for (let [edgeId, weight] of adjList[id]) {
      if (visited[edgeId]) continue;
      let newDist = dist[id] + weight;
      if (!dist[edgeId] || newDist < dist[edgeId]) {
        prev[edgeId] = table[id_x][id_y];
        dist[edgeId] = newDist;
        pq.add([edgeId, newDist]);
      }
    }
    if (table[id_x][id_y] === target) {
      // Stop early if the target is found
      found = true;
      break;
    }
  }
  return {
    dist,
    path: reconstructPath(start, target, prev),
    visitedOrdered,
  };
}
