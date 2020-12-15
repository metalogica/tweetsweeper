import { render, screen } from '@testing-library/react';
import { defaultBoardState } from '../globals'
import Board from './Board'

test('it renders in the DOM', () => {
  render(<Board/>)
})

describe('buildBoard()', () => {
  it('should build a new board and store it in state if it is a new game', () => {
    // initialize game state
    // render Board
    render(<Board {...defaultBoardState}/>)

    // check the div structure of the board corresponds to 5x5 Cells
    const renderedBoard = screen.getByTestId('board')

    expect(renderedBoard.children.length).toEqual(25)
  })

  it('should not build a new board if a game is in progress', () => {

  })

  it('should build a 5x5 grid with 1 mine for an Easy game.', () => {
    
  })

  it('should build a 10x10 grid with 5 mines for an Regular game.', () => {
    
  })

  it('should build a 20x20 grid with 10 mines for an Hard game.', () => {
  
  })
})

describe('drawBoard()', () => {
  it('should render the entire revealed board when the game is over', () => {

  })

  it('should end the game if the user clicks on a mine', () => {

  })

  it('should end the game if the user flags all mines on the board', () => {

  })

  it('should recursively open all cells that are not mines or nieighbors of mines if a user clicks on a blank cell', () => {

  })
})
