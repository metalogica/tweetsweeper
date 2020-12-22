import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import _ from 'lodash'
import { 
  CellState,
  testBoardState 
} from '../globals'
import Cell from './Cell'
import Board from './Board'

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

  it('should render neighbor skins', () => {
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

describe('Flagging functionality', () => {
  beforeEach(() =>{
    render(<Board {...testBoardState}/>)
  })

  it('should allow a user to flag a cell', () => {
    const cell = screen.getByTestId('0-0')

    expect(cell.style.backgroundImage).toEqual('url(/images/retro/unopened.svg)')

    fireEvent.contextMenu(cell)

    expect(cell.style.backgroundImage).toEqual('url(/images/retro/flag.svg)')
  })

  it('should only allow the user to flag unopened cells', () => {
    let cell = screen.getByTestId('0-0')
    
    fireEvent.click(cell)
    fireEvent.contextMenu(cell)
    
    // check you can't flag an opened cell
    expect(cell.style.backgroundImage).toEqual('url(/images/retro/opened.svg)')

    // check you cant flag a neighbor cell
    cell = screen.getByTestId('1-0')
    fireEvent.contextMenu(cell)
    expect(cell.style.backgroundImage).toEqual('url(/images/retro/1.svg)')
  })

  it('should allow a user to de-flag a currently flagged cell', () => {
    const cell = screen.getByTestId('0-0')
    
    fireEvent.contextMenu(cell)
    expect(cell.style.backgroundImage).toEqual('url(/images/retro/flag.svg)')

    fireEvent.contextMenu(cell)
    expect(cell.style.backgroundImage).toEqual('url(/images/retro/unopened.svg)')
  })

  it('should not allow a user to flag a cell if the maximum number of flags has been reached', () => {
    let cell = screen.getByTestId('0-0')
    fireEvent.contextMenu(cell)

    cell = screen.getByTestId('0-1')
    fireEvent.contextMenu(cell)

    cell = screen.getByTestId('0-2')
    fireEvent.contextMenu(cell)

    cell = screen.getByTestId('0-3')
    fireEvent.contextMenu(cell)

    expect(cell.style.backgroundImage).toEqual('url(/images/retro/unopened.svg)')
  })
})
