// Hook flow
// https://github.com/donavon/hook-flow
// http://localhost:3000/isolated/examples/hook-flow.js

// PLEASE NOTE: there was a subtle change in the order of cleanup functions
// getting called in React 17:
// https://github.com/kentcdodds/react-hooks/issues/90

import * as React from 'react'






function Child() {
  console.log('%c    Child [Green]: render start', 'color: Green')

  const [count, setCount] = React.useState(() => {
    console.log('%c    Child [brown]: useState(() => 0)', 'color: brown')
    return 0
  })

  React.useEffect(() => {
    console.log('%c    Child [red  ]: useEffect(() => {})', 'color: red')
    return () => {
      console.log(
        '%c    Child [red  ]: useEffect(() => {}) cleanup 🧹',
        'color: red',
      )
    }
  })


  React.useEffect(() => {
    console.log(
      '%c    Child [blue  ]: useEffect(() => {}, [])',
      'color: blue',
    )
    return () => {
      console.log(
        '%c    Child [blue  ]: useEffect(() => {}, []) cleanup 🧹',
        'color: blue',
      )
    }
  }, [])


  React.useEffect(() => {
    console.log('%c    Child [magenta]: useEffect(() => {}, [count])', 'color: magenta')
    return () => {
      console.log(
        '%c    Child [magenta]: useEffect(() => {}, [count]) cleanup 🧹',
        'color: magenta',
      )
    }
  }, [count])

  const element = (
    <button onClick={() => setCount(previousCount => previousCount + 1)}>
      {count}
    </button>
  )

  console.log('%c    Child [Green]: render end', 'color: Green')

  return element
}


















function App() {
  console.log('%cApp [Green]: render start', 'color: Green')

  const [showChild, setShowChild] = React.useState(() => {
    console.log('%cApp [brown]: useState(() => false)', 'color: brown')
    return false
  })

  React.useEffect(() => {
    console.log('%cApp [red  ]: useEffect(() => {})', 'color: red')
    return () => {
      console.log('%cApp [red  ]: useEffect(() => {}) cleanup 🧹', 'color: red')
    }
  })

  React.useEffect(() => {
    console.log('%cApp [blue]: useEffect(() => {}, [])', 'color: blue')
    return () => {
      console.log(
        '%cApp [blue]: useEffect(() => {}, []) cleanup 🧹',
        'color: blue',
      )
    }
  }, [])

  React.useEffect(() => {
    console.log('%cApp [magenta]: useEffect(() => {}, [showChild])', 'color: magenta')
    return () => {
      console.log(
        '%cApp [magenta]: useEffect(() => {}, [showChild]) cleanup 🧹',
        'color: magenta',
      )
    }
  }, [showChild])

  const element = (
    <>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={e => setShowChild(e.target.checked)}
        />{' '}
        show child
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 50,
          width: 50,
          border: 'solid',
        }}
      >
        {showChild ? <Child /> : null}
      </div>
    </>
  )

  console.log('%cApp [Green]: render end', 'color: Green')

  return element
}

export {App}
