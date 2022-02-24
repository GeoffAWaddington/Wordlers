import {
  InformationCircleIcon,
  TrendingUpIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { LegalModal } from './components/modals/LegalModal'
import { StatsModal } from './components/modals/StatsModal'
import {
  GAME_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  NOT_A_VALID_GUESS_MESSAGE,
  EASY_MODE_MESSAGE,
  HARD_MODE_MESSAGE,
  CORRECT_WORD_MESSAGE,
  SVG_DATA_FINGER_SNAP,
  SVG_DATA_WEIGHTLIFTER_PART1,
  SVG_DATA_WEIGHTLIFTER_PART2,
  SVG_DATA_TELEPHONE_PART1,
  SVG_DATA_TELEPHONE_PART2,
  SVG_DATA_TELEPHONE_PART3,
  SVG_DATA_TELEPHONE_PART4,
} from './constants/strings'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

import './App.css'

const ALERT_TIME_MS = 2000

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(localStorage.getItem('showInfo') !== null ? (localStorage.getItem('showInfo') === 'true' ? true : false) : true)
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isHardModeGuessFail, setIsHardModeGuessFail] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isGameLoading, setIsGameLoading] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isEasyModeChanging, setIsEasyModeChanging] = useState(false)
  const [isEasyMode, setIsEasyMode] = useState(
    localStorage.getItem('isEasyMode')
      ? localStorage.getItem('isEasyMode') === 'false'
      : true
  )
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
        ? true
        : false
  )
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<string[]>(() => {

    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)

    setIsGameLoading(true)

    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleIsEasyMode = (isEasy: boolean) => {
    setIsEasyMode(isEasy)
    localStorage.setItem('isEasyMode', isEasyMode ? 'true' : 'false')

    setIsEasyModeChanging(true)
    return setTimeout(() => {
      setIsEasyModeChanging(false)
    }, ALERT_TIME_MS / 2.5)
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameLoading) {
      setIsGameLoading(false)
      return
    }

    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (guesses.length < 6 && !isGameWon) {
      let index = currentGuess.indexOf(' ')

      if (index > -1)
        setCurrentGuess(currentGuess.substring(0, index) + value + currentGuess.substring(index + 1))
      else if (currentGuess.length < 5)
        setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDeleteLetter = (index: number) => {
    setCurrentGuess(currentGuess.substring(0, index) + ' ' + currentGuess.substring(index + 1))
  }

  const onEnter = () => {
    localStorage.setItem('showInfo', 'false') // THe first time they press Enter stop showing 'How to Play' info at startup

    if (!isEasyMode && currentGuess.length === 5 && guesses.length > 0) {
      let isGuessFail = false

      const lastGuess = guesses[guesses.length - 1]

      for (var i = 0; i < currentGuess.length; i++) {
        if (lastGuess[i] === solution[i] && currentGuess[i] !== lastGuess[i]) {
          isGuessFail = true
          break
        }

        if (solution.indexOf(lastGuess[i]) !== -1 && currentGuess.indexOf(lastGuess[i]) === -1) {
          isGuessFail = true
          break
        }
      }

      if (isGuessFail) {
        setIsHardModeGuessFail(true)
        return setTimeout(() => {
          setIsHardModeGuessFail(false)
        }, ALERT_TIME_MS)
      }
    }

    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  return (
    <div className="py-3 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center">

        {isEasyMode === true ?
          <svg className={isDarkMode ? "w-6 h-8 ml-3 mb-1 invert" : "w-6 h-8 ml-3 mb-1 invert0"} onClick={() => handleIsEasyMode(!isEasyMode)} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px" viewBox="0 0 110 110">
            <g>
              <path d={SVG_DATA_FINGER_SNAP} />
            </g>
          </svg>

          :

          <svg className={isDarkMode ? "w-6 h-8 ml-3 mt-1 invert" : "w-6 h-8 ml-3 mt-1 invert0"} onClick={() => handleIsEasyMode(!isEasyMode)} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px" viewBox="0 0 550 550"  >
            <g>
              <path id="XMLID_9_" d={SVG_DATA_WEIGHTLIFTER_PART1} />
              <path id="XMLID_10_" d={SVG_DATA_WEIGHTLIFTER_PART2} />
            </g>
          </svg>
        }


        {isDarkMode === true ?
          <MoonIcon
            className="h-6 w-6 ml-1 cursor-pointer dark:stroke-white"
            onClick={() => handleDarkMode(!isDarkMode)}
          />

          :

          <SunIcon
            className="h-6 w-6 ml-1 cursor-pointer dark:stroke-white"
            onClick={() => handleDarkMode(!isDarkMode)}
          />
        }

        <InformationCircleIcon
          className="h-6 w-6 ml-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />

        <h1 className="text-lg font-bold grow ml-6 mr-0 dark:text-white">{GAME_TITLE}</h1>



        <svg className={isDarkMode ? "w-8 h-8 mr-2 invert" : "w-8 h-8 mr-2 invert0"} onClick={() => setIsLegalModalOpen(true)} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
          x="0px" y="0px" viewBox="0 0 1025 1025">
          <g>

            <path d="M335.4,316c-5.6,0-11.1-2.7-14.5-7.7l-53.7-78.7c-5.5-8-3.4-19,4.6-24.4c8-5.5,19-3.4,24.4,4.6l53.7,78.7c5.5,8,3.4,19-4.6,24.4C342.2,315.1,338.8,316,335.4,316z" /><path d="M449.9,298.1c-8.5,0-15.9-6.1-17.3-14.7l-25.1-153.9c-1.6-9.6,5-18.6,14.5-20.2c9.6-1.6,18.6,5,20.2,14.5l25.1,153.9c1.6,9.6-5,18.6-14.5,20.2C451.8,298.1,450.8,298.1,449.9,298.1z" /><path d="M564.4,298.1c-0.8,0-1.6,0-2.4-0.2c-9.6-1.3-16.3-10.2-15-19.8l21.5-153.9c1.3-9.6,10.1-16.3,19.8-15c9.6,1.3,16.3,10.2,15,19.8L581.8,283C580.6,291.8,573.1,298.1,564.4,298.1z" /><path d="M671.8,316c-3.2,0-6.5-0.9-9.5-2.8c-8.2-5.2-10.6-16.1-5.3-24.3l60.8-94.8c5.2-8.1,16.1-10.5,24.3-5.3c8.2,5.2,10.5,16.1,5.3,24.3L686.6,308C683.2,313.2,677.6,316,671.8,316z" /><path d="M134.9,706.2c-1.7,0-3.4-0.2-5-0.7L22.5,673.2c-4.6-1.4-8.5-4.6-10.6-8.9C9.7,660,9.4,655,11,650.5l107.4-300.6c1.7-4.6,5.1-8.3,9.7-10.2c4.5-1.9,9.6-1.9,14.1,0.1l103.8,46.5c6.9,3.1,11.1,10.3,10.3,17.8c-14.5,145.6-102.6,287.9-106.4,293.9C146.6,703.1,140.9,706.2,134.9,706.2z M50.3,644.9l76.5,22.9c20.1-35,78.5-144.4,93-254.8l-74.7-33.5L50.3,644.9z" /><path d="M865.1,706.2c-5.4,0-10.7-2.5-14.1-7c-97.9-130.6-127.3-276.6-128.5-282.8c-1.4-7.1,1.7-14.3,7.8-18.2l89.5-57.3c4.2-2.7,9.3-3.4,14.1-2.2c4.8,1.3,8.8,4.6,11.1,9l143.2,282.7c2.2,4.2,2.5,9.2,0.9,13.7c-1.6,4.5-4.9,8.2-9.2,10.2l-107.4,50.1C870.1,705.6,867.6,706.2,865.1,706.2z M759.7,421.1c8.6,35.2,39.4,144.9,111,245.4l77.8-36.3L822.4,381L759.7,421.1z" /><path d="M768.4,734.8c-4.3,0-8.6-1.6-12-4.7c-81.2-75.7-215.6-199.5-230.3-209.2c-8.4-5.5-24.4-3.3-35-0.3c-9,17.7-34,60-72.4,70.5c-26.7,7.3-49.7,4-64.6-9.2c-11.7-10.3-17-25.8-14.6-42.4c3.3-22.9,17.4-39.8,25.7-48c1.8-14.7,7.1-44.8,21.5-61.3c19.3-22.1,80-57.1,86.8-61c1.2-0.7,2.4-1.2,3.8-1.6c2.7-0.8,67.4-19.4,115.5,0.6c32.3,13.5,53.3,27.1,62.9,34l82.8-6.6c9.4-0.8,18.1,6.4,18.9,16.1c0.8,9.7-6.4,18.1-16.1,18.9l-89.5,7.2c-4.5,0.4-9.1-1.1-12.7-4c-0.2-0.1-20.4-16.6-59.9-33.1c-32.8-13.6-80.3-2.4-90.2,0.1c-24.2,13.9-64.5,39.5-75.9,52.5c-7.4,8.5-12.4,33.2-13.6,48.1c-0.4,4.9-2.8,9.4-6.7,12.4c-0.1,0.1-16,13.1-18.5,30.6c-0.7,4.9,0.3,8.7,3.1,11.1c4.4,3.9,15.1,6.3,32.1,1.7c25.5-7,47.3-45.1,53-58c1.9-4.2,5.3-7.6,9.6-9.3c4.5-1.8,45.1-17,73.4,1.7c19.9,13.2,178.1,160,224.3,203l65.5-47.6c7.8-5.7,18.8-4,24.6,3.9c5.7,7.9,4,18.8-3.9,24.6l-77.2,56.2C775.7,733.7,772,734.8,768.4,734.8z" /><path d="M415.9,444.9c-0.5,0-1,0-1.4-0.1l-177.2-14.3c-9.7-0.8-16.9-9.3-16.1-18.9c0.8-9.7,9.1-17,18.9-16.1l177.2,14.3c9.7,0.8,16.9,9.3,16.1,18.9C432.7,437.9,425,444.9,415.9,444.9z" /><path d="M748.7,797.6c-18.6,0-36.8-8.9-47.9-16.9c-0.4-0.3-0.7-0.6-1.1-0.9L542.2,644.6c-7.4-6.3-8.2-17.4-1.9-24.8c6.3-7.4,17.4-8.2,24.8-1.9l156.8,134.6c3.3,2.2,26.3,16.8,37.7,5.5c11.7-11.6-2.3-27-3.9-28.7c-6.7-7-6.4-18.2,0.6-24.8c7-6.7,18.2-6.4,24.8,0.6c15.9,16.7,29.9,51.3,3.2,77.8C773.7,793.7,761.1,797.6,748.7,797.6z" /><path d="M685.9,851c-13,0-28.5-5-46.6-19.4c-24.7-19.8-159-136.4-164.7-141.4c-7.3-6.4-8.1-17.5-1.7-24.8c6.4-7.3,17.5-8.1,24.8-1.7c1.4,1.2,139.4,121.1,163.6,140.5c23.8,19,32.3,10.5,37.4,5.4c13.3-13.4,0.4-30.1-1.2-31.9c-6.1-7.5-5-18.6,2.5-24.7c7.5-6.1,18.6-5,24.7,2.5c12,14.8,27.3,50.3-1.2,78.9C716,842,703.3,851,685.9,851z" /><path d="M606.6,882c-18.8,0-36-9.7-45.5-18l-75-62.3c-7.5-6.2-8.5-17.3-2.3-24.7c6.2-7.5,17.3-8.5,24.7-2.3l75.3,62.6c3.8,3.3,22.4,17.6,36.4,2.8c10.2-10.8-4.1-27.8-4.7-28.6c-6.3-7.4-5.5-18.4,1.9-24.7c7.3-6.3,18.3-5.6,24.7,1.7c12.5,14.3,29.4,48.6,3.8,75.8C633.5,877.3,619.7,882,606.6,882z" /><path d="M519.8,890.9c-22.2,0-50.5-8.1-84.7-33.8c-7.8-5.8-9.3-16.8-3.5-24.6c5.8-7.8,16.8-9.3,24.6-3.5c64.8,48.6,93.6,16.6,94.7,15.2c6.2-7.3,17.3-8.3,24.7-2.2c7.4,6.1,8.6,16.9,2.6,24.3C577.9,866.8,557.9,890.9,519.8,890.9z" /><path d="M363.6,851.4c-11.4,0-22.4-3.5-31.9-10c-25.2-17.6-31.4-52.4-13.8-77.6l25.4-36.5c10.4-14.9,27.5-23.9,45.8-23.9c11.4,0,22.5,3.5,31.9,10c12.2,8.5,20.4,21.3,23,35.9c2.6,14.7-0.6,29.5-9.2,41.7l-25.4,36.5C399,842.5,381.9,851.4,363.6,851.4z M389.1,738.6c-6.7,0-13.1,3.3-16.9,8.8l-25.4,36.5c-6.5,9.3-4.2,22.2,5.1,28.7c9,6.3,22.4,3.8,28.7-5.1L406,771c3.1-4.5,4.3-10,3.4-15.4c-1-5.4-4-10.1-8.5-13.3C397.4,739.9,393.3,738.6,389.1,738.6z" /><path d="M298.9,814.3c-11.1,0-21.8-3.4-30.9-9.7c-24.5-17.1-30.5-50.9-13.5-75.4l19.1-27.5c10.1-14.5,26.7-23.2,44.5-23.2c11.1,0,21.8,3.4,30.9,9.7c11.9,8.3,19.8,20.7,22.4,34.9c2.5,14.2-0.6,28.6-8.9,40.5l-19.1,27.5C333.2,805.7,316.6,814.3,298.9,814.3z M318.1,713.7c-6.2,0-12.1,3-15.6,8.1l-19.1,27.5c-6,8.6-3.9,20.5,4.7,26.5c8.3,5.8,20.7,3.6,26.5-4.7l19.1-27.5c2.9-4.2,4-9.2,3.1-14.2c-0.9-5-3.7-9.4-7.9-12.3C325.7,714.9,322,713.7,318.1,713.7z" /><path d="M241.7,773.1c-10,0-19.7-3-28-8.8c-10.7-7.5-17.9-18.7-20.2-31.6c-2.3-12.9,0.6-25.9,8-36.6l12.5-18c9.1-13.1,24.2-21,40.2-21c10,0,19.7,3,28,8.8c22.1,15.4,27.6,46,12.1,68.1l-12.5,18C272.7,765.2,257.7,773.1,241.7,773.1z M254.3,692.3c-4.5,0-8.8,2.2-11.3,5.9l-12.5,18c-2.1,3-2.9,6.7-2.3,10.3c0.6,3.6,2.7,6.8,5.7,8.9c6.1,4.2,15,2.6,19.2-3.4l12.5-18c4.4-6.2,2.8-14.9-3.4-19.2C259.8,693.2,257.1,692.3,254.3,692.3z" /><path d="M422.5,882.1c-10,0-19.6-3-27.8-8.7c-22-15.3-27.4-45.7-12.1-67.7L404,775c9.1-13,24-20.8,39.9-20.8c10,0,19.6,3,27.8,8.7c10.7,7.4,17.8,18.6,20.1,31.4c2.3,12.8-0.6,25.7-8,36.4l-21.3,30.6C453.3,874.3,438.4,882.1,422.5,882.1z M443.9,789.4c-4.4,0-8.6,2.2-11.1,5.8l-21.3,30.6c-4.3,6.1-2.8,14.5,3.3,18.8c5.9,4.1,14.7,2.5,18.8-3.4l21.3-30.6c2.1-3,2.8-6.5,2.2-10.1c-0.6-3.5-2.6-6.6-5.6-8.7C449.3,790.2,446.6,789.4,443.9,789.4z" /><path d="M207.4,724.3c-3,0-6-0.8-8.8-2.4L136.5,686c-8.4-4.9-11.3-15.6-6.4-24c4.9-8.4,15.6-11.3,24-6.4l62.1,35.9c8.4,4.9,11.3,15.6,6.4,24C219.4,721.1,213.5,724.3,207.4,724.3z" />

          </g>
        </svg>




        <svg className={isDarkMode ? "w-6 h-6 invert" : "w-6 h-6 invert0"} onClick={() => window.location.href = "mailto:alwaysfreewordgames@gmail.com"} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
          x="0px" y="0px" viewBox="0 0 1125 1125">
          <g>
            <path d={SVG_DATA_TELEPHONE_PART1} />
            <path d={SVG_DATA_TELEPHONE_PART2} />
            <path d={SVG_DATA_TELEPHONE_PART3} />
            <path d={SVG_DATA_TELEPHONE_PART4} />
          </g>
        </svg>

        <TrendingUpIcon
          className="h-6 w-6 ml-2 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>

      <Alert
        message={NOT_A_VALID_GUESS_MESSAGE}
        isOpen={isHardModeGuessFail} />
      <Alert
        message={NOT_ENOUGH_LETTERS_MESSAGE}
        isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert
        message={isEasyMode ? EASY_MODE_MESSAGE : HARD_MODE_MESSAGE}
        isOpen={isEasyModeChanging}
      />
      <Alert
        message={CORRECT_WORD_MESSAGE(solution)}
        isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />

      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        onDeleteLetter={onDeleteLetter}
      />
      <Keyboard
        onChar={onChar}
        onEnter={onEnter}
        guesses={guesses}
        isEasyMode={isEasyMode}
      />
      <LegalModal
        isOpen={isLegalModalOpen}
        handleClose={() => setIsLegalModalOpen(false)}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />


    </div>
  )
}

export default App
