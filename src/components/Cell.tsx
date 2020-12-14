import { CellState } from '../globals'

function Cell(props: any, { location, clicked, mine, flagged, neighbors }: CellState) {
  return(
    <div data-testid='cell' className={clicked ? 'clicked' : 'unclicked'}>
      CELL
    </div>
  )
}

export default Cell;
