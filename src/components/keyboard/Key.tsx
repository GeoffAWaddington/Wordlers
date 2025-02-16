import { ReactNode } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
  isEasyMode: boolean
}

export const Key = ({
  children,
  status,
  width = 38,
  value,
  onClick,
  isEasyMode,
}: Props) => {
  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-black text-xl cursor-pointer select-none dark:text-white',
    {
      'bg-slate-400 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400':
        !status,
      'bg-slate-300 text-transparent dark:bg-slate-400 dark:text-transparent': status === 'absent' && ! isEasyMode,
      'bg-green-500 dark:bg-green-550 hover:bg-green-600 active:bg-green-700 text-white':
        status === 'correct',
      'bg-yellow-300 hover:bg-yellow-300 active:bg-yellow-300 dark:bg-yellow-350 text-black dark:text-black':
        status === 'present',
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => 
  {
    if(isEasyMode)
    {
      onClick(value)
      event.currentTarget.blur()
    }
    else if(status !== 'absent')
    {
      onClick(value)
      event.currentTarget.blur()
    }
  }

  return (
    <button
      style={{ width: `${width}px`, height: '45px' }}
      className={classes}
      onClick={handleClick}
    >
      {children || value}
    </button>
  )
}
