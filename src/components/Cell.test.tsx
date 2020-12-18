import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import _ from 'lodash'
import { CellState } from '../globals'
import Cell from './Cell'

describe('Cell State should determine the cell appearance', () => {
  it('should render an unopened skin', () => {
    const cellState: CellState = {
      location: [0, 0],
      clicked: false,
      mine: true,
      flagged: false,
      neighbors: 0,
    } 

    render(<Cell {...cellState}/>)

    const cell = screen.getByTestId(`${cellState.location[0]}-${cellState.location[1]}`)

    expect(cell).toHaveStyle({ backgroundImage: `url(/images/retro/unopened.svg)`})
  })

  it('should render a mine skin', () => {
    const cellState: CellState = {
      location: [0, 0],
      clicked: true,
      mine: true,
      flagged: false,
      neighbors: 1,
    } 

    render(<Cell {...cellState}/>)

    const cell = screen.getByTestId(`${cellState.location[0]}-${cellState.location[1]}`)

    expect(cell).toHaveStyle({ backgroundImage: `url(/images/retro/mine.png)`})
  })

  it('should render a flag skin', () => {
    const cellState: CellState = {
      location: [0, 0],
      clicked: false,
      mine: true,
      flagged: true,
      neighbors: 0,
    } 

    render(<Cell {...cellState}/>)

    const cell = screen.getByTestId(`${cellState.location[0]}-${cellState.location[1]}`)

    expect(cell).toHaveStyle({ backgroundImage: `url(/images/retro/flag.svg)`})
  })

  it('should render an empty skin', () => {
    const cellState: CellState = {
      location: [0, 0],
      clicked: true,
      mine: false,
      flagged: false,
      neighbors: 0,
    } 

    render(<Cell {...cellState}/>)

    const cell = screen.getByTestId(`${cellState.location[0]}-${cellState.location[1]}`)

    expect(cell).toHaveStyle({ backgroundImage: `url(/images/retro/opened.svg)`})
  })
  

  test('should render neighbor skins', () => {
    const randInt = _.random(1, 9)

    const cellState: CellState = {
      location: [0, 0],
      clicked: true,
      mine: false,
      flagged: false,
      neighbors: randInt,
    } 

    render(<Cell {...cellState}/>)

    const cell = screen.getByTestId(`${cellState.location[0]}-${cellState.location[1]}`)

    expect(cell).toHaveStyle({ backgroundImage: `url(/images/retro/${randInt}.svg)`}) 
  })
})
