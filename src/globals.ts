import { createContext, useContext } from 'react'

// Cell Globals
enum CellSkin {
  unclicked = '/images/retro/flag.svg',
  mine = '/images/retro/mine.png',
  flag = '/images/retro/flag.svg',
  blank = '/images/retro/blank.svg',
  one = '/images/retro/1.svg',
  two = '/images/retro/2.svg',
  three = '/images/retro/3.svg',
  four = '/images/retro/4.svg',
  five = '/images/retro/5.svg',
  six = '/images/retro/6.svg',
  seven = '/images/retro/7.svg',
  eight = '/images/retro/8.svg',
}

export interface CellState {
  location: [number, number];
  clicked: boolean;
  mine: boolean;
  flagged: boolean;
  neighbors: number;
  style?: object;
  setStyle?: (cell: CellState) => object
  updateBoard?: (j: number, i:number) => void;
}

export const setCellStyle = ({location, clicked, mine, flagged, neighbors} : CellState) => {
  const style = { 
    backgroundImage: `url(/images/retro/unopened.svg)`,
    gridArea: `${location[0]}-${location[1]}`
  }

  if (flagged) {
    style.backgroundImage = `url(/images/retro/flag.svg)`
  } else if (clicked && mine) {
    style.backgroundImage = `url(/images/retro/mine.png)`
  } else if (clicked && !mine && !flagged && neighbors === 0) {
    style.backgroundImage = `url(/images/retro/opened.svg)`
  } else if (clicked && !mine && !flagged && neighbors > 0) {
    style.backgroundImage = `url(/images/retro/${neighbors}.svg'`
  }

  return style;
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

export const easyBoardState: BoardState = {
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
  cell.style = setCellStyle(cell)
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

// Board Context
export const BoardContext = createContext<BoardState>({
  gameProgress: GameProgress.NewGame,
  boardSize: BoardSize.Easy,
  numberOfMines: NumberOfMines.Easy,
  mineMap: [[-1,-1]],
})

export const useBoardContext = () => useContext(BoardContext)
