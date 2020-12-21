import { BoardSize, BoardState, GameProgress, NumberOfMines } from '../globals'

export default class Board implements BoardState {
  gameProgress: GameProgress;
  boardSize: BoardSize;
  numberOfMines: NumberOfMines;
  mineMap: [number, number][]

  constructor({ gameProgress, boardSize, numberOfMines, mineMap } : BoardState) {
    this.gameProgress = gameProgress;
    this.boardSize = boardSize;
    this.numberOfMines = numberOfMines;
    this.mineMap = mineMap;
  }
}
