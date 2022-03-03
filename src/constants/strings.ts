export const GAME_TITLE = 'Wordlers'
export const WIN_MESSAGES = ['Statistically Fortuitous!', 'Stars Aligned!', 'Stupendous!', 'Word Nerd!', 'Timely!', 'Phew!']
export const GAME_COPIED_MESSAGE = 'Game copied to clipboard'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Not enough letters'
export const WORD_NOT_FOUND_MESSAGE = 'Word not found'
export const NOT_A_VALID_GUESS_MESSAGE = 'Not a valid guess'
export const EASY_MODE_MESSAGE = 'Easy Mode'
export const HARD_MODE_MESSAGE = 'Hard Mode'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The word was ${solution}`
export const ENTER_TEXT = 'Enter'
export const STATISTICS_TITLE = 'Statistics'
export const GUESS_DISTRIBUTION_TEXT = 'Guess Distribution'
export const NEW_WORD_TEXT = 'New word in'
export const SHARE_TEXT = 'Share'
export const TOTAL_TRIES_TEXT = 'Total tries'
export const SUCCESS_RATE_TEXT = 'Success rate'
export const CURRENT_STREAK_TEXT = 'Current streak'
export const BEST_STREAK_TEXT = 'Best streak'
export const SVG_DATA_FINGER_SNAP = "M28,58.2c-0.04-0.13-0.09-0.3-0.11-0.45c-0.24-2.05-0.47-4.31-0.67-6.26c-0.28-2.86-0.6-6.16-0.82-8.48 c-0.15-1.57-0.65-3.06-1.38-4.18c-0.49-0.71-1.03-1.25-1.64-1.51c-0.49-0.19-1.08-0.22-1.7,0.02c-0.84,0.32-1.79,1.01-2.84,2.2 c-0.93,1.06-1.66,2.48-2.26,3.98c-0.86,2.2-1.36,4.54-1.57,6.14c-0.02,0.11-0.02,0.19-0.06,0.28L9.12,83.02 c-0.09,0.43-0.26,0.82-0.52,1.12c-1.96,2.52-3.19,4.69-3.55,6.44c-0.26,1.29,0,2.33,0.86,3.14l21.44,21.44 c1.36,1.31,2.95,2.13,4.84,2.48c2.07,0.39,4.48,0.17,7.26-0.58c0.04,0,0.11-0.02,0.15-0.02c1.05-0.28,2.43-0.62,3.75-0.95 c5.75-1.4,10.76-2.63,15.41-6.85l5.98-6.24c0.06-0.11,0.15-0.19,0.24-0.28c0.09-0.09,0.67-0.67,1.46-1.42 c4.09-4,9.15-8.93,6.07-13.26l-2.39-2.39c-1.16,1.12-2.39,2.22-3.57,3.27c-1.08,0.95-2.09,1.83-3.01,2.76 c-0.99,0.99-2.58,0.99-3.57,0c-0.99-0.99-0.99-2.58,0-3.57c0.93-0.93,2.07-1.94,3.25-2.99c4.05-3.57,8.7-7.66,6.2-11.24l-2.37-2.37 c-0.13-0.13-0.24-0.28-0.34-0.43c-1.36,1.4-2.86,2.73-4.33,4.03c-1.08,0.95-2.09,1.83-3.01,2.76c-0.99,0.99-2.58,0.99-3.57,0 c-0.99-0.99-0.99-2.58,0-3.57c0.93-0.93,2.07-1.94,3.25-2.99c4.05-3.57,8.7-7.66,6.2-11.24l-2.37-2.37 c-0.17-0.17-0.3-0.34-0.41-0.54l-6.95,6.95c-0.99,0.99-2.58,0.99-3.57,0c-0.99-0.99-0.99-2.58,0-3.57L70.6,41.86 c3.12-3.12,3.83-6.37,3.01-8.83c-0.3-0.9-0.8-1.7-1.42-2.32c-0.62-0.62-1.42-1.12-2.32-1.42c-2.43-0.8-5.66-0.06-8.87,3.14 l-32.7,32.7c-0.99,0.99-2.58,0.99-3.57,0c-0.99-0.99-0.99-2.58,0-3.57l3.32-3.32L28,58.2L28,58.2z M40.73,0l1.84,19.94l-5.61,0.51 L35.13,0.51L40.73,0L40.73,0z M66.95,8.97L53.97,24.59l-4.33-3.6L62.62,5.37L66.95,8.97L66.95,8.97z M16,11.84l15.43,12.82 l-3.6,4.33L12.4,16.17L16,11.84L16,11.84z M65.93,53.68c0.19,0.11,0.37,0.24,0.54,0.41l2.48,2.48c0.13,0.13,0.26,0.3,0.37,0.45 c2.78,3.81,2.35,7.21,0.45,10.31c0.34,0.13,0.67,0.32,0.93,0.58l2.48,2.48c0.13,0.13,0.26,0.3,0.37,0.45 c2.99,4.11,2.24,7.71,0,10.98c0.11,0.06,0.19,0.15,0.3,0.26l2.48,2.48c0.13,0.13,0.26,0.3,0.37,0.45 c5.75,7.86-1.1,14.53-6.61,19.91l-1.42,1.42l-6.14,6.44l-0.19,0.19c-5.62,5.1-11.19,6.46-17.63,8.03 c-1.08,0.26-2.17,0.54-3.68,0.93c-0.04,0-0.06,0.02-0.11,0.02c-3.49,0.95-6.65,1.18-9.49,0.67c-2.88-0.52-5.38-1.81-7.47-3.85 L2.51,97.34c-2.17-2.09-2.91-4.67-2.3-7.73c0.47-2.45,1.89-5.17,4.13-8.09l5.73-32.42v-0.13c0.26-1.85,0.84-4.59,1.85-7.23 c0.77-1.98,1.81-3.92,3.16-5.49c1.64-1.85,3.25-2.99,4.84-3.6c1.96-0.75,3.83-0.65,5.49,0.06c1.55,0.65,2.86,1.83,3.85,3.34 c1.21,1.81,2,4.11,2.22,6.52c0.17,1.98,0.52,5.25,0.84,8.46l0.26,2.67L57.4,28.88c4.76-4.76,9.92-5.71,14.04-4.35 c1.66,0.54,3.12,1.44,4.33,2.65c1.21,1.21,2.11,2.67,2.65,4.33c1.36,4.11,0.43,9.34-4.24,14.02l-8.22,8.22L65.93,53.68L65.93,53.68 z"

export const SVG_DATA_WEIGHTLIFTER_PART1 = "M247.069,163.687c24.872,0,45.02-20.146,45.02-45.021c0-24.858-20.147-45.014-45.02-45.014 c-24.874,0-45.007,20.156-45.007,45.014C202.063,143.54,222.195,163.687,247.069,163.687z"
export const SVG_DATA_WEIGHTLIFTER_PART2 = "M462.838,17.042c-6.31,0-11.647,3.282-15.1,8.033v-6.082C447.738,8.5,439.221,0,428.734,0c-10.484,0-19.002,8.5-19.002,18.994v28.1H84.404v-28.1C84.404,8.5,75.889,0,65.402,0C54.917,0,46.4,8.5,46.4,18.994v6.082c-3.453-4.751-8.792-8.033-15.099-8.033c-10.485,0-19.002,8.5-19.002,18.994V82.92c0,10.493,8.517,18.994,19.002,18.994c6.307,0,11.646-3.282,15.099-8.025v6.082c0,10.493,8.517,18.994,19.002,18.994c10.486,0,19.002-8.501,19.002-18.994v-28.1h12.002c0.322,1.751,37.697,75.509,37.697,75.509c1,1.952,2.339,3.711,3.951,5.21l54.459,50.651v134.08l-44.166,42.424c-4.388,4.202-6.855,10.01-6.855,16.084v76.008c0,12.316,9.984,22.301,22.293,22.301c12.309,0,22.293-9.985,22.293-22.301V405.33l32.115-30.85h57.749l32.134,30.85v66.507c0,12.316,9.984,22.301,22.292,22.301c12.308,0,22.293-9.985,22.293-22.301v-76.008c0-6.074-2.468-11.881-6.855-16.084l-44.149-42.409V203.225l54.426-50.643c1.612-1.491,2.951-3.251,3.951-5.202c0,0,37.375-73.758,37.699-75.509h12v28.1c0,10.493,8.518,18.994,19.002,18.994c10.486,0,19.004-8.501,19.004-18.994v-6.09c3.452,4.751,8.789,8.033,15.1,8.033c10.483,0,19-8.501,19-18.994V36.036C481.838,25.542,473.321,17.042,462.838,17.042zM327.771,127.03l-48.699,45.32h-63.975l-48.732-45.32l-28.422-55.16h218.251L327.771,127.03z"

export const SVG_DATA_TELEPHONE_PART1 = "M989.1,891.2c0-16.8,0-37.3,0-62.6c0-241.4-87.2-308.5-145.3-344.3c-58.1-35.8-55.8-76-55.8-76s8.9-62.6-42.5-62.6c-51.4,0-44.7,60.4-44.7,93.9c0,33.5-42.5,31.3-42.5,31.3H494.8c-40.5,0-34.7-38-34.7-38c0-40.2,12.6-76-32.1-76c-40.2,0-46.9,42.5-46.9,78.2s-24.6,69.3-24.6,69.3s-62.6,64.8-100.6,138.6c-38,73.8-40.3,219.1-40.3,219.1l-35.8,4.5c-46.9,0-76-58.1-76-58.1s36.9,28,80.5-15.6c43.6-43.6,4.5-78.2-19.6-78.2c-24,0-40.8,13.4-54.2,26.8c-13.4,13.4-46.9,24.6-46.9-11.2c0-35.7,42.5-17.9,42.5-17.9s82.7-8.9,82.7-64.8c0-55.9-85-35.8-96.1-31.3C81.6,620.7,48,638.6,48,602.9c0-35.7,31.3-51.4,49.2-69.3c17.9-17.9,67.6,0,67.6,0l46.4-2.2l105.1-49.2c0,0,17.9-15.7,15.7-40.2c-2.2-24.6-31.3-20.1-31.3-20.1s-35.8,17.9-154.2,60.4C27.9,524.6,10,578.3,10,607.3c0,29.1,31.3,82.7,31.3,82.7c-38,58.1,29.1,98.4,29.1,98.4c8.9,131.9,152,115.5,152,115.5c11.2,19.3,22.4,50,53.7,56.7s33.5,26.8,33.5,26.8h102.8c0-31.3,47.7-35.7,47.7-35.7h386c0,0,4.5,35.7,44.7,35.7c40.2,0,51.4-32.4,51.4-32.4C1000.3,955,989.1,891.2,989.1,891.2z M599.6,899.6C497.1,899.6,414,816.5,414,714s83.1-185.5,185.6-185.5c102.5,0,185.5,83.1,185.5,185.5S702.1,899.6,599.6,899.6z"
export const SVG_DATA_TELEPHONE_PART2 = "M487,714c0,62.2,50.4,112.6,112.6,112.6c62.2,0,112.6-50.4,112.6-112.6l0,0c0-62.2-50.4-112.6-112.6-112.6C537.4,601.4,487,651.8,487,714z"
export const SVG_DATA_TELEPHONE_PART3 = "M81.5,397.1c0-42.5,11.2-125.2,156.5-185.5C383.3,151.2,613.6,37.2,613.6,37.2s42.5-24.6,138.6-24.6c96.1,0,149.8,47,187.8,85c0,0,22.3,42.5,0,55.9c-22.4,13.4-143.1,51.4-143.1,51.4s-26.8,17.9-44.7-8.9c-17.9-26.8-33.5-44.7-77.1-30.2C631.5,180.3,356.5,291,356.5,291s-48.1,19-48.1,63.7c0,44.7-23.5,53.6-23.5,53.6l-120.2,50.8C164.8,459.1,81.5,502.2,81.5,397.1z"
export const SVG_DATA_TELEPHONE_PART4 = "M796.9,221.7l139.7-55.9c0,0,38-11.2,29,32.4L837.1,253C837.1,253,770.1,269.7,796.9,221.7z"

export const SVG_DATA_HANDSHAKE_PART1 = "M335.4,316c-5.6,0-11.1-2.7-14.5-7.7l-53.7-78.7c-5.5-8-3.4-19,4.6-24.4c8-5.5,19-3.4,24.4,4.6l53.7,78.7c5.5,8,3.4,19-4.6,24.4C342.2,315.1,338.8,316,335.4,316z"
export const SVG_DATA_HANDSHAKE_PART2 = "M449.9,298.1c-8.5,0-15.9-6.1-17.3-14.7l-25.1-153.9c-1.6-9.6,5-18.6,14.5-20.2c9.6-1.6,18.6,5,20.2,14.5l25.1,153.9c1.6,9.6-5,18.6-14.5,20.2C451.8,298.1,450.8,298.1,449.9,298.1z"
export const SVG_DATA_HANDSHAKE_PART3 = "M564.4,298.1c-0.8,0-1.6,0-2.4-0.2c-9.6-1.3-16.3-10.2-15-19.8l21.5-153.9c1.3-9.6,10.1-16.3,19.8-15c9.6,1.3,16.3,10.2,15,19.8L581.8,283C580.6,291.8,573.1,298.1,564.4,298.1z"
export const SVG_DATA_HANDSHAKE_PART4 = "M671.8,316c-3.2,0-6.5-0.9-9.5-2.8c-8.2-5.2-10.6-16.1-5.3-24.3l60.8-94.8c5.2-8.1,16.1-10.5,24.3-5.3c8.2,5.2,10.5,16.1,5.3,24.3L686.6,308C683.2,313.2,677.6,316,671.8,316z"
export const SVG_DATA_HANDSHAKE_PART5 = "M134.9,706.2c-1.7,0-3.4-0.2-5-0.7L22.5,673.2c-4.6-1.4-8.5-4.6-10.6-8.9C9.7,660,9.4,655,11,650.5l107.4-300.6c1.7-4.6,5.1-8.3,9.7-10.2c4.5-1.9,9.6-1.9,14.1,0.1l103.8,46.5c6.9,3.1,11.1,10.3,10.3,17.8c-14.5,145.6-102.6,287.9-106.4,293.9C146.6,703.1,140.9,706.2,134.9,706.2z M50.3,644.9l76.5,22.9c20.1-35,78.5-144.4,93-254.8l-74.7-33.5L50.3,644.9z"
export const SVG_DATA_HANDSHAKE_PART6 = "M865.1,706.2c-5.4,0-10.7-2.5-14.1-7c-97.9-130.6-127.3-276.6-128.5-282.8c-1.4-7.1,1.7-14.3,7.8-18.2l89.5-57.3c4.2-2.7,9.3-3.4,14.1-2.2c4.8,1.3,8.8,4.6,11.1,9l143.2,282.7c2.2,4.2,2.5,9.2,0.9,13.7c-1.6,4.5-4.9,8.2-9.2,10.2l-107.4,50.1C870.1,705.6,867.6,706.2,865.1,706.2z M759.7,421.1c8.6,35.2,39.4,144.9,111,245.4l77.8-36.3L822.4,381L759.7,421.1z"
export const SVG_DATA_HANDSHAKE_PART7 = "M768.4,734.8c-4.3,0-8.6-1.6-12-4.7c-81.2-75.7-215.6-199.5-230.3-209.2c-8.4-5.5-24.4-3.3-35-0.3c-9,17.7-34,60-72.4,70.5c-26.7,7.3-49.7,4-64.6-9.2c-11.7-10.3-17-25.8-14.6-42.4c3.3-22.9,17.4-39.8,25.7-48c1.8-14.7,7.1-44.8,21.5-61.3c19.3-22.1,80-57.1,86.8-61c1.2-0.7,2.4-1.2,3.8-1.6c2.7-0.8,67.4-19.4,115.5,0.6c32.3,13.5,53.3,27.1,62.9,34l82.8-6.6c9.4-0.8,18.1,6.4,18.9,16.1c0.8,9.7-6.4,18.1-16.1,18.9l-89.5,7.2c-4.5,0.4-9.1-1.1-12.7-4c-0.2-0.1-20.4-16.6-59.9-33.1c-32.8-13.6-80.3-2.4-90.2,0.1c-24.2,13.9-64.5,39.5-75.9,52.5c-7.4,8.5-12.4,33.2-13.6,48.1c-0.4,4.9-2.8,9.4-6.7,12.4c-0.1,0.1-16,13.1-18.5,30.6c-0.7,4.9,0.3,8.7,3.1,11.1c4.4,3.9,15.1,6.3,32.1,1.7c25.5-7,47.3-45.1,53-58c1.9-4.2,5.3-7.6,9.6-9.3c4.5-1.8,45.1-17,73.4,1.7c19.9,13.2,178.1,160,224.3,203l65.5-47.6c7.8-5.7,18.8-4,24.6,3.9c5.7,7.9,4,18.8-3.9,24.6l-77.2,56.2C775.7,733.7,772,734.8,768.4,734.8z"
export const SVG_DATA_HANDSHAKE_PART8 = "M415.9,444.9c-0.5,0-1,0-1.4-0.1l-177.2-14.3c-9.7-0.8-16.9-9.3-16.1-18.9c0.8-9.7,9.1-17,18.9-16.1l177.2,14.3c9.7,0.8,16.9,9.3,16.1,18.9C432.7,437.9,425,444.9,415.9,444.9z"
export const SVG_DATA_HANDSHAKE_PART9 = "M748.7,797.6c-18.6,0-36.8-8.9-47.9-16.9c-0.4-0.3-0.7-0.6-1.1-0.9L542.2,644.6c-7.4-6.3-8.2-17.4-1.9-24.8c6.3-7.4,17.4-8.2,24.8-1.9l156.8,134.6c3.3,2.2,26.3,16.8,37.7,5.5c11.7-11.6-2.3-27-3.9-28.7c-6.7-7-6.4-18.2,0.6-24.8c7-6.7,18.2-6.4,24.8,0.6c15.9,16.7,29.9,51.3,3.2,77.8C773.7,793.7,761.1,797.6,748.7,797.6z"
export const SVG_DATA_HANDSHAKE_PART10 = "M685.9,851c-13,0-28.5-5-46.6-19.4c-24.7-19.8-159-136.4-164.7-141.4c-7.3-6.4-8.1-17.5-1.7-24.8c6.4-7.3,17.5-8.1,24.8-1.7c1.4,1.2,139.4,121.1,163.6,140.5c23.8,19,32.3,10.5,37.4,5.4c13.3-13.4,0.4-30.1-1.2-31.9c-6.1-7.5-5-18.6,2.5-24.7c7.5-6.1,18.6-5,24.7,2.5c12,14.8,27.3,50.3-1.2,78.9C716,842,703.3,851,685.9,851z"
export const SVG_DATA_HANDSHAKE_PART11 = "M606.6,882c-18.8,0-36-9.7-45.5-18l-75-62.3c-7.5-6.2-8.5-17.3-2.3-24.7c6.2-7.5,17.3-8.5,24.7-2.3l75.3,62.6c3.8,3.3,22.4,17.6,36.4,2.8c10.2-10.8-4.1-27.8-4.7-28.6c-6.3-7.4-5.5-18.4,1.9-24.7c7.3-6.3,18.3-5.6,24.7,1.7c12.5,14.3,29.4,48.6,3.8,75.8C633.5,877.3,619.7,882,606.6,882z"
export const SVG_DATA_HANDSHAKE_PART12 = "M519.8,890.9c-22.2,0-50.5-8.1-84.7-33.8c-7.8-5.8-9.3-16.8-3.5-24.6c5.8-7.8,16.8-9.3,24.6-3.5c64.8,48.6,93.6,16.6,94.7,15.2c6.2-7.3,17.3-8.3,24.7-2.2c7.4,6.1,8.6,16.9,2.6,24.3C577.9,866.8,557.9,890.9,519.8,890.9z"
export const SVG_DATA_HANDSHAKE_PART13 = "M363.6,851.4c-11.4,0-22.4-3.5-31.9-10c-25.2-17.6-31.4-52.4-13.8-77.6l25.4-36.5c10.4-14.9,27.5-23.9,45.8-23.9c11.4,0,22.5,3.5,31.9,10c12.2,8.5,20.4,21.3,23,35.9c2.6,14.7-0.6,29.5-9.2,41.7l-25.4,36.5C399,842.5,381.9,851.4,363.6,851.4z M389.1,738.6c-6.7,0-13.1,3.3-16.9,8.8l-25.4,36.5c-6.5,9.3-4.2,22.2,5.1,28.7c9,6.3,22.4,3.8,28.7-5.1L406,771c3.1-4.5,4.3-10,3.4-15.4c-1-5.4-4-10.1-8.5-13.3C397.4,739.9,393.3,738.6,389.1,738.6z"
export const SVG_DATA_HANDSHAKE_PART14 = "M298.9,814.3c-11.1,0-21.8-3.4-30.9-9.7c-24.5-17.1-30.5-50.9-13.5-75.4l19.1-27.5c10.1-14.5,26.7-23.2,44.5-23.2c11.1,0,21.8,3.4,30.9,9.7c11.9,8.3,19.8,20.7,22.4,34.9c2.5,14.2-0.6,28.6-8.9,40.5l-19.1,27.5C333.2,805.7,316.6,814.3,298.9,814.3z M318.1,713.7c-6.2,0-12.1,3-15.6,8.1l-19.1,27.5c-6,8.6-3.9,20.5,4.7,26.5c8.3,5.8,20.7,3.6,26.5-4.7l19.1-27.5c2.9-4.2,4-9.2,3.1-14.2c-0.9-5-3.7-9.4-7.9-12.3C325.7,714.9,322,713.7,318.1,713.7z"
export const SVG_DATA_HANDSHAKE_PART15 = "M241.7,773.1c-10,0-19.7-3-28-8.8c-10.7-7.5-17.9-18.7-20.2-31.6c-2.3-12.9,0.6-25.9,8-36.6l12.5-18c9.1-13.1,24.2-21,40.2-21c10,0,19.7,3,28,8.8c22.1,15.4,27.6,46,12.1,68.1l-12.5,18C272.7,765.2,257.7,773.1,241.7,773.1z M254.3,692.3c-4.5,0-8.8,2.2-11.3,5.9l-12.5,18c-2.1,3-2.9,6.7-2.3,10.3c0.6,3.6,2.7,6.8,5.7,8.9c6.1,4.2,15,2.6,19.2-3.4l12.5-18c4.4-6.2,2.8-14.9-3.4-19.2C259.8,693.2,257.1,692.3,254.3,692.3z"
export const SVG_DATA_HANDSHAKE_PART16 = "M422.5,882.1c-10,0-19.6-3-27.8-8.7c-22-15.3-27.4-45.7-12.1-67.7L404,775c9.1-13,24-20.8,39.9-20.8c10,0,19.6,3,27.8,8.7c10.7,7.4,17.8,18.6,20.1,31.4c2.3,12.8-0.6,25.7-8,36.4l-21.3,30.6C453.3,874.3,438.4,882.1,422.5,882.1z M443.9,789.4c-4.4,0-8.6,2.2-11.1,5.8l-21.3,30.6c-4.3,6.1-2.8,14.5,3.3,18.8c5.9,4.1,14.7,2.5,18.8-3.4l21.3-30.6c2.1-3,2.8-6.5,2.2-10.1c-0.6-3.5-2.6-6.6-5.6-8.7C449.3,790.2,446.6,789.4,443.9,789.4z"
export const SVG_DATA_HANDSHAKE_PART17 = "M207.4,724.3c-3,0-6-0.8-8.8-2.4L136.5,686c-8.4-4.9-11.3-15.6-6.4-24c4.9-8.4,15.6-11.3,24-6.4l62.1,35.9c8.4,4.9,11.3,15.6,6.4,24C219.4,721.1,213.5,724.3,207.4,724.3z"


