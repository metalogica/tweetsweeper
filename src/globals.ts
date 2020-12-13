export interface CellState {
  location: [number, number];
  clicked: boolean;
  mine: boolean;
  flagged: boolean;
  neighbors: number;
}

export interface BoardState { 
  table?: [CellState[],CellState[]];
}
