import { Cell } from './Cell'
import { useState, useEffect } from 'react'

type Props = {
  guess: string
  onDelete: () => void
}

export const CurrentRow = ({ guess, onDelete }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(5 - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell onDelete={onDelete} key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
