
import * as React from 'react'

const countReducer = (state, action) => {
  const nextState = typeof action === 'function' ? action(state) : action
  return ({...state, ...nextState})
}

function Counter({initialCount = 0, step = 1}) {
  const initialState = { count: initialCount }
  const [state, setState] = React.useReducer(countReducer, initialState)
  const {count} = state
  const getNextState = (currentState) => ({count: currentState.count + step})
  const increment = () => setState(getNextState)

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
