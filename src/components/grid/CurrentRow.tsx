import { useEffect, useState, useRef } from "react";
import { Cell } from './Cell'
import { motion, Reorder } from "framer-motion";
import move from "array-move";

const initialItems = ["N", "A", "U", "M", "H"];

type Props = {
  guess: string
  onDeleteLetter: (index: number) => void
}

export const CurrentRow = ({ guess, onDeleteLetter }: Props) => {
  const [items, setItems] = useState(initialItems);
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(5 - splitGuess.length))

  return (




    <ul className="flex justify-center mb-1">

      {splitGuess.map((letter, i) => (letter !== ' ' ? 


      <motion.div> 
      <Cell 
        onDeleteLetter={onDeleteLetter} 
        index={i} 
        key={i} 
        letter={letter}
       /> 
      </motion.div> 
      



      : 

      

      <motion.div> 
      <Cell key={i} /> 
      </motion.div> 



      ))}

      {emptyCells.map((_, i) => (
        <motion.div> 
        <Cell key={i} />
        </motion.div> 
      ))}



    </ul>


  )
}
