interface CellState {
  location: [number, number];
  clicked: boolean;
  mine: boolean;
  flagged: boolean;
  neighbors?: number;
}

function Cell() {
  return(
    <div>
      CELL
    </div>
  )
}

export default Cell;
