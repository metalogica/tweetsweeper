import { render, screen, fireEvent } from '@testing-library/react';
import Board from './Board'
import { 
  easyBoardState,
  regularBoardState, 
  hardBoardState, 
  testBoardState,
  failedTestBoardState,
  completedTestBoardState,
  BoardState
} from '../globals'

const assertTestBoardStateIsValid = function(board: BoardState) {
  const gridLength = board.boardSize

  for (let row = 0; row < gridLength; row ++) {
    for (let col = 0; col < gridLength; col ++) {
      // expect the style of the actual grid matches the test spec grid
      let actualCell = screen.getByTestId(`${row}-${col}`)
      let expectedCell = board.grid[row][col]

      expect(actualCell.style.backgroundImage).toEqual(expectedCell.style.backgroundImage)
    }
  }
}

describe('buildBoard()', () => {
  it('should build a new board and store it in state if it is a new game', () => {
    render(<Board {...easyBoardState}/>)

    const renderedBoard = screen.getByTestId('board')

    expect(renderedBoard.children.length).toEqual(25)
  })

  it('should not build a new board if a game is in progress', () => {
  })

  it('should build a 5x5 grid with 1 mine for an Easy game.', () => {
    render(<Board {...easyBoardState}/>)

    const renderedBoard = screen.getByTestId('board')

    expect(renderedBoard.children.length).toEqual(25)
  })

  it('should build a 10x10 grid with 5 mines for an Regular game.', () => {
    render(<Board {...regularBoardState}/>)

    const renderedBoard = screen.getByTestId('board')

    expect(renderedBoard.children.length).toEqual(100)
  })

  it('should build a 20x20 grid with 10 mines for an Hard game.', () => {
    render(<Board {...hardBoardState}/>)

    const renderedBoard = screen.getByTestId('board')

    expect(renderedBoard.children.length).toEqual(400)
  })
})

describe('clickBoard()', () => {
  beforeEach(() =>{
    render(<Board {...testBoardState}/>)
  })

  it('should recursively open all cells that are not mines or nieighbors of mines if a user clicks on a blank cell', () => {
    const topLeftCell = screen.getByTestId('0-0')
    fireEvent.click(topLeftCell)

    assertTestBoardStateIsValid(failedTestBoardState)
  })

  it('should render the entire revealed board when the user clicks on a mine', () => {
    const mineCell = screen.getByTestId('2-1')
    const unclickedCell = screen.getByTestId('0-0')

    expect(mineCell).toHaveStyle({backgroundImage: `url(/images/retro/unopened.svg)`})
    expect(unclickedCell).toHaveStyle({backgroundImage: `url(/images/retro/unopened.svg)`})

    fireEvent.click(mineCell)

    expect(mineCell.style.backgroundImage).toEqual(`url(/images/retro/mine.png)`)
    expect(unclickedCell.style.backgroundImage).toEqual(`url(/images/retro/opened.svg)`)
  })

  it('should end the game if the user flags all mines on the board', () => {
    const mineCellOne = screen.getByTestId('2-1')
    const mineCellTwo = screen.getByTestId('3-2')

    // right click both mine cells
    fireEvent.contextMenu(mineCellOne)
    fireEvent.contextMenu(mineCellTwo)
    
    // the entire board should be revealed
    assertTestBoardStateIsValid(completedTestBoardState)

    // a button should appear that allows the user to restart the game
    const gameCompleteButton = screen.getByRole('button')
    expect(gameCompleteButton).toHaveTextContent(/Play again\?/i)
  })

  it('should end the game if the user clicks on a mine', () => {
    // user clicks on mine
    // the entire board should be revealed
    // a button should appear that allows the user to restart the game
    // the entire board should be unrevealed again
  })
})
