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

      if(index > -1)
        setCurrentGuess(currentGuess.substring(0, index) + value + currentGuess.substring(index + 1))
      else if(currentGuess.length < 5)
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
 
      <button
      className={isEasyMode === true ?
        "w-6 h-6 ml-3 rounded bg-slate-100 text-black dark:bg-black dark:text-white" 
        :
        "w-6 h-6 ml-3 rounded bg-slate-200 text-black dark:bg-slate-400 dark:text-white" 
      }

      onClick={() => handleIsEasyMode(!isEasyMode)}
      >
      { isEasyMode === true ? 'T' : '' }
      </button>

      { isDarkMode === true ?
        <MoonIcon
        className="h-6 w-6 ml-2 cursor-pointer dark:stroke-white"
        onClick={() => handleDarkMode(!isDarkMode)}
        />  

        :
        
        <SunIcon
        className="h-6 w-6 ml-2 cursor-pointer dark:stroke-white"
        onClick={() => handleDarkMode(!isDarkMode)}
        />        
      }

      <InformationCircleIcon
        className="h-6 w-6 ml-2 cursor-pointer dark:stroke-white"
        onClick={() => setIsInfoModalOpen(true)}
      />

 
      <h1 className="text-lg font-bold grow ml-6 mr-0 dark:text-white">{GAME_TITLE}</h1>


      <svg className={isDarkMode ? "w-6 h-6 invert" : "w-6 h-6 invert0"}  onClick={() => window.location.href = "mailto:alwaysfreewordgames@gmail.com"} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  
        x="0px" y="0px" viewBox="0 0 1125 1125"  ><g><path d="M989.1,891.2c0-16.8,0-37.3,0-62.6c0-241.4-87.2-308.5-145.3-344.3c-58.1-35.8-55.8-76-55.8-76s8.9-62.6-42.5-62.6c-51.4,0-44.7,60.4-44.7,93.9c0,33.5-42.5,31.3-42.5,31.3H494.8c-40.5,0-34.7-38-34.7-38c0-40.2,12.6-76-32.1-76c-40.2,0-46.9,42.5-46.9,78.2s-24.6,69.3-24.6,69.3s-62.6,64.8-100.6,138.6c-38,73.8-40.3,219.1-40.3,219.1l-35.8,4.5c-46.9,0-76-58.1-76-58.1s36.9,28,80.5-15.6c43.6-43.6,4.5-78.2-19.6-78.2c-24,0-40.8,13.4-54.2,26.8c-13.4,13.4-46.9,24.6-46.9-11.2c0-35.7,42.5-17.9,42.5-17.9s82.7-8.9,82.7-64.8c0-55.9-85-35.8-96.1-31.3C81.6,620.7,48,638.6,48,602.9c0-35.7,31.3-51.4,49.2-69.3c17.9-17.9,67.6,0,67.6,0l46.4-2.2l105.1-49.2c0,0,17.9-15.7,15.7-40.2c-2.2-24.6-31.3-20.1-31.3-20.1s-35.8,17.9-154.2,60.4C27.9,524.6,10,578.3,10,607.3c0,29.1,31.3,82.7,31.3,82.7c-38,58.1,29.1,98.4,29.1,98.4c8.9,131.9,152,115.5,152,115.5c11.2,19.3,22.4,50,53.7,56.7s33.5,26.8,33.5,26.8h102.8c0-31.3,47.7-35.7,47.7-35.7h386c0,0,4.5,35.7,44.7,35.7c40.2,0,51.4-32.4,51.4-32.4C1000.3,955,989.1,891.2,989.1,891.2z M599.6,899.6C497.1,899.6,414,816.5,414,714s83.1-185.5,185.6-185.5c102.5,0,185.5,83.1,185.5,185.5S702.1,899.6,599.6,899.6z"/><path d="M487,714c0,62.2,50.4,112.6,112.6,112.6c62.2,0,112.6-50.4,112.6-112.6l0,0c0-62.2-50.4-112.6-112.6-112.6C537.4,601.4,487,651.8,487,714z"/><path d="M81.5,397.1c0-42.5,11.2-125.2,156.5-185.5C383.3,151.2,613.6,37.2,613.6,37.2s42.5-24.6,138.6-24.6c96.1,0,149.8,47,187.8,85c0,0,22.3,42.5,0,55.9c-22.4,13.4-143.1,51.4-143.1,51.4s-26.8,17.9-44.7-8.9c-17.9-26.8-33.5-44.7-77.1-30.2C631.5,180.3,356.5,291,356.5,291s-48.1,19-48.1,63.7c0,44.7-23.5,53.6-23.5,53.6l-120.2,50.8C164.8,459.1,81.5,502.2,81.5,397.1z"/><path d="M796.9,221.7l139.7-55.9c0,0,38-11.2,29,32.4L837.1,253C837.1,253,770.1,269.7,796.9,221.7z"/></g></svg>      








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
