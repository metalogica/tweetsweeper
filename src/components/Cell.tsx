import { CellState, GameProgress } from '../globals'
import { useGameContext } from '../contexts'
import './Cell.scss'

function Cell({ location, clicked, mine, flagged, neighbors, updateBoard }: CellState) {
  const style: object = setStyle(location, clicked, mine, flagged, neighbors)
  const { setRightClickHeldDown, gameProgress } = useGameContext()

  function rightClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) {
    event.preventDefault()
    if (gameProgress === GameProgress.InProgress || gameProgress === GameProgress.BeginNewGame || gameProgress === GameProgress.NewGame) {
      flagged = true
      updateBoard && updateBoard(location[0], location[1], true)
    }
  }

  function handleLeftClick() {
    const cellNotFlagged = !flagged
    const gameIsNotLost = gameProgress !== GameProgress.Lost
    const gameIsNotWon = gameProgress !== GameProgress.Won
    if (cellNotFlagged && gameIsNotLost && gameIsNotWon) { 
      updateBoard ? updateBoard(location[0], location[1]) : console.error('unable to upate cell')
    }
  }

  return(
    <div  className='cell' 
          data-testid={`${location[0]}-${location[1]}`} 
          style={style}
          onContextMenu={(event) => rightClick(event, location[0], location[1])}
          onClick={() => handleLeftClick() }
          onMouseDown={() => gameProgress !== GameProgress.Lost && setRightClickHeldDown(true)}
          onMouseUp={() => gameProgress !== GameProgress.Lost && setRightClickHeldDown(false)}
    >
    </div>
  )
}

function setStyle(location: [number, number], clicked: boolean, mine: boolean, flagged: boolean, neighbors: number) {
  const skin = { 
    backgroundImage: `url(/images/retro/unopened.svg)`,
    gridArea: `${location[0]}-${location[1]}`
  }

  if (flagged) {
    skin.backgroundImage = `url(/images/retro/flag.svg)`
  } else if (clicked && mine) {
    skin.backgroundImage = `url(/images/retro/mine.png)`
  } else if (clicked && !mine && !flagged && neighbors === 0) {
    skin.backgroundImage = `url(/images/retro/opened.svg)`
  } else if (clicked && !mine && !flagged && neighbors > 0) {
    skin.backgroundImage = `url(/images/retro/${neighbors}.svg)`
  }

  return skin;
}

export default Cell;
