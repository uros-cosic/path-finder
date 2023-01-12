import Icon from "./Icon";

function Cell(props) {
  const handleWeightClass = (weight) => {
    if (weight <= 25) return "lighter";
    if (weight <= 50) return "light";
    if (weight <= 75) return "bold";
    return "bolder";
  };
  return (
    <div
      className={`Cell ${props.cell.type}`}
      onMouseDown={() => props.onMousePress(props.cell.row, props.cell.col)}
      onMouseEnter={() => props.onMouseEnter(props.cell.row, props.cell.col)}
      onMouseUp={() => props.onMouseUp()}
    >
      {props.cell.isStart || props.cell.isTarget ? (
        <Icon cell={props.cell} />
      ) : (
        props.showWeights && (
          <div className={`weighted ${handleWeightClass(props.cell.weight)}`}>
            {props.cell.weight}
          </div>
        )
      )}
    </div>
  );
}

export default Cell;
