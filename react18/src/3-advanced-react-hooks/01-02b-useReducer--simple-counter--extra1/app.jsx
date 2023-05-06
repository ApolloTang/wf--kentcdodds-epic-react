// useReducer: simple Counter
// 💯 accept the step as the action
// http://localhost:3000/isolated/final/01.extra-1.js

import * as React from 'react'

const countReducer = (prevCount, step) => prevCount + step

function Counter({initialCount = 0, step = 1}) {
  const [count, changeCount] = React.useReducer(countReducer, initialCount)
  const increment = () => changeCount(step)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
