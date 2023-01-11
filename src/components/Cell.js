import Image from "./Image";

function Cell(props) {
  return (
    <div className={`Cell ${props.cell.type}`}>
      {(props.cell.isStart || props.cell.isTarget) && (
        <Image cell={props.cell} />
      )}
    </div>
  );
}

export default Cell;
