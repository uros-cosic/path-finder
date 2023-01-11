import { Cell } from "../util/Cell";
import start from "../data/img/start.png";
import target from "../data/img/target.png";

export default function Image({ cell }) {
  return (
    <img
      src={cell.isStart ? start : target}
      alt={cell.isStart ? "start_node" : "target_node"}
      className="Image"
      style={{
        height: `${Cell.CELL_SIZE}px`,
        width: `${Cell.CELL_SIZE}px`,
      }}
    />
  );
}
