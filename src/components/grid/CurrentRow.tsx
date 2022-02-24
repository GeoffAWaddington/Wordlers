import { useEffect, useState, useRef } from "react";
import { Cell } from './Cell'
import { motion, Reorder } from "framer-motion";
import move from "array-move";

type Props = {
  guess: string
  onDeleteLetter: (index: number) => void
}

export const CurrentRow = ({ guess, onDeleteLetter }: Props) => {

  const splitGuess = guess.split('')
  for (let i = splitGuess.length; i < 5; i++)
    splitGuess.push(' ')

  return (
    <div className="flex justify-center mb-1">

      {splitGuess.map((letter, i) => (
        letter !== ' ' ?

          <Cell
            onDeleteLetter={onDeleteLetter}
            index={i}
            key={i}
            letter={letter}
          />

          :

          <Cell key={i} />
      ))}
    </div>
  )
}
