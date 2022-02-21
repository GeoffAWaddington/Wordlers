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
    localStorage.setItem('showInfo', 'false')
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
      <div className="flex w-80 mx-auto items-center mb-8 mt-12">

        {isEasyMode === true ?
          <svg className={isDarkMode ? "w-6 h-8 ml-3 mb-1 invert" : "w-6 h-8 ml-3 mb-1 invert0"} onClick={() => handleIsEasyMode(!isEasyMode)} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px" viewBox="0 0 110 110"  ><g>
              <path d="M28,58.2c-0.04-0.13-0.09-0.3-0.11-0.45c-0.24-2.05-0.47-4.31-0.67-6.26c-0.28-2.86-0.6-6.16-0.82-8.48 c-0.15-1.57-0.65-3.06-1.38-4.18c-0.49-0.71-1.03-1.25-1.64-1.51c-0.49-0.19-1.08-0.22-1.7,0.02c-0.84,0.32-1.79,1.01-2.84,2.2 c-0.93,1.06-1.66,2.48-2.26,3.98c-0.86,2.2-1.36,4.54-1.57,6.14c-0.02,0.11-0.02,0.19-0.06,0.28L9.12,83.02 c-0.09,0.43-0.26,0.82-0.52,1.12c-1.96,2.52-3.19,4.69-3.55,6.44c-0.26,1.29,0,2.33,0.86,3.14l21.44,21.44 c1.36,1.31,2.95,2.13,4.84,2.48c2.07,0.39,4.48,0.17,7.26-0.58c0.04,0,0.11-0.02,0.15-0.02c1.05-0.28,2.43-0.62,3.75-0.95 c5.75-1.4,10.76-2.63,15.41-6.85l5.98-6.24c0.06-0.11,0.15-0.19,0.24-0.28c0.09-0.09,0.67-0.67,1.46-1.42 c4.09-4,9.15-8.93,6.07-13.26l-2.39-2.39c-1.16,1.12-2.39,2.22-3.57,3.27c-1.08,0.95-2.09,1.83-3.01,2.76 c-0.99,0.99-2.58,0.99-3.57,0c-0.99-0.99-0.99-2.58,0-3.57c0.93-0.93,2.07-1.94,3.25-2.99c4.05-3.57,8.7-7.66,6.2-11.24l-2.37-2.37 c-0.13-0.13-0.24-0.28-0.34-0.43c-1.36,1.4-2.86,2.73-4.33,4.03c-1.08,0.95-2.09,1.83-3.01,2.76c-0.99,0.99-2.58,0.99-3.57,0 c-0.99-0.99-0.99-2.58,0-3.57c0.93-0.93,2.07-1.94,3.25-2.99c4.05-3.57,8.7-7.66,6.2-11.24l-2.37-2.37 c-0.17-0.17-0.3-0.34-0.41-0.54l-6.95,6.95c-0.99,0.99-2.58,0.99-3.57,0c-0.99-0.99-0.99-2.58,0-3.57L70.6,41.86 c3.12-3.12,3.83-6.37,3.01-8.83c-0.3-0.9-0.8-1.7-1.42-2.32c-0.62-0.62-1.42-1.12-2.32-1.42c-2.43-0.8-5.66-0.06-8.87,3.14 l-32.7,32.7c-0.99,0.99-2.58,0.99-3.57,0c-0.99-0.99-0.99-2.58,0-3.57l3.32-3.32L28,58.2L28,58.2z M40.73,0l1.84,19.94l-5.61,0.51 L35.13,0.51L40.73,0L40.73,0z M66.95,8.97L53.97,24.59l-4.33-3.6L62.62,5.37L66.95,8.97L66.95,8.97z M16,11.84l15.43,12.82 l-3.6,4.33L12.4,16.17L16,11.84L16,11.84z M65.93,53.68c0.19,0.11,0.37,0.24,0.54,0.41l2.48,2.48c0.13,0.13,0.26,0.3,0.37,0.45 c2.78,3.81,2.35,7.21,0.45,10.31c0.34,0.13,0.67,0.32,0.93,0.58l2.48,2.48c0.13,0.13,0.26,0.3,0.37,0.45 c2.99,4.11,2.24,7.71,0,10.98c0.11,0.06,0.19,0.15,0.3,0.26l2.48,2.48c0.13,0.13,0.26,0.3,0.37,0.45 c5.75,7.86-1.1,14.53-6.61,19.91l-1.42,1.42l-6.14,6.44l-0.19,0.19c-5.62,5.1-11.19,6.46-17.63,8.03 c-1.08,0.26-2.17,0.54-3.68,0.93c-0.04,0-0.06,0.02-0.11,0.02c-3.49,0.95-6.65,1.18-9.49,0.67c-2.88-0.52-5.38-1.81-7.47-3.85 L2.51,97.34c-2.17-2.09-2.91-4.67-2.3-7.73c0.47-2.45,1.89-5.17,4.13-8.09l5.73-32.42v-0.13c0.26-1.85,0.84-4.59,1.85-7.23 c0.77-1.98,1.81-3.92,3.16-5.49c1.64-1.85,3.25-2.99,4.84-3.6c1.96-0.75,3.83-0.65,5.49,0.06c1.55,0.65,2.86,1.83,3.85,3.34 c1.21,1.81,2,4.11,2.22,6.52c0.17,1.98,0.52,5.25,0.84,8.46l0.26,2.67L57.4,28.88c4.76-4.76,9.92-5.71,14.04-4.35 c1.66,0.54,3.12,1.44,4.33,2.65c1.21,1.21,2.11,2.67,2.65,4.33c1.36,4.11,0.43,9.34-4.24,14.02l-8.22,8.22L65.93,53.68L65.93,53.68 z" />
            </g></svg>

          :

          <svg className={isDarkMode ? "w-6 h-8 ml-3 mt-1 invert" : "w-6 h-8 ml-3 mt-1 invert0"} onClick={() => handleIsEasyMode(!isEasyMode)} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px" viewBox="0 0 550 550"  ><g>
              <path id="XMLID_9_" d="M247.069,163.687c24.872,0,45.02-20.146,45.02-45.021c0-24.858-20.147-45.014-45.02-45.014
		        c-24.874,0-45.007,20.156-45.007,45.014C202.063,143.54,222.195,163.687,247.069,163.687z"/>
              <path id="XMLID_10_" d="M462.838,17.042c-6.31,0-11.647,3.282-15.1,8.033v-6.082C447.738,8.5,439.221,0,428.734,0
            c-10.484,0-19.002,8.5-19.002,18.994v28.1H84.404v-28.1C84.404,8.5,75.889,0,65.402,0C54.917,0,46.4,8.5,46.4,18.994v6.082
            c-3.453-4.751-8.792-8.033-15.099-8.033c-10.485,0-19.002,8.5-19.002,18.994V82.92c0,10.493,8.517,18.994,19.002,18.994
            c6.307,0,11.646-3.282,15.099-8.025v6.082c0,10.493,8.517,18.994,19.002,18.994c10.486,0,19.002-8.501,19.002-18.994v-28.1h12.002
            c0.322,1.751,37.697,75.509,37.697,75.509c1,1.952,2.339,3.711,3.951,5.21l54.459,50.651v134.08l-44.166,42.424
            c-4.388,4.202-6.855,10.01-6.855,16.084v76.008c0,12.316,9.984,22.301,22.293,22.301c12.309,0,22.293-9.985,22.293-22.301V405.33
            l32.115-30.85h57.749l32.134,30.85v66.507c0,12.316,9.984,22.301,22.292,22.301c12.308,0,22.293-9.985,22.293-22.301v-76.008
            c0-6.074-2.468-11.881-6.855-16.084l-44.149-42.409V203.225l54.426-50.643c1.612-1.491,2.951-3.251,3.951-5.202
            c0,0,37.375-73.758,37.699-75.509h12v28.1c0,10.493,8.518,18.994,19.002,18.994c10.486,0,19.004-8.501,19.004-18.994v-6.09
            c3.452,4.751,8.789,8.033,15.1,8.033c10.483,0,19-8.501,19-18.994V36.036C481.838,25.542,473.321,17.042,462.838,17.042z
		        M327.771,127.03l-48.699,45.32h-63.975l-48.732-45.32l-28.422-55.16h218.251L327.771,127.03z"/>
            </g> </svg>
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
          x="0px" y="0px" viewBox="0 0 1125 1125"  ><g><path d="M989.1,891.2c0-16.8,0-37.3,0-62.6c0-241.4-87.2-308.5-145.3-344.3c-58.1-35.8-55.8-76-55.8-76s8.9-62.6-42.5-62.6c-51.4,0-44.7,60.4-44.7,93.9c0,33.5-42.5,31.3-42.5,31.3H494.8c-40.5,0-34.7-38-34.7-38c0-40.2,12.6-76-32.1-76c-40.2,0-46.9,42.5-46.9,78.2s-24.6,69.3-24.6,69.3s-62.6,64.8-100.6,138.6c-38,73.8-40.3,219.1-40.3,219.1l-35.8,4.5c-46.9,0-76-58.1-76-58.1s36.9,28,80.5-15.6c43.6-43.6,4.5-78.2-19.6-78.2c-24,0-40.8,13.4-54.2,26.8c-13.4,13.4-46.9,24.6-46.9-11.2c0-35.7,42.5-17.9,42.5-17.9s82.7-8.9,82.7-64.8c0-55.9-85-35.8-96.1-31.3C81.6,620.7,48,638.6,48,602.9c0-35.7,31.3-51.4,49.2-69.3c17.9-17.9,67.6,0,67.6,0l46.4-2.2l105.1-49.2c0,0,17.9-15.7,15.7-40.2c-2.2-24.6-31.3-20.1-31.3-20.1s-35.8,17.9-154.2,60.4C27.9,524.6,10,578.3,10,607.3c0,29.1,31.3,82.7,31.3,82.7c-38,58.1,29.1,98.4,29.1,98.4c8.9,131.9,152,115.5,152,115.5c11.2,19.3,22.4,50,53.7,56.7s33.5,26.8,33.5,26.8h102.8c0-31.3,47.7-35.7,47.7-35.7h386c0,0,4.5,35.7,44.7,35.7c40.2,0,51.4-32.4,51.4-32.4C1000.3,955,989.1,891.2,989.1,891.2z M599.6,899.6C497.1,899.6,414,816.5,414,714s83.1-185.5,185.6-185.5c102.5,0,185.5,83.1,185.5,185.5S702.1,899.6,599.6,899.6z" /><path d="M487,714c0,62.2,50.4,112.6,112.6,112.6c62.2,0,112.6-50.4,112.6-112.6l0,0c0-62.2-50.4-112.6-112.6-112.6C537.4,601.4,487,651.8,487,714z" /><path d="M81.5,397.1c0-42.5,11.2-125.2,156.5-185.5C383.3,151.2,613.6,37.2,613.6,37.2s42.5-24.6,138.6-24.6c96.1,0,149.8,47,187.8,85c0,0,22.3,42.5,0,55.9c-22.4,13.4-143.1,51.4-143.1,51.4s-26.8,17.9-44.7-8.9c-17.9-26.8-33.5-44.7-77.1-30.2C631.5,180.3,356.5,291,356.5,291s-48.1,19-48.1,63.7c0,44.7-23.5,53.6-23.5,53.6l-120.2,50.8C164.8,459.1,81.5,502.2,81.5,397.1z" /><path d="M796.9,221.7l139.7-55.9c0,0,38-11.2,29,32.4L837.1,253C837.1,253,770.1,269.7,796.9,221.7z" /></g></svg>

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

      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={CORRECT_WORD_MESSAGE(solution)} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App
