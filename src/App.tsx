import {
  InformationCircleIcon,
  TrendingUpIcon,
  SunIcon,
  MoonIcon,
  LinkIcon
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
//import { LinksAndSettingsModal } from './components/modals/LinksAndSettingsModal'
import { StatsModal } from './components/modals/StatsModal'
import {
  GAME_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
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
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isHardModeGuessFail, setIsHardModeGuessFail] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  //const [isLinksAndSettingsModalOpen, setIsLinksAndSettingsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
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
    if (gameWasWon) {
      //setIsGameWon(true)
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
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
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
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mb-1 mx-auto items-center">

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

      <Alert
        message={'Not a valid guess'}
        isOpen={isHardModeGuessFail} />
      <Alert
        message={NOT_ENOUGH_LETTERS_MESSAGE}
        isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert
        message={CORRECT_WORD_MESSAGE(solution)}
        isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App
