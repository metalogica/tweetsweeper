import { createContext, useContext } from 'react'
import _ from 'lodash'

// Cell Globals
// enum CellSkin {
//   unclicked = '/images/retro/flag.svg',
//   mine = '/images/retro/mine.png',
//   flag = '/images/retro/flag.svg',
//   blank = '/images/retro/blank.svg',
//   one = '/images/retro/1.svg',
//   two = '/images/retro/2.svg',
//   three = '/images/retro/3.svg',
//   four = '/images/retro/4.svg',
//   five = '/images/retro/5.svg',
//   six = '/images/retro/6.svg',
//   seven = '/images/retro/7.svg',
//   eight = '/images/retro/8.svg',
// }

export interface CellState {
  location: [number, number];
  clicked: boolean;
  mine: boolean;
  flagged: boolean;
  neighbors: number;
  style?: object;
  setStyle?: (cell: CellState) => object
  updateBoard?: (j: number, i:number, rightClick?: boolean) => void;
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
    style.backgroundImage = `url(/images/retro/${neighbors}.svg)`
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

// TODO: Refactor `setCell`, `openedCell`, `closedCell` and `completedTestBoardState`; these exist only in Board.test.tsx 
export const setCell = (cell: CellState, location: [number, number], neighbors : number, mine?: boolean) => {
  cell.location = location
  cell.neighbors = neighbors
  cell.mine = mine ? true : false
  cell.style = setCellStyle(cell)
  return cell
}

export const openedCell: CellState = {
  location: [0, 0],
  clicked: true,
  mine: false,
  flagged: false,
  neighbors: 0,
}

export const closedCell: CellState = {
  location: [0, 0],
  clicked: false,
  mine: false,
  flagged: false,
  neighbors: 0,
}

class TestCell implements CellState {
  location: [number, number];
  clicked: boolean;
  flagged: boolean;
  mine: boolean;
  neighbors: number;
  style?: object;

  constructor({location, clicked, mine, flagged, neighbors} : CellState) {
    this.location = location;
    this.clicked = clicked;
    this.mine = mine;
    this.flagged = flagged;
    this.neighbors = neighbors;
    this.style = this.setSkin()
  }

  setSkin() {
    return setCellStyle(this)
  }
}

export const failedTestBoardState: BoardState = {
  gameProgress: GameProgress.Lost,
  boardSize: BoardSize.Test,
  numberOfMines: NumberOfMines.Test,
  mineMap: [
    [2,1],
    [3,2]
  ],
  grid: [
    [ 
      new TestCell({ location: [0,0], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,1], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,2], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,3], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [1,0], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [1,1], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [1,2], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [1,3], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [1,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [2,0], clicked: false, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [2,1], clicked: false, mine: true, flagged: false, neighbors: 1}),
      new TestCell({ location: [2,2], clicked: true, mine: false, flagged: false, neighbors: 2}),
      new TestCell({ location: [2,3], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [2,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [3,0], clicked: false, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [3,1], clicked: false, mine: true, flagged: false, neighbors: 2}),
      new TestCell({ location: [3,2], clicked: false, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [3,3], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [3,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [4,0], clicked: false, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [4,1], clicked: false, mine: true, flagged: false, neighbors: 1}),
      new TestCell({ location: [4,2], clicked: false, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [4,3], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [4,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ]
  ]
}

export const completedTestBoardState : BoardState = {
  gameProgress: GameProgress.Won,
  boardSize: BoardSize.Test,
  numberOfMines: NumberOfMines.Test,
  mineMap: [
    [2,1],
    [3,2]
  ],
  grid: [
    [ 
      new TestCell({ location: [0,0], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,1], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,2], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,3], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [1,0], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [1,1], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [1,2], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [1,3], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [1,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [2,0], clicked: false, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [2,1], clicked: false, mine: true, flagged: false, neighbors: 1}),
      new TestCell({ location: [2,2], clicked: true, mine: false, flagged: false, neighbors: 2}),
      new TestCell({ location: [2,3], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [2,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [3,0], clicked: false, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [3,1], clicked: false, mine: true, flagged: true, neighbors: 2}),
      new TestCell({ location: [3,2], clicked: false, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [3,3], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [3,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [4,0], clicked: false, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [4,1], clicked: false, mine: true, flagged: true, neighbors: 1}),
      new TestCell({ location: [4,2], clicked: false, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [4,3], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [4,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ]
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
