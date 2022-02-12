import { Cell } from './Cell'

type Props = {
  guess: string
  onDeleteLetter: (index: number) => void
}

export const CurrentRow = ({ guess, onDeleteLetter }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(5 - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">

      {splitGuess.map((letter, i) => (letter !== ' ' ? <Cell onDeleteLetter={onDeleteLetter} index={i} key={i} value={letter} /> : <Cell key={i} /> 
      ))}

      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}

    </div>
  )
}
