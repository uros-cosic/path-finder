import { Cell } from "../util/Cell";
import { FaChevronRight, FaBullseye } from "react-icons/fa";

export default function Icon({ cell }) {
  const icon_style = {
    height: `${Cell.CELL_SIZE - 1}px`,
    width: `${Cell.CELL_SIZE - 1}px`,
  };

  return (
    <>
      {cell.isStart ? (
        <FaChevronRight style={icon_style} />
      ) : (
        <FaBullseye style={icon_style} />
      )}
    </>
  );
}
