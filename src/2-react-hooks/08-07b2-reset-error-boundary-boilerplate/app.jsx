import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

function MyComponent() {
  const [state, setState] = React.useState(2)

  if (state % 2 === 1) {
    throw new Error('opps! (caught)')
  }

  const handleThrowError = () => {
    throw new Error('opps! (Not caught)')
  }


  return (
    <>
      <button onClick={handleThrowError}>throw error (this will not be caught)</button>
      <button onClick={()=>setState(v=>++v)}>throw error (this is caught)</button>
    </>
  )
}


function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}


function App() {
  function handleReset() {
    console.log('bootstrap again')
  }

  return (
    <div>
      <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
          <MyComponent/>
        </ErrorBoundary>
      </React.StrictMode>
    </div>
  )
}

export {App}
