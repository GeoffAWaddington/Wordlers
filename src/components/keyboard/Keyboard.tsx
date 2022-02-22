import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ENTER_TEXT } from '../../constants/strings'

type Props = {
  onChar: (value: string) => void
  onEnter: () => void
  guesses: string[]
  isEasyMode: boolean
}

export const Keyboard = ({ onChar, onEnter, guesses, isEasyMode }: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1 mt-9">
        <Key value="Q" onClick={onClick} status={charStatuses['Q']} isEasyMode={isEasyMode} />
        <Key value="W" onClick={onClick} status={charStatuses['W']} isEasyMode={isEasyMode} />
        <Key value="E" onClick={onClick} status={charStatuses['E']} isEasyMode={isEasyMode} />
        <Key value="R" onClick={onClick} status={charStatuses['R']} isEasyMode={isEasyMode} />
        <Key value="T" onClick={onClick} status={charStatuses['T']} isEasyMode={isEasyMode} />
        <Key value="Y" onClick={onClick} status={charStatuses['Y']} isEasyMode={isEasyMode} />
        <Key value="U" onClick={onClick} status={charStatuses['U']} isEasyMode={isEasyMode} />
        <Key value="I" onClick={onClick} status={charStatuses['I']} isEasyMode={isEasyMode} />
        <Key value="O" onClick={onClick} status={charStatuses['O']} isEasyMode={isEasyMode} />
        <Key value="P" onClick={onClick} status={charStatuses['P']} isEasyMode={isEasyMode} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="A" onClick={onClick} status={charStatuses['A']} isEasyMode={isEasyMode} />
        <Key value="S" onClick={onClick} status={charStatuses['S']} isEasyMode={isEasyMode} />
        <Key value="D" onClick={onClick} status={charStatuses['D']} isEasyMode={isEasyMode} />
        <Key value="F" onClick={onClick} status={charStatuses['F']} isEasyMode={isEasyMode} />
        <Key value="G" onClick={onClick} status={charStatuses['G']} isEasyMode={isEasyMode} />
        <Key value="H" onClick={onClick} status={charStatuses['H']} isEasyMode={isEasyMode} />
        <Key value="J" onClick={onClick} status={charStatuses['J']} isEasyMode={isEasyMode} />
        <Key value="K" onClick={onClick} status={charStatuses['K']} isEasyMode={isEasyMode} />
        <Key value="L" onClick={onClick} status={charStatuses['L']} isEasyMode={isEasyMode} />
      </div>
      <div className="flex justify-center">
        <Key value="Z" onClick={onClick} status={charStatuses['Z']} isEasyMode={isEasyMode} />
        <Key value="X" onClick={onClick} status={charStatuses['X']} isEasyMode={isEasyMode} />
        <Key value="C" onClick={onClick} status={charStatuses['C']} isEasyMode={isEasyMode} />
        <Key value="V" onClick={onClick} status={charStatuses['V']} isEasyMode={isEasyMode} />
        <Key value="B" onClick={onClick} status={charStatuses['B']} isEasyMode={isEasyMode} />
        <Key value="N" onClick={onClick} status={charStatuses['N']} isEasyMode={isEasyMode} />
        <Key value="M" onClick={onClick} status={charStatuses['M']} isEasyMode={isEasyMode} />
        <Key width={65.4}
          value="ENTER"
          onClick={onClick}
          isEasyMode={isEasyMode}
        >

          {ENTER_TEXT}
        </Key>

      </div>
    </div>
  )
}
