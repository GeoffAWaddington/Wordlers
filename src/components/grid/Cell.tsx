import { CharStatus } from '../../lib/statuses';
import classnames from 'classnames';
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, Reorder } from "framer-motion";
import move from "array-move";

type Props = {
  letter?: string
  status?: CharStatus
  onDeleteLetter?: (index: number) => void
  index?: number
}

export const Cell = ({ letter, status, onDeleteLetter, index}: Props) => {

   const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-black text-xl rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': letter && !status,
      'bg-slate-200 dark:bg-slate-400 text-black border-slate-400 dark:border-slate-700':
        status === 'absent',
      'bg-green-500 text-white border-green-500': status === 'correct',
      'bg-yellow-300 dark:bg-yellow-350 text-black dark:text-black border-yellow-300 dark:border-yellow-350':
        status === 'present',
      'cell-animation': !!letter,
    }
  )

  const onClick = () => {
    if(onDeleteLetter !== undefined && index !== undefined)
      onDeleteLetter(index);
  }

  return <motion.li 
    className={classes}
    onTap={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 1.12 }}
    dragElastic={1}
  >{letter}</motion.li>
}
