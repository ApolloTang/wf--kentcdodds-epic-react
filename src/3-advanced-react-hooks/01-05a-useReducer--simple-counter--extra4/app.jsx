
import * as React from 'react'

const countReducer = (state, action) => {
  const {type, step} = action

  switch (type) {
    case 'increment': {
      const nextState = {count: state.count + step}
      return ({...state, ...nextState})
    }
    default: {
      throw new Error(`Unsupoorted action type: ${action}`)
    }
  }

}

function Counter({initialCount = 0, step = 1}) {
  const initialState = { count: initialCount }
  const [state, dispatch] = React.useReducer(countReducer, initialState)
  const {count} = state
  const action = {type: 'increment', step}
  const increment = () => dispatch(action)

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
