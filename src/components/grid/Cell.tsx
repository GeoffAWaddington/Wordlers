import { CharStatus } from '../../lib/statuses';
import classnames from 'classnames';
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { findIndex, Position } from "./find-index";
import move from "array-move";

type Props = {
  value?: string
  status?: CharStatus
  onDeleteLetter?: (index: number) => void
  index?: number
  setPosition?: (i: number, offset: Position) => void
  moveItem?: any
  i?: number
}

export const Cell = ({ value, status, onDeleteLetter, index, setPosition, moveItem, i  }: Props) => {
  const [isDragging, setIsDragging] = useState(false);

   // We'll use a `ref` to access the DOM element that the `motion.li` produces.
  // This will allow us to measure its height and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref = useRef(null);

  // By manually creating a reference to `dragOriginY` we can manipulate this value
  // if the user is dragging this DOM element while the drag gesture is active to
  // compensate for any movement as the items are re-positioned.
  const dragOriginX = useMotionValue(0);
/*
  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    setPosition(i, {
      width: ref.current.offsetWidth,
      left: ref.current.offsetLeft
    });
  });
*/
  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-black text-xl rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'bg-slate-200 dark:bg-slate-400 text-black border-slate-400 dark:border-slate-700':
        status === 'absent',
      'bg-green-500 text-white border-green-500': status === 'correct',
      'bg-yellow-300 dark:bg-yellow-350 text-black dark:text-black border-yellow-300 dark:border-yellow-350':
        status === 'present',
      'cell-animation': !!value,
    }
  )

// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 }
};

  const onClick = () => {
    if(onDeleteLetter !== undefined && index !== undefined)
      onDeleteLetter(index);
  }

  return <motion.li 
    ref={ref}
    className={classes}
    onTap={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 1.12 }}
    animate={isDragging ? onTop : flat}
    //dragOriginX={dragOriginX}
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={1}
    onDragStart={() => setIsDragging(true)}
    onDragEnd={() => setIsDragging(false)}
    /*
    positionTransition={({ delta }) => {
      if (isDragging) {
        // If we're dragging, we want to "undo" the items movement within the list
        // by manipulating its dragOriginY. This will keep the item under the cursor,
        // even though it's jumping around the DOM.
        dragOriginX.set(dragOriginX.get() + delta.x);
      }

      // If `positionTransition` is a function and returns `false`, it's telling
      // Motion not to animate from its old position into its new one. If we're
      // dragging, we don't want any animation to occur.
      return !isDragging;
    }}
    */
  >{value}</motion.li>
}
