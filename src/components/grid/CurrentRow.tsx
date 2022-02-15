import { useEffect, useState, useRef } from "react";
import { Cell } from './Cell'
import { motion } from "framer-motion";
import { findIndex, Position } from "./find-index";
import move from "array-move";

type Props = {
  guess: string
  onDeleteLetter: (index: number) => void
}

export const CurrentRow = ({ guess, onDeleteLetter }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(5 - splitGuess.length))

  // We need to collect an array of height and position data for all of this component's
  // `Item` children, so we can later us that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef<Position[]>([]).current;
  const setPosition = (i: number, offset: Position) => (positions[i] = offset);

  // Find the ideal index for a dragging item based on its position in the array, and its
  // current drag offset. If it's different to its current index, we swap this item with that
  // sibling.
  const moveItem = (i: number, dragOffset: number) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    //if (targetIndex !== i) setColors(move(colors, i, targetIndex));
  };

  return (
    <li className="flex justify-center mb-1">



      {splitGuess.map((letter, i) => (letter !== ' ' ? 
      <motion.div> 
      <Cell 
        onDeleteLetter={onDeleteLetter} 
        index={i} 
        key={i} 
        value={letter}
        i={i}
        setPosition={setPosition}
        moveItem={moveItem}
       /> 
      </motion.div> 
      
      : <Cell key={i} /> 
      ))}

      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}

    </li>
  )
}
