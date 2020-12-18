// Cell Globals
export interface CellState {
  location: [number, number];
  clicked: boolean;
  mine: boolean;
  flagged: boolean;
  neighbors: number;
  setGrid?: (j: number, i:number) => void;
}

// Board Globals
export enum GameProgress {
  NewGame = 'newGame',
  InProgress = 'inProgress',
  Won = 'won',
  Lost = 'lost',
}

export enum BoardSize {
  Test = 5,
  Easy = 5,
  Regular = 10,
  Hard = 20,
}

export enum NumberOfMines {
  Test = 0,
  Easy = 3,
  Regular = 12,
  Hard = 188,
}

export interface BoardState {
  gameProgress: GameProgress;
  boardSize: BoardSize;
  numberOfMines: NumberOfMines;
  grid?: CellState[][];
  mineMap: [number, number][];
}

// TODO: Consider refactoring these interface so you have one interface such that:
// { 
//   easy: {
//      gameProgress: gameProgress.Easy,
//      boardSize: boardSize.Easy,
//      numberOfMines: NumberOfMines.Easy
//   }
// }
export const defaultBoardState: BoardState = {
  gameProgress: GameProgress.NewGame,
  boardSize: BoardSize.Easy,
  numberOfMines: NumberOfMines.Easy,
  mineMap: [[-1,-1]],
}

export const regularBoardState: BoardState = {
  gameProgress: GameProgress.NewGame,
  boardSize: BoardSize.Regular,
  numberOfMines: NumberOfMines.Regular,
  mineMap: [[-1,-1]],
}

export const hardBoardState: BoardState = {
  gameProgress: GameProgress.NewGame,
  boardSize: BoardSize.Hard,
  numberOfMines: NumberOfMines.Hard,
  mineMap: [[-1,-1]],
}

// used only in Board.test.tsx
export const testBoardState: BoardState = {
  gameProgress: GameProgress.InProgress,
  boardSize: BoardSize.Test,
  numberOfMines: NumberOfMines.Test,
  mineMap: [
    [2,1],
    [3,2]
  ]
}

const setCell = (cell: CellState, location: [number, number], neighbors : number, mine?: boolean) => {
  cell.location = location
  cell.neighbors = neighbors
  cell.mine = mine ? true : false
  return cell
}

const openedCell: CellState = {
  location: [0, 0],
  clicked: true,
  mine: false,
  flagged: false,
  neighbors: 0,
}

export const completedTestBoardState: BoardState = {
  gameProgress: GameProgress.InProgress,
  boardSize: BoardSize.Test,
  numberOfMines: NumberOfMines.Test,
  mineMap: [
    [2,1],
    [3,2]
  ],
  grid: [
    [ setCell(openedCell, [0,0], 0), setCell(openedCell, [0,1], 0), setCell(openedCell, [0,2], 0), setCell(openedCell, [0,3], 0), setCell(openedCell, [0,4], 0) ],
    [ setCell(openedCell, [1,0], 1), setCell(openedCell, [1,1], 1), setCell(openedCell, [1,2], 1), setCell(openedCell, [1,3], 0), setCell(openedCell, [1,4], 0) ],
    [ setCell(openedCell, [2,0], 1), setCell(openedCell, [2,1], 1, true), setCell(openedCell, [2,2], 2), setCell(openedCell, [2,3], 1), setCell(openedCell, [2,4], 0) ],
    [ setCell(openedCell, [3,0], 1), setCell(openedCell, [3,1], 2), setCell(openedCell, [3,2], 1, true), setCell(openedCell, [3,3], 1), setCell(openedCell, [3,4], 0) ],
    [ setCell(openedCell, [4,0], 0), setCell(openedCell, [4,1], 1), setCell(openedCell, [4,2], 1), setCell(openedCell, [4,3], 1), setCell(openedCell, [4,4], 0) ]
  ]
}
