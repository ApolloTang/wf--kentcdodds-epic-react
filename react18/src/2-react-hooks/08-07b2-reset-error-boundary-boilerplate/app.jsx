import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

function MyComponent() {
  const [state, setState] = React.useState(2)

  if (state % 2 === 1) {
    throw new Error('opps! (caught)')
  }

  const handleThrowError = () => {
    throw new Error('opps! (Not caught)')
    // Error boundaries do not catch errors inside event handlers.
    // React doesn’t need error boundaries to recover from errors
    // in event handlers. Unlike the render method and lifecycle
    // methods, the event handlers don’t happen during rendering.
    // So if they throw, React still knows what to display on
    // the screen.  If you need to catch an error inside an event
    // handler, use the regular JavaScript try / catch statement
    // Ref:
    //  https://github.com/bvaughn/react-error-boundary/issues/101
    //  https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers
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
