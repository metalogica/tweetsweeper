import React, { useEffect } from 'react'
import { BoardState } from '../globals'

export default function TopPanel({gameProgress, boardSize, numberOfMines, mineMap, flags, maxFlags} : BoardState) {
  const [time, setTime] = React.useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTime(time + 1), 1000)
    return () => clearInterval(interval)
  }, [time])
  
  return (
    <>
      <div data-testid='topPanel'>
        <Avatar/>
        <div data-testid='timer' >Timer: {time}</div>
      </div>
    </>
  )
}

function Avatar() {
  return(
    <>
      <p>Avatar</p>
      <img src="" alt=""/>
    </>
  )
}
