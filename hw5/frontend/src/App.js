import { useState } from 'react';
import './App.css';
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const handleStart = async () => {
    const response = await startGame();
    setHasStarted(true)
    setStatus(response)
  }
  const handleInput = (e) => {
    setNumber(e.target.value);
  }
  const handleGuess = async () => {
    const response = await guess(number)
    if (response === 'Equal') setHasWon(true)
    else {
      setStatus(response)
      setNumber('')
    }
  }
  const handleRestart = async () => {
    const response = await restart();
    setHasWon(false)
    setNumber('')
    setStatus(response)
  }
  const startMenu =
    <div>
      <button onClick={handleStart
        // someFunctionToBackend; and setHasStarted
      } > start game </button>
    </div>
  const gameMode =
    <>
      <p>Guess a number between 1 to 100</p>
      <input // Get the value from input
        onChange={handleInput} defaultValue={number}
      ></input>
      <button // Send number to backend
        onClick={handleGuess}
        disabled={!number}
      >guess!</button>
      <p>{status}</p>
    </>
  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button // Handle restart for backend and frontend
        onClick={handleRestart}
      >restart</button>
    </>
  )
  const game =
    <div>
      {hasWon ? winningMode : gameMode}
    </div>

  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>)
}

export default App;
