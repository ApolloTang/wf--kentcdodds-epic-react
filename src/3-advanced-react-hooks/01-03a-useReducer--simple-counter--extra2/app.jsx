
import * as React from 'react'

const countReducer = (state, nextState) => ({...state, ...nextState})

function Counter({initialCount = 0, step = 1}) {
  const initialState = { count: initialCount }
  const [state, setState] = React.useReducer(countReducer, initialState)
  const {count} = state
  const nextState = {count: count + step}
  const increment = () => setState(nextState)

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
