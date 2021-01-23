import { useGameContext } from '../contexts'
import { GameProgress } from '../globals'

export default function ModalCompletion() {
  const { gameProgress } = useGameContext()



  return(
    <>
      {
        gameProgress === GameProgress.Won && (
          <div data-testid='modal-completion'>
            "Congratulations! You trumped Trumped lies! Play Again?"
          </div>
        )
      }
      {
        gameProgress === GameProgress.Lost && (
          <div data-testid='modal-completion'>
            "Dangit! Trump triumphed! Play again?"
          </div>
        )
      }
    </>
  )
}
