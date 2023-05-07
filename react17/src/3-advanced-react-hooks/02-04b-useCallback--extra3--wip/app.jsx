import * as React from 'react'

// useCallback: custom hooks
// 💯 use useCallback to empower the user to customize memoization
// http://localhost:3000/isolated/final/02.extra-1.js

import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from './pokemon'


const sleep = (ms) => new Promise( (rs) => { setTimeout(rs, ms) })


function useSafeDispatch(dispatch) {
  const mountedRef = React.useRef(false)

  // to make this even more generic you should use the useLayoutEffect hook to
  // make sure that you are correctly setting the mountedRef.current immediately
  // after React updates the DOM. Even though this effect does not interact
  // with the dom another side effect inside a useLayoutEffect which does
  // interact with the dom may depend on the value being set
  React.useEffect(() => {
    mountedRef.current = true
    console.log(mountedRef.current)
    return () => {
      mountedRef.current = false
      console.log(mountedRef.current)
    }
  }, [])

  return React.useCallback(
    (...args) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch],
  )
}


function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}


function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(
    asyncReducer,
    { status: 'idle', data: null, error: null, ...initialState }
  )

  const dispatch = useSafeDispatch(unsafeDispatch)
  
  const runAsync = React.useCallback(
    promise => {
      dispatch({type: 'pending'})
      promise.then(
        async (data) => {
          console.log('sleep, go unmount component within 3000ms')
          await sleep(3000)     // go unmount component after sleep
          console.log('awake')  // you will see this message after unmount
          dispatch({type: 'resolved', data})
        },
        error => { dispatch({type: 'rejected', error}) },
      )
    }, [dispatch]
  )

  return {...state, runAsync}
}


function PokemonInfo({pokemonName}) {
  const state = useAsync(
    {status: pokemonName ? 'pending' : 'idle'}
  )

  const {
    data: pokemon, status, error,
    runAsync
  } = state

  React.useEffect(
    () => {
      if (!pokemonName) { return }

      // note the absence of `await` here
      const fetchPromise = fetchPokemon(pokemonName)
      runAsync(fetchPromise)
    },
    [pokemonName, runAsync]
  )

  switch (status) {
    case 'idle':
      return <span>Submit a pokemon</span>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw error
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    default:
      throw new Error('This should be impossible')
  }
}


function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}


function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true)
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  )
}

export default AppWithUnmountCheckbox
