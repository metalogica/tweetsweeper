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
  Easy = 1,
  Regular = 5,
  Hard = 10,
  Impossible = 1000,
}

export interface BoardState {
  gameProgress: GameProgress;
  boardSize: BoardSize;
  numberOfMines: NumberOfMines;
  grid?: [CellState[], CellState[]];
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
    [2,2],
    [1,2]
  ]
}
