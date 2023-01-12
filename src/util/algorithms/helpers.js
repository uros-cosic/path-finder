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
