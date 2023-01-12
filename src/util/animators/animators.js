import { getAlgorithm } from "../util";

export function animate(
  alg_name,
  table,
  start,
  target,
  R,
  C,
  updateTable,
  setIsVisualizing,
  setVisualized,
  visSpeed = 1,
  pathSpeed = 10
) {
  /* Play the animation for visited nodes in order, and after that for path nodes */
  let { path, visitedOrdered } = getAlgorithm(alg_name).algorithm(
    table,
    start,
    target,
    R,
    C
  );

  for (let i = 0; i <= visitedOrdered.length; i++) {
    if (i === visitedOrdered.length) {
      setTimeout(() => {
        for (let i = 0; i <= path.length; i++) {
          setTimeout(() => {
            if (i === path.length) {
              setIsVisualizing(false);
              setVisualized(true);
              return;
            }
            const node = path[i];
            table[node.row][node.col].type = "pathAnimated";
            updateTable(table);
          }, pathSpeed * i);
        }
      }, visSpeed * i);
      return;
    }
    setTimeout(() => {
      const node = visitedOrdered[i];
      table[node.row][node.col].type = "visitedAnimated";
      updateTable(table);
    }, visSpeed * i);
  }
}
