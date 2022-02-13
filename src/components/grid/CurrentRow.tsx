import { Cell } from './Cell'
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  guess: string
  onDeleteLetter: (index: number) => void
}

export const CurrentRow = ({ guess, onDeleteLetter }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(5 - splitGuess.length))

  return (
    <li className="flex justify-center mb-1">



      {splitGuess.map((letter, i) => (letter !== ' ' ? 
      <motion.div drag="x"> 
      <Cell onDeleteLetter={onDeleteLetter} index={i} key={i} value={letter} /> 
      </motion.div> 
      
      : <Cell key={i} /> 
      ))}

      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}

    </li>
  )
}
