export class Queue {
  /* Circular queue implementation */
  static DEFAULT_CAPACIY = 10;
  constructor() {
    /* Create empty queue */
    this._data = new Array(Queue.DEFAULT_CAPACIY);
    this._size = 0;
    this._front = 0;
  }

  is_empty() {
    /* Return true if the queue is empty */
    return this._size === 0;
  }

  enqueue(e) {
    /* Add element e to the back of the queue */
    if (this._size === this._data.length) {
      this._resize(2 * this._data.length);
    }
    const avail = (this._front + this._size) % this._data.length;
    this._data[avail] = e;
    this._size += 1;
  }

  dequeue() {
    /* Remove and return first element in queue
        
        Throw Empty error if the queue is empty
    */
    if (this.is_empty()) throw new Error("Queue is empty");
    const res = this._data[this._front];
    this._data[this._front] = null;
    this._front = (this._front + 1) % this._data.length;
    this._size -= 1;
    return res;
  }

  _resize(c) {
    /* Resize the queue to capacity c */
    const old = this._data;
    this._data = new Array(c);
    let walk = this._front;
    for (let i = 0; i < this._size; i++) {
      this._data[i] = old[walk];
      walk = (walk + 1) % old.length;
    }
    this._front = 0;
  }
}

export function explore_neighbours(table, visited, prev, r, c, R, C) {
  /* Explore horizontal and vertical neighbours of table[r][c] */
  // North, South, East, West
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, 1, -1];

  let res = [];

  for (let i = 0; i < 4; i++) {
    const rr = r + dr[i];
    const cc = c + dc[i];

    if (rr < 0 || rr >= R) continue; // Out of bounds
    if (cc < 0 || cc >= C) continue; // Out of bounds

    const neighbour = table[rr][cc];

    if (neighbour.type === "wall") continue; // Neigbour is a wall
    if (visited[rr][cc]) continue; // Already visited

    visited[rr][cc] = true;
    res.push(neighbour);
    prev[`${rr}:${cc}`] = table[r][c];
  }

  return res;
}

export const reconstructPath = (start, target, prev) => {
  let path = [];
  for (let at = target; at !== undefined; at = prev[`${at.row}:${at.col}`]) {
    path.push(at);
  }
  path.reverse();
  if (start.is_same(path[0])) return path;
  return [];
};

export class PriorityQueue {
  /* Priority Queue Implementation */
  constructor() {
    /* Create empty PQ */
    this.PQ = [];
    this.map = {};
  }
  size() {
    /* Return number of elements in the pq */
    return this.PQ.length;
  }

  leftChildIdx(idx) {
    /* Return the index of the left child */
    let childIdx = 2 * idx + 1;
    return childIdx;
  }

  rightChildIdx(idx) {
    /* Return the index of the right child */
    let childIdx = 2 * idx + 2;
    return childIdx;
  }

  parentIdx(idx) {
    /* Return the index of the parent element */
    return Math.floor((idx - 1) / 2);
  }

  isEmpty() {
    /* Return true if the pq is empty */
    return this.size() === 0;
  }

  swim(k) {
    /* Swim the element at index k to correct place in the PQ */
    let parent = this.parentIdx(k);
    while (k > 0 && this.less(k, parent)) {
      this.swap(parent, k);
      k = parent;
      parent = this.parentIdx(k);
    }
  }

  add(val) {
    /* Add val to the PQ */
    this.PQ.push(val);
    if (!this.map[val[0]]) this.map[val[0]] = [this.size() - 1];
    else this.map[val[0]].push(this.size() - 1);
    this.swim(this.size() - 1);
  }

  poll() {
    /* Remove and return the first element in the PQ */
    return this.removeAt(0);
  }

  swap(i, j) {
    /* Swap elements at indexes i and j in the PQ */
    let temp = this.PQ[i];
    this.map[this.PQ[i][0]] = j;
    this.map[this.PQ[j][0]] = i;
    this.PQ[i] = this.PQ[j];
    this.PQ[j] = temp;
  }

  less(i, j) {
    /* Return true if the element at index i is smaller than element in the index j */
    return this.PQ[i][1] <= this.PQ[j][1];
  }

  sink(k) {
    /* Sink the element at index k to correct place in the PQ */
    while (true) {
      let left = this.leftChildIdx(k);
      let right = this.rightChildIdx(k);
      let smallest = left;

      if (right < this.size() && this.less(right, left)) smallest = right;
      if (left >= this.size() || this.less(k, smallest)) break;

      this.swap(smallest, k);
      k = smallest;
    }
  }

  remove(el) {
    /* Remove el from the PQ and return true if element was in PQ */
    let idx = this.map[el];
    if (idx) this.removeAt(idx);
    return Boolean(idx);
  }

  removeAt(i) {
    /* Remove and return element at index i in the PQ */
    if (this.isEmpty()) return null;
    let removed_data = this.PQ[i];
    this.swap(i, this.size() - 1);
    this.PQ.pop();
    delete this.map[removed_data[0]];

    if (i === this.size()) return removed_data;
    let el = this.PQ[i][0];
    this.sink(i);
    if (this.PQ[i][0] === el) this.swim(i);
    return removed_data;
  }
}

export function convertToAdjList(grid, R, C) {
  let adjList = {};

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, 1, -1];

  const explore_neighbours = (r, c) => {
    let n = [];
    for (let i = 0; i < 4; i++) {
      let rr = r + dr[i];
      let cc = c + dc[i];
      if (rr < 0 || cc < 0) continue;
      if (rr >= R || cc >= C) continue;
      if (grid[rr][cc].type === "wall") continue;
      n.push([`${rr}:${cc}`, grid[rr][cc].weight]);
    }
    return n;
  };

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      adjList[`${i}:${j}`] = explore_neighbours(i, j);
    }
  }

  return adjList;
}
