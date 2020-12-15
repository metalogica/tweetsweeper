import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { CellState } from '../globals'
import Cell from './Cell'

describe('Cell State should determine the cell appearance', () => {
  test('unclicked cells should be styled correctly', () => {
    const cellState: CellState = {
      location: [0, 0],
      clicked: false,
      mine: true,
      flagged: false,
      neighbors: 0,
    } 
  
    render(<Cell {...cellState}/>)

    const cell = screen.getByTestId('cell')

    expect(cell).toHaveClass('unclicked')
  })
})
