import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'

export const shareStatus = (guesses: string[], lost: boolean, handleShare: any ) => {
  if(! navigator.canShare)
  {
    navigator.clipboard.writeText(`${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n` + generateEmojiGrid(guesses))
    handleShare();
  }
  else
    navigator.share({ title: `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n` + generateEmojiGrid(guesses) })
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
