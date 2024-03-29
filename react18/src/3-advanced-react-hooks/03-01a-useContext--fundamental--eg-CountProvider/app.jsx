// useContext: simple Counter
// http://localhost:3000/isolated/final/03.js

import * as React from 'react'

const CountContext = React.createContext()

function CountProvider(props) {
  const value = React.useState(0)
  // Note: // value is actually:
  //   const [count, setCount] = React.useState(0)
  //   const value = [count, setCount]

  return (
    <CountContext.Provider
      value={value}
      {...props}
    />
  )
}


function CountDisplay() {
  const [count] = React.useContext(CountContext)

  return <div>{`The current count is ${count}`}</div>
}


function CounterControl() {
  const [, setCount] = React.useContext(CountContext)
  const increment = () => setCount(c => c + 1)

  return <button onClick={increment}>Increment count</button>
}


function App() {
  return (
    <div>
      <CountProvider>
        <CounterControl />
        <CountDisplay />
      </CountProvider>
    </div>
  )
}


export default App
