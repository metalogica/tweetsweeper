// Cell Globals
export interface CellState {
  location: [number, number];
  clicked: boolean;
  mine: boolean;
  flagged: boolean;
  neighbors: number;
}

// Board Globals
export enum GameProgress {
  NewGame = 'newGame',
  InProgress = 'inProgress',
  Won = 'won',
  Lost = 'lost',
}

export enum BoardSize {
  Easy = 5,
  Regular = 10,
  Hard = 20,
}

export enum NumberOfMines {
  Easy = 1,
  Regular = 5,
  Hard = 10,
  Impossible = 1000,
}

export interface BoardState {
  gameProgress: GameProgress;
  boardSize: BoardSize;
  numberOfMines: NumberOfMines;
  grid?: [CellState[], CellState[]]
}

export const defaultBoardState: BoardState = {
  gameProgress: GameProgress.NewGame,
  boardSize: BoardSize.Easy,
  numberOfMines: NumberOfMines.Easy,
}

export const regularBoardState: BoardState = {
  gameProgress: GameProgress.NewGame,
  boardSize: BoardSize.Regular,
  numberOfMines: NumberOfMines.Regular,
}

export const hardBoardState: BoardState = {
  gameProgress: GameProgress.NewGame,
  boardSize: BoardSize.Hard,
  numberOfMines: NumberOfMines.Hard,
}

// used only in Board.test.tsx
export const mineBoardState: BoardState = {
  gameProgress: GameProgress.InProgress,
  boardSize: BoardSize.Easy,
  numberOfMines: NumberOfMines.Impossible,
}
