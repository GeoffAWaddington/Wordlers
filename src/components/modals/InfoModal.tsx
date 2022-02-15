import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play this daily word game" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Tap the keyboard to add a letter
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Tap the letter to remove it
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        When you have all 5 letters, press Enter to try your guess
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        ----------------------------------------------------
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        You have 6 tries. After each guess, the color of the tiles will
        change to show how close the guess is to the word of the day.
      </p>
      <div className="flex justify-center mb-1 mt-4">
        <Cell value="W" status="correct" />
        <Cell value="O" />
        <Cell value="R" />
        <Cell value="L" />
        <Cell value="D" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter W is in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="E" />
        <Cell value="Q"/>
        <Cell value="U" />
        <Cell value="A" />
        <Cell value="L" status="present" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter L is in the word but in the wrong spot(s).
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="U" />
        <Cell value="N" />
        <Cell value="I" status="absent" />
        <Cell value="T" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter I is not in the word.
      </p>
    </BaseModal>
  )
}
