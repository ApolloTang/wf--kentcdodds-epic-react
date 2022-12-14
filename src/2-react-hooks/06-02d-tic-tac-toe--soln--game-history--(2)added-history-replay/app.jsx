import React from 'react'
import {useLocalStorageState} from './utils.js'


function Board({squares, onClick}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState(
    'tic-tac-toe:history', [ Array(9).fill(null) ]
  )

  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe:step', 0
  )

  const currentSquares = history[currentStep]

  const nextValue = calculateNextValue(currentSquares) // 'X'|'O'
  const winner = calculateWinner(currentSquares)       // 'X'|'O'|null
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(i) {
    if (winner || currentSquares[i]) { // already has a winnner OR square has already filled
      return // Do nothing
    }

    const squaresCopy = [...currentSquares]
    squaresCopy[i] = nextValue
    const newHistory = history.slice(0, currentStep + 1) // once we jump to a particular time in history, we discard everything after that time.
    
    setHistory([...newHistory, squaresCopy])

    // setCurrentStep( currentStep=>currentStep+1 ) // currentStep is no longer valid because we have a new history
    setCurrentStep(newHistory.length)
  }

  function restart() {
    setHistory([ Array(9).fill(null) ])
    setCurrentStep(0)
  }

  const moves = history.map(
    (move, i) => {
      const isCurrent =  i === currentStep
      const key = JSON.stringify(move)
      return (
        <li key={key}>
          <button
            disabled={isCurrent}
            onClick={()=>{ setCurrentStep(i)}}>
            {i>0 ? `Go to move #${i}` : 'Go to game start' }{isCurrent? ' (current)' : null}
          </button>
        </li>
      )
    }
  )

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onClick={selectSquare}/>
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)  // true means all 9 squares are fill up
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O' // 'X' always go first
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}
export {App}
