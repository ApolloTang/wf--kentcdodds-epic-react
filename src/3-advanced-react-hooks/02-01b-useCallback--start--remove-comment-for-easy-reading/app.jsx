import * as React from 'react'

// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from './pokemon'


function pokemonInfoReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', pokemon: null, error: null}
    }
    case 'resolved': {
      return {status: 'resolved', pokemon: action.pokemon, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', pokemon: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}


function PokemonInfo({pokemonName}) {
  const [state, dispatch] = React.useReducer(pokemonInfoReducer, {
    status: pokemonName ? 'pending' : 'idle',

    pokemon: null,
    error: null,
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    dispatch({type: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        dispatch({type: 'resolved', pokemon})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
  }, [pokemonName])

  const {pokemon, status, error} = state

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
