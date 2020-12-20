import { render, screen, fireEvent } from '@testing-library/react';
import Board from './Board'
import { 
  defaultBoardState,
  regularBoardState, 
  hardBoardState, 
  testBoardState,
  completedTestBoardState,
  CellState
} from '../globals'

describe('buildBoard()', () => {
  it('should build a new board and store it in state if it is a new game', () => {
    render(<Board {...defaultBoardState}/>)

    const renderedBoard = screen.getByTestId('board')

    expect(renderedBoard.children.length).toEqual(25)
  })

  it('should not build a new board if a game is in progress', () => {
  })

  it('should build a 5x5 grid with 1 mine for an Easy game.', () => {
    render(<Board {...defaultBoardState}/>)

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

    // loop through the expected end-of-game-grid
    const gridLength = testBoardState.boardSize

    for (let row = 0; row < gridLength; row ++) {
      for (let col = 0; col < gridLength; col ++) {
        // expect the style of the actual grid matches the test spec grid
        const actualCell = screen.getByTestId(`${row}-${col}`)
        const expectedCell = completedTestBoardState.grid[row][col] 
        
      }
    }
  })

  it('should end the game if the user clicks on a mine', () => {

  })

  it('should render the entire revealed board when the game is over', () => {
    const mineCell = screen.getByTestId('2-2')
    const unclickedCell = screen.getByTestId('0-0')

    expect(mineCell).toHaveStyle({backgroundImage: `url('/images/retro/unopened.svg')`})
    expect(unclickedCell).toHaveStyle({backgroundImage: `url('/images/retro/unopened.svg')`})

    fireEvent.click(mineCell)

    expect(mineCell).toHaveStyle({backgroundImage: `url('/images/retro/mine.svg')`})
    expect(unclickedCell).toHaveStyle({backgroundImage: `url('/images/retro/mine.svg')`})
  })

  it('should end the game if the user flags all mines on the board', () => {

  })
})
