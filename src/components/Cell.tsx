import { CellState } from '../globals'
import './Cell.scss'

function Cell({ location, clicked, mine, flagged, neighbors }: CellState) {
  return(
    <>
    {
      !clicked && !flagged && (
        <div className='cell' data-testid='cell' style={{backgroundImage: `url('/images/retro/unopened.svg')`}}>
        </div>
      )
    }
    {
      clicked && mine && (
        <div className='cell' data-testid='cell' style={{backgroundImage: `url('/images/retro/mine.png')`}}>
        </div>
      )
    }
    {
      flagged && (
        <div className='cell' data-testid='cell' style={{backgroundImage: `url('/images/retro/flag.svg')`}}>
        </div>
      )
    }
    </>
  )
}

export default Cell;
