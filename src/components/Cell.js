import Icon from "./Icon";

function Cell(props) {
  return (
    <div className={`Cell ${props.cell.type}`}>
      {(props.cell.isStart || props.cell.isTarget) && (
        <Icon cell={props.cell} />
      )}
    </div>
  );
}

export default Cell;
