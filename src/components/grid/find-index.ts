import { clamp, distance } from "@popmotion/popcorn";

export interface Position {
  left: number;
  width: number;
}

// Prevent rapid reverse swapping
const buffer = 5;

export const findIndex = (
  i: number,
  xOffset: number,
  positions: Position[]
) => {
  let target = i;
  const { left, width } = positions[i];
  const right = left + width;

  // If moving right
  if (xOffset > 0) {
    const nextItem = positions[i + 1];
    if (nextItem === undefined) return i;

    const swapOffset =
      distance(right, nextItem.left + nextItem.width / 2) + buffer;
    if (xOffset > swapOffset) target = i + 1;

    // If moving left
  } else if (xOffset < 0) {
    const prevItem = positions[i - 1];
    if (prevItem === undefined) return i;

    const prevRight = prevItem.left + prevItem.width;
    const swapOffset = distance(left, prevRight - prevItem.width / 2) + buffer;
    if (xOffset < -swapOffset) target = i - 1;
  }

  return clamp(0, positions.length, target);
};
